'use client';

import { cn } from '@/lib/utils';
import { createSizeStyle } from '@/lib/size-utils';

interface TextComponentProps {
    content?: string;
    tag?: 'p' | 'h1' | 'h2' | 'h3' | 'h4';
    align?: 'left' | 'center' | 'right';
    width?: string | number;
}

export function TextComponent({
    content = 'Your text here',
    tag = 'p',
    align = 'left',
    width = 'auto',
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

    return <Tag className={cn(tagStyles[tag], alignClass, 'break-all')} style={sizeStyle}>{content}</Tag>;
}
