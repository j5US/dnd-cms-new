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
    padding?: any;
    margin?: any;
    children?: ReactNode;
    className?: string;
    nodeId?: string;
    isEditor?: boolean;
}

export function FlexBlock({
    direction = 'column',
    align = 'center',
    justify = 'start',
    gap = 4,
    height = 'auto',
    padding = { all: '0px', top: '0px', right: '0px', bottom: '0px', left: '0px' },
    margin = { all: '0px', top: '0px', right: '0px', bottom: '0px', left: '0px' },
    children,
    className,
    nodeId,
    isEditor = true,
}: FlexBlockProps) {
    const { setNodeRef, isOver } = useDroppable({
        id: nodeId || 'flex-block',
        data: {
            accepts: ['content', 'building-block'],
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

    // Helper to get spacing value (duplicated for now or import from utils if available)
    const getSpacing = (val: any, side: string) => {
        if (typeof val === 'number') return `${val * 4}px`;
        if (typeof val === 'string') return val;
        if (typeof val === 'object') return val[side] || val.all || '0px';
        return '0px';
    };

    const containerStyle: React.CSSProperties = {
        paddingTop: getSpacing(padding, 'top'),
        paddingRight: getSpacing(padding, 'right'),
        paddingBottom: getSpacing(padding, 'bottom'),
        paddingLeft: getSpacing(padding, 'left'),
        marginTop: getSpacing(margin, 'top'),
        marginRight: getSpacing(margin, 'right'),
        marginBottom: getSpacing(margin, 'bottom'),
        marginLeft: getSpacing(margin, 'left'),
    };

    if (height !== 'auto') {
        containerStyle.height = `${height}px`;
    }
    containerStyle.gap = `${gapStyle}px`;

    return (
        <div
            ref={setNodeRef}
            className={cn(
                'flex',
                flexDirection,
                alignItems,
                justifyContent,
                // Only show editor-specific styling when in editor mode
                isEditor && 'border border-dashed border-gray-300 rounded-md bg-gray-50/50',
                isEditor && isOver && 'ring-2 ring-green-400 bg-green-50/50',
                className
            )}
            style={containerStyle}
        >
            {children || (
                isEditor && <div className="text-sm text-gray-400 italic">Drop components here</div>
            )}
        </div>
    );
}
