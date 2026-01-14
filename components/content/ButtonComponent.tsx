'use client';

import { Button as ShadcnButton } from '@/components/ui/button';
import { createSizeStyle } from '@/lib/size-utils';

interface ButtonComponentProps {
    text?: string;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    width?: string | number;
    height?: string | number;
}

export function ButtonComponent({
    text = 'Click me',
    variant = 'default',
    size = 'default',
    width = 'auto',
    height = 'auto',
}: ButtonComponentProps) {
    const sizeStyle = createSizeStyle(width, height);

    return (
        <ShadcnButton
            className="break-all whitespace-normal"
            variant={variant}
            size={size}
            style={sizeStyle}
        >
            {text}
        </ShadcnButton>
    );
}
