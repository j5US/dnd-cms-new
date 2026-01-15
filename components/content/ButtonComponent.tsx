'use client';

import { Button as ShadcnButton } from '@/components/ui/button';
import { createSizeStyle } from '@/lib/size-utils';
import { createSpacingStyle } from '@/lib/spacing-utils';

interface ButtonComponentProps {
    text?: string;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    width?: string | number;
    height?: string | number;
    marginTop?: number;
    marginBottom?: number;
    paddingTop?: number;
    paddingBottom?: number;
}

export function ButtonComponent({
    text = 'Click me',
    variant = 'default',
    size = 'default',
    width = 'auto',
    height = 'auto',
    marginTop = 0,
    marginBottom = 0,
    paddingTop = 0,
    paddingBottom = 0,
}: ButtonComponentProps) {
    const sizeStyle = createSizeStyle(width, height);
    const spacingStyle = createSpacingStyle(marginTop, marginBottom, paddingTop, paddingBottom);

    return (
        <div style={spacingStyle}>
            <ShadcnButton
                className="break-all whitespace-normal"
                variant={variant}
                size={size}
                style={sizeStyle}
            >
                {text}
            </ShadcnButton>
        </div>
    );
}
