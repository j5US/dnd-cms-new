'use client';

import { DndContext, DragEndEvent, DragStartEvent, DragOverlay, closestCenter } from '@dnd-kit/core';
import { useCampaign } from '@/lib/store';
import { PageSidebar } from './PageSidebar';
import { Canvas } from './Canvas';
import { PropertiesPanel } from './PropertiesPanel';
import { Toolbar } from './Toolbar';
import { componentRegistry } from '@/lib/registry';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { loadCampaign } from '@/lib/api-client';
import { DragData, ComponentType } from '@/lib/types';

export function Editor() {
    const { dispatch } = useCampaign();
    const searchParams = useSearchParams();
    const campaignId = searchParams.get('campaignId');
    const [activeDragItem, setActiveDragItem] = useState<DragData | null>(null);

    // Auto-load campaign from URL parameter
    useEffect(() => {
        if (campaignId) {
            loadCampaign(parseInt(campaignId))
                .then(response => {
                    dispatch({ type: 'LOAD_CAMPAIGN', campaign: response.campaign });
                })
                .catch(error => {
                    console.error('Failed to auto-load campaign from URL:', error);
                    alert('Failed to load campaign. It may have been deleted.');
                });
        }
    }, [campaignId, dispatch]);

    const handleDragStart = (event: DragStartEvent) => {
        setActiveDragItem(event.active.data.current as DragData ?? null);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        setActiveDragItem(null);

        const { active, over } = event;

        if (!over) return;

        const dragData = active.data.current as DragData | undefined;

        // Check if we're dragging a new component
        if (dragData?.type === 'new') {
            const componentType: ComponentType = dragData.componentType;
            const componentDef = componentRegistry[componentType];

            // Validate drop target
            if (over.id === 'canvas-root' || over.id === 'canvas-bottom') {
                // Can only drop building blocks on root or bottom drop zone
                if (componentDef.category === 'building-block') {
                    dispatch({
                        type: 'ADD_COMPONENT',
                        componentType,
                    });
                }
            } else {
                // Dropping into a building block or other droppable
                const dropTargetData = over.data?.current;
                const accepts = dropTargetData?.accepts;

                // Check if the drop target accepts this component category
                let canDrop = false;
                if (Array.isArray(accepts)) {
                    canDrop = accepts.includes(componentDef.category);
                } else if (typeof accepts === 'string') {
                    canDrop = accepts === componentDef.category;
                }

                if (canDrop) {
                    const parentId = over.id as string;
                    dispatch({
                        type: 'ADD_COMPONENT',
                        componentType,
                        parentId,
                    });
                }
            }
        }
    };

    const handleDragCancel = () => {
        setActiveDragItem(null);
    };

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
        >
            <div className="h-screen flex flex-col">
                <Toolbar />
                <div className="flex-1 flex overflow-hidden">
                    <PageSidebar />
                    <Canvas />
                    <PropertiesPanel />
                </div>
            </div>

            {/* Drag Overlay */}
            <DragOverlay>
                {activeDragItem ? (
                    <div className="p-3 border rounded-md bg-white shadow-lg">
                        <span className="text-sm font-medium">
                            {componentRegistry[activeDragItem.componentType]?.label}
                        </span>
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}
