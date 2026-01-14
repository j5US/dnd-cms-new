'use client';

import { useDroppable } from '@dnd-kit/core';
import { useCampaign } from '@/lib/store';
import { LayoutRenderer } from '@/components/renderer/LayoutRenderer';
import { componentRegistry } from '@/lib/registry';
import { cn } from '@/lib/utils';

export function Canvas() {
    const { activePage } = useCampaign();
    const { setNodeRef, isOver } = useDroppable({
        id: 'canvas-root',
        data: {
            accepts: 'building-block',
        },
    });

    if (!activePage) {
        return (
            <div className="flex-1 flex items-center justify-center bg-gray-100">
                <p className="text-gray-500">No active page</p>
            </div>
        );
    }

    return (
        <div className="flex-1 flex items-start justify-center bg-gray-100 p-8 overflow-y-auto">
            {/* Mobile Canvas Container */}
            <div
                ref={setNodeRef}
                className={cn(
                    'w-full max-w-md bg-white rounded-lg shadow-xl',
                    'min-h-[600px] p-4 space-y-4',
                    isOver && 'ring-4 ring-blue-400'
                )}
            >
                {activePage.layout.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-center p-8">
                        <div>
                            <p className="text-gray-400 text-lg mb-2">Empty Canvas</p>
                            <p className="text-gray-400 text-sm">
                                Drag a <strong>Building Block</strong> here to get started
                            </p>
                        </div>
                    </div>
                ) : (
                    <LayoutRenderer nodes={activePage.layout} isEditor={true} />
                )}
            </div>
        </div>
    );
}
