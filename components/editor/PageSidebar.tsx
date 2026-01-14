'use client';

import { useCampaign } from '@/lib/store';
import { Toolbox } from './Toolbox';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { exportCampaign, importCampaign } from '@/lib/export-utils';
import { useRef } from 'react';

export function PageSidebar() {
    const { state, dispatch } = useCampaign();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAddPage = () => {
        dispatch({ type: 'ADD_PAGE' });
    };

    const handleSelectPage = (pageId: string) => {
        dispatch({ type: 'SET_ACTIVE_PAGE', pageId });
    };

    const handleDeletePage = (pageId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (state.campaign.pages.length > 1) {
            dispatch({ type: 'DELETE_PAGE', pageId });
        }
    };

    const handleExport = () => {
        try {
            exportCampaign(state.campaign);
        } catch (error) {
            alert('Failed to export design. Please try again.');
            console.error('Export error:', error);
        }
    };

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleImportFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const campaign = await importCampaign(file);

            // Replace entire campaign state
            dispatch({ type: 'LOAD_CAMPAIGN', campaign });

            alert('Design imported successfully!');
        } catch (error) {
            alert(error instanceof Error ? error.message : 'Failed to import design');
            console.error('Import error:', error);
        }

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="w-64 border-r bg-gray-50 p-4 overflow-y-auto">
            {/* Pages Section */}
            <div className="mb-6">
                <h2 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
                    Pages
                </h2>
                <div className="space-y-1">
                    {state.campaign.pages.map((page) => (
                        <div
                            key={page.id}
                            className={cn(
                                'px-3 py-2 rounded-md cursor-pointer flex justify-between items-center group',
                                page.id === state.campaign.activePageId
                                    ? 'bg-blue-100 text-blue-900 font-medium'
                                    : 'hover:bg-gray-200 text-gray-700'
                            )}
                            onClick={() => handleSelectPage(page.id)}
                        >
                            <span className="text-sm">{page.name}</span>
                            {state.campaign.pages.length > 1 && (
                                <button
                                    onClick={(e) => handleDeletePage(page.id, e)}
                                    className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 text-xs"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                <Button
                    onClick={handleAddPage}
                    variant="outline"
                    size="sm"
                    className="w-full mt-3"
                >
                    + Add Page
                </Button>

                {/* Export/Import Buttons */}
                <div className="mt-3 space-y-2">
                    <Button
                        onClick={handleExport}
                        variant="outline"
                        size="sm"
                        className="w-full"
                    >
                        📤 Export Design
                    </Button>
                    <Button
                        onClick={handleImportClick}
                        variant="outline"
                        size="sm"
                        className="w-full"
                    >
                        📥 Import Design
                    </Button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".json"
                        onChange={handleImportFile}
                        className="hidden"
                    />
                </div>
            </div>

            {/* Toolbox Section */}
            <div>
                <Toolbox />
            </div>
        </div>
    );
}
