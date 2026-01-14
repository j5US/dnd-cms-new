'use client';

import { DndContext, DragEndEvent, DragOverlay, closestCenter } from '@dnd-kit/core';
import { useCampaign } from '@/lib/store';
import { PageSidebar } from './PageSidebar';
import { Canvas } from './Canvas';
import { PropertiesPanel } from './PropertiesPanel';
import { componentRegistry } from '@/lib/registry';
import { useState } from 'react';

export function Editor() {
    const { dispatch } = useCampaign();
    const [activeDragItem, setActiveDragItem] = useState<any>(null);

    const handleDragStart = (event: any) => {
        setActiveDragItem(event.active.data.current);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        setActiveDragItem(null);

        const { active, over } = event;

        if (!over) return;

        const dragData = active.data.current;

        // Check if we're dragging a new component
        if (dragData?.type === 'new') {
            const componentType = dragData.componentType;
            const componentDef = componentRegistry[componentType];

            // Validate drop target
            if (over.id === 'canvas-root') {
                // Can only drop building blocks on root
                if (componentDef.category === 'building-block') {
                    dispatch({
                        type: 'ADD_COMPONENT',
                        componentType,
                    });
                }
            } else {
                // Dropping into a building block
                // Can only drop content components
                if (componentDef.category === 'content') {
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
            <div className="h-screen flex">
                <PageSidebar />
                <Canvas />
                <PropertiesPanel />
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
