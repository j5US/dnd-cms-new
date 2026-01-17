'use client';

import { cn } from '@/lib/utils';
import { createSizeStyle } from '@/lib/size-utils';
import { createSpacingStyle } from '@/lib/spacing-utils';

interface TextComponentProps {
    content?: string;
    tag?: 'p' | 'h1' | 'h2' | 'h3' | 'h4';
    align?: 'left' | 'center' | 'right';
    width?: string | number;
    color?: string;
    fontSize?: number;
    marginTop?: number;
    marginBottom?: number;
    paddingTop?: number;
    paddingBottom?: number;
}

export function TextComponent({
    content = 'Your text here',
    tag = 'p',
    align = 'left',
    width = 'auto',
    color = '#000000',
    fontSize = 16,
    marginTop = 0,
    marginBottom = 0,
    paddingTop = 0,
    paddingBottom = 0,
}: TextComponentProps) {
    const Tag = tag;

    const alignClass =
        align === 'center'
            ? 'text-center'
            : align === 'right'
                ? 'text-right'
                : 'text-left';

    const tagStyles = {
        h1: 'text-4xl font-bold',
        h2: 'text-3xl font-bold',
        h3: 'text-2xl font-semibold',
        h4: 'text-xl font-semibold',
        p: 'text-base',
    };

    const sizeStyle = createSizeStyle(width, undefined);
    const spacingStyle = createSpacingStyle(marginTop, marginBottom, paddingTop, paddingBottom);
    const textStyle = { ...sizeStyle, color, fontSize: `${fontSize}px` };

    return (
        <div style={spacingStyle}>
            <Tag className={cn(tagStyles[tag], alignClass, 'break-all')} style={textStyle}>{content}</Tag>
        </div>
    );
}
