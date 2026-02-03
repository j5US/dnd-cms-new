'use client';

import { useEffect, useState } from 'react';
import { Campaign, ComponentType } from '@/lib/types';
import { LayoutRenderer } from '@/components/renderer/LayoutRenderer';
import { Button } from '@/components/ui/button';
import { CampaignProvider } from '@/lib/store';
import { generateActivePageCode } from '@/lib/code-generator';
import { CodeView } from '@/components/preview/CodeView';
import { CopyButton } from '@/components/preview/CopyButton';
import { PageStructure } from '@/components/preview/PageStructure';
import { componentFileTree, findFileByPath } from '@/lib/file-tree';

export default function PreviewPage() {
    const [campaign, setCampaign] = useState<Campaign | null>(null);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Load campaign from sessionStorage
        const savedCampaign = sessionStorage.getItem('preview-campaign');
        if (savedCampaign) {
            try {
                const parsed = JSON.parse(savedCampaign);
                setCampaign(parsed);
            } catch (err) {
                setError('Failed to load campaign preview');
                console.error('Preview error:', err);
            }
        } else {
            setError('No campaign to preview. Please open preview from the editor.');
        }
    }, []);

    if (error) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <p className="text-2xl mb-4">⚠️</p>
                    <p className="text-gray-700 mb-4">{error}</p>
                    <Button onClick={() => window.close()}>Close</Button>
                </div>
            </div>
        );
    }

    if (!campaign) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="text-gray-500">Loading preview...</div>
            </div>
        );
    }

    return <PreviewContent campaign={campaign} currentPageIndex={currentPageIndex} setCurrentPageIndex={setCurrentPageIndex} />;
}

function PreviewContent({
    campaign,
    currentPageIndex,
    setCurrentPageIndex
}: {
    campaign: Campaign;
    currentPageIndex: number;
    setCurrentPageIndex: (index: number) => void;
}) {
    const [viewMode, setViewMode] = useState<'preview' | 'code' | 'structure'>('preview');
    const [selectedComponentType, setSelectedComponentType] = useState<ComponentType | null>(null);
    const currentPage = campaign.pages[currentPageIndex];

    // Generate code for current page
    const generatedCode = generateActivePageCode(campaign, currentPage.id);

    // Component type to file path mapping
    const componentToFilePath: Record<ComponentType, string> = {
        'flex-block': 'components/building-blocks/FlexBlock.tsx',
        'grid-block': 'components/building-blocks/GridBlock.tsx',
        'card-block': 'components/building-blocks/CardBlock.tsx',
        'button': 'components/content/ButtonComponent.tsx',
        'text': 'components/content/TextComponent.tsx',
        'heading': 'components/content/HeadingComponent.tsx',
        'image': 'components/content/ImageComponent.tsx',
        'input': 'components/content/InputComponent.tsx',
        'textarea': 'components/content/TextAreaComponent.tsx',
        'video': 'components/content/VideoComponent.tsx',
        'divider': 'components/content/DividerComponent.tsx',
        'spacer': 'components/content/SpacerComponent.tsx',
    };

    // Get selected component implementation
    const getComponentCode = (componentType: ComponentType | null): string => {
        if (!componentType) return generatedCode;

        const filePath = componentToFilePath[componentType];
        if (!filePath) return generatedCode;

        const file = findFileByPath(componentFileTree, filePath);
        return file?.content || `// Component implementation not found for ${componentType}`;
    };

    const selectedCode = selectedComponentType ? getComponentCode(selectedComponentType) : generatedCode;
    const codeFilePath = selectedComponentType
        ? componentToFilePath[selectedComponentType]
        : `${currentPage.name} - Generated Code`;

    const handleNext = () => {
        if (currentPageIndex < campaign.pages.length - 1) {
            setCurrentPageIndex(currentPageIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPageIndex > 0) {
            setCurrentPageIndex(currentPageIndex - 1);
        }
    };

    return (
        <CampaignProvider>
            <div className="min-h-screen bg-gray-100">
                {/* Header */}
                <div className="bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
                    <div className="flex items-center gap-4">
                        <h1 className="text-lg font-semibold text-gray-800">Preview Mode</h1>
                        <div className="text-sm text-gray-500">
                            Page {currentPageIndex + 1} of {campaign.pages.length}: {currentPage?.name}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* View Mode Toggle */}
                        <div className="flex items-center gap-1 bg-gray-100 rounded-md p-1">
                            <Button
                                onClick={() => setViewMode('preview')}
                                variant={viewMode === 'preview' ? 'default' : 'ghost'}
                                size="sm"
                            >
                                👁️ Preview
                            </Button>
                            <Button
                                onClick={() => setViewMode('code')}
                                variant={viewMode === 'code' ? 'default' : 'ghost'}
                                size="sm"
                            >
                                💻 Code
                            </Button>
                            <Button
                                onClick={() => setViewMode('structure')}
                                variant={viewMode === 'structure' ? 'default' : 'ghost'}
                                size="sm"
                            >
                                🌳 Structure
                            </Button>
                        </div>

                        {/* Copy Button (visible in code mode only) */}
                        {viewMode === 'code' && (
                            <CopyButton code={generatedCode} />
                        )}

                        {campaign.pages.length > 1 && (
                            <>
                                <Button
                                    onClick={handlePrevious}
                                    disabled={currentPageIndex === 0}
                                    variant="outline"
                                    size="sm"
                                >
                                    ← Previous
                                </Button>
                                <Button
                                    onClick={handleNext}
                                    disabled={currentPageIndex === campaign.pages.length - 1}
                                    variant="outline"
                                    size="sm"
                                >
                                    Next →
                                </Button>
                            </>
                        )}
                        <Button onClick={() => window.close()} variant="ghost" size="sm">
                            ✕ Close
                        </Button>
                    </div>
                </div>

                {/* Content */}
                <div className="container mx-auto p-8 flex justify-center">
                    {viewMode === 'preview' ? (() => {
                        // Helper to get spacing value (same as Canvas)
                        const getSpacing = (val: any, side: string): string => {
                            if (typeof val === 'string') return val;
                            if (typeof val === 'object' && val) return val[side] || val.all || '0px';
                            return '0px';
                        };

                        // Get page settings with defaults
                        const pageSettings = currentPage.settings || {
                            padding: { all: '16px', top: '16px', right: '16px', bottom: '16px', left: '16px' },
                        };

                        const canvasStyle: React.CSSProperties = {
                            paddingTop: getSpacing(pageSettings.padding, 'top'),
                            paddingRight: getSpacing(pageSettings.padding, 'right'),
                            paddingBottom: getSpacing(pageSettings.padding, 'bottom'),
                            paddingLeft: getSpacing(pageSettings.padding, 'left'),
                            backgroundColor: pageSettings.backgroundColor || '#ffffff',
                            minHeight: '100vh',
                            ...(pageSettings.backgroundImage && {
                                backgroundImage: `url(${pageSettings.backgroundImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }),
                        };

                        return (
                            <div className="w-full max-w-md min-h-screen rounded-lg shadow-lg overflow-hidden">
                                <div style={canvasStyle}>
                                    {currentPage && currentPage.layout && currentPage.layout.length > 0 ? (
                                        <LayoutRenderer nodes={currentPage.layout} isEditor={false} />
                                    ) : (
                                        <div className="text-center text-gray-500 py-12">
                                            This page is empty
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })() : viewMode === 'code' ? (
                        <div className="w-full h-[calc(100vh-120px)] bg-white rounded-lg shadow-lg overflow-hidden">
                            <CodeView code={generatedCode} height="100%" filePath="Generated Page Code" />
                        </div>
                    ) : (
                        <div className="w-full h-[calc(100vh-120px)] bg-white rounded-lg shadow-lg overflow-hidden flex">
                            <div className="w-72">
                                <PageStructure
                                    nodes={currentPage.layout}
                                    pageName={currentPage.name}
                                    onComponentSelect={setSelectedComponentType}
                                    selectedComponentType={selectedComponentType}
                                />
                            </div>
                            <div className="flex-1">
                                <CodeView code={selectedCode} height="100%" filePath={codeFilePath} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </CampaignProvider>
    );
}
