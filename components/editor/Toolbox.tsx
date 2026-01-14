'use client';

import { useDraggable } from '@dnd-kit/core';
import { ComponentDefinition } from '@/lib/types';
import { getBuildingBlocks, getContentComponents } from '@/lib/registry';
import { cn } from '@/lib/utils';

interface DraggableItemProps {
    definition: ComponentDefinition;
}

function DraggableItem({ definition }: DraggableItemProps) {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: `new-${definition.type}`,
        data: {
            type: 'new',
            componentType: definition.type,
        },
    });

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className={cn(
                'p-3 border rounded-md bg-white cursor-grab active:cursor-grabbing',
                'hover:bg-gray-50 hover:border-blue-400 transition-colors',
                'flex items-center gap-2',
                isDragging && 'opacity-50'
            )}
        >
            <span className="text-2xl">{definition.icon}</span>
            <span className="text-sm font-medium text-gray-700">{definition.label}</span>
        </div>
    );
}

export function Toolbox() {
    const buildingBlocks = getBuildingBlocks();
    const contentComponents = getContentComponents();

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
                    Building Blocks
                </h3>
                <div className="space-y-2">
                    {buildingBlocks.map((def) => (
                        <DraggableItem key={def.type} definition={def} />
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
                    Content Components
                </h3>
                <div className="space-y-2">
                    {contentComponents.map((def) => (
                        <DraggableItem key={def.type} definition={def} />
                    ))}
                </div>
            </div>
        </div>
    );
}
