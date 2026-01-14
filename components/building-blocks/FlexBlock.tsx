'use client';

import { ReactNode } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';

interface FlexBlockProps {
    direction?: 'row' | 'column';
    align?: 'start' | 'center' | 'end';
    justify?: 'start' | 'center' | 'end' | 'between';
    gap?: number;
    height?: string | number;
    children?: ReactNode;
    className?: string;
    nodeId?: string;
}

export function FlexBlock({
    direction = 'column',
    align = 'center',
    justify = 'start',
    gap = 4,
    height = 'auto',
    children,
    className,
    nodeId,
}: FlexBlockProps) {
    const { setNodeRef, isOver } = useDroppable({
        id: nodeId || 'flex-block',
        data: {
            accepts: 'content',
        },
    });
    const flexDirection = direction === 'row' ? 'flex-row' : 'flex-col';

    const alignItems =
        align === 'start'
            ? 'items-start'
            : align === 'end'
                ? 'items-end'
                : 'items-center';

    const justifyContent =
        justify === 'start'
            ? 'justify-start'
            : justify === 'end'
                ? 'justify-end'
                : justify === 'between'
                    ? 'justify-between'
                    : 'justify-center';

    const gapStyle = gap * 4; // Convert to pixels (gap-1 = 4px in Tailwind)

    const heightStyle = height === 'auto' ? { gap: `${gapStyle}px` } : { height: `${height}px`, gap: `${gapStyle}px` };

    return (
        <div
            ref={setNodeRef}
            className={cn(
                'w-full flex',
                flexDirection,
                alignItems,
                justifyContent,
                'p-4 border border-dashed border-gray-300 rounded-md bg-gray-50/50',
                isOver && 'ring-2 ring-green-400 bg-green-50/50',
                className
            )}
            style={heightStyle}
        >
            {children || (
                <div className="text-sm text-gray-400 italic">Drop content components here</div>
            )}
        </div>
    );
}
