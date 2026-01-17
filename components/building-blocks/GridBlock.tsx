'use client';

import { ReactNode } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';

interface GridBlockProps {
    columns?: number;
    gap?: number;
    height?: string | number;
    children?: ReactNode;
    className?: string;
    nodeId?: string;
    isEditor?: boolean;
}

export function GridBlock({
    columns = 2,
    gap = 4,
    height = 'auto',
    children,
    className,
    nodeId,
    isEditor = true,
}: GridBlockProps) {
    const { setNodeRef, isOver } = useDroppable({
        id: nodeId || 'grid-block',
        data: {
            accepts: ['content', 'building-block'],
        },
    });
    const gapStyle = gap * 4; // Convert to pixels (gap-1 = 4px in Tailwind)

    const heightStyle = height === 'auto'
        ? { gap: `${gapStyle}px`, gridTemplateColumns: `repeat(${columns}, 1fr)` }
        : { height: `${height}px`, gap: `${gapStyle}px`, gridTemplateColumns: `repeat(${columns}, 1fr)` };

    return (
        <div
            ref={setNodeRef}
            className={cn(
                'w-full grid *:w-full',
                // Only show editor-specific styling when in editor mode
                isEditor && 'p-4 border border-dashed border-gray-300 rounded-md bg-gray-50/50',
                isEditor && isOver && 'ring-2 ring-green-400 bg-green-50/50',
                className
            )}
            style={heightStyle}
        >
            {children || (
                isEditor && (
                    <div className="col-span-full text-sm text-gray-400 italic">
                        Drop components here
                    </div>
                )
            )}
        </div>
    );
}
