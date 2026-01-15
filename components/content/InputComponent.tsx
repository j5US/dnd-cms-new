'use client';

import { Input as ShadcnInput } from '@/components/ui/input';
import { createSizeStyle } from '@/lib/size-utils';
import { createSpacingStyle } from '@/lib/spacing-utils';

interface InputComponentProps {
    placeholder?: string;
    inputType?: 'text' | 'email' | 'password' | 'number';
    width?: string | number;
    height?: string | number;
    marginTop?: number;
    marginBottom?: number;
    paddingTop?: number;
    paddingBottom?: number;
}

export function InputComponent({
    placeholder = 'Enter text...',
    inputType = 'text',
    width = 'auto',
    height = 'auto',
    marginTop = 0,
    marginBottom = 0,
    paddingTop = 0,
    paddingBottom = 0,
}: InputComponentProps) {
    const sizeStyle = createSizeStyle(width, height);
    const spacingStyle = createSpacingStyle(marginTop, marginBottom, paddingTop, paddingBottom);

    return (
        <div style={spacingStyle}>
            <ShadcnInput className="break-all" type={inputType} placeholder={placeholder} style={sizeStyle} />
        </div>
    );
}
