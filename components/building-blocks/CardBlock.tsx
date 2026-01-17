'use client';

import { ReactNode } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';

interface CardBlockProps {
    padding?: number;
    borderRadius?: number;
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    shadow?: 'none' | 'sm' | 'md' | 'lg';
    width?: string | number;
    height?: string | number;
    justify?: 'start' | 'center' | 'end' | 'between';
    align?: 'start' | 'center' | 'end';
    children?: ReactNode;
    className?: string;
    nodeId?: string;
    isEditor?: boolean;
}

export function CardBlock({
    padding = 4,
    borderRadius = 2,
    backgroundColor = '#ffffff',
    borderColor = '#e5e7eb',
    borderWidth = 1,
    shadow = 'md',
    width = 'auto',
    height = 'auto',
    justify = 'start',
    align = 'start',
    children,
    className,
    nodeId,
    isEditor = true,
}: CardBlockProps) {
    const { setNodeRef, isOver } = useDroppable({
        id: nodeId || 'card-block',
        data: {
            accepts: 'content',
        },
    });

    const shadowClass = {
        'none': '',
        'sm': 'shadow-sm',
        'md': 'shadow-md',
        'lg': 'shadow-lg',
    }[shadow];

    const paddingPx = padding * 4;
    const borderRadiusPx = borderRadius * 4;

    const justifyClass = {
        'start': 'justify-start',
        'center': 'justify-center',
        'end': 'justify-end',
        'between': 'justify-between',
    }[justify];

    const alignClass = {
        'start': 'items-start',
        'center': 'items-center',
        'end': 'items-end',
    }[align];

    const cardStyle: React.CSSProperties = {
        padding: `${paddingPx}px`,
        borderRadius: `${borderRadiusPx}px`,
        backgroundColor,
        borderColor,
        borderWidth: `${borderWidth}px`,
        borderStyle: 'solid',
    };

    if (width !== 'auto') {
        cardStyle.width = typeof width === 'number' ? `${width}px` : width;
    }
    if (height !== 'auto') {
        cardStyle.height = `${height}px`;
    }

    return (
        <div
            ref={setNodeRef}
            className={cn(
                'w-full flex flex-col',
                justifyClass,
                alignClass,
                shadowClass,
                // Show drop zone styling in editor mode
                isEditor && isOver && 'ring-2 ring-green-400',
                className
            )}
            style={cardStyle}
        >
            {children || (
                isEditor && <div className="text-sm text-gray-400 italic text-center">Drop content components here</div>
            )}
        </div>
    );
}
