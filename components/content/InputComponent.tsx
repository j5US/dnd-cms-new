'use client';

import { Input as ShadcnInput } from '@/components/ui/input';
import { createSizeStyle } from '@/lib/size-utils';

interface InputComponentProps {
    placeholder?: string;
    inputType?: 'text' | 'email' | 'password' | 'number';
    width?: string | number;
    height?: string | number;
}

export function InputComponent({
    placeholder = 'Enter text...',
    inputType = 'text',
    width = 'auto',
    height = 'auto',
}: InputComponentProps) {
    const sizeStyle = createSizeStyle(width, height);

    return <ShadcnInput className="break-all" type={inputType} placeholder={placeholder} style={sizeStyle} />;
}
