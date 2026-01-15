'use client';

import { useEffect, useState } from 'react';
import { Campaign } from '@/lib/types';
import { LayoutRenderer } from '@/components/renderer/LayoutRenderer';
import { Button } from '@/components/ui/button';
import { CampaignProvider } from '@/lib/store';

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
    const currentPage = campaign.pages[currentPageIndex];

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
                    <div className="w-full max-w-md min-h-screen bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="p-8">
                            {currentPage && currentPage.layout && currentPage.layout.length > 0 ? (
                                <LayoutRenderer nodes={currentPage.layout} isEditor={false} />
                            ) : (
                                <div className="text-center text-gray-500 py-12">
                                    This page is empty
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </CampaignProvider>
    );
}
