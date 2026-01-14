'use client';

import { Textarea as ShadcnTextarea } from '@/components/ui/textarea';
import { createSizeStyle } from '@/lib/size-utils';

interface TextAreaComponentProps {
    placeholder?: string;
    rows?: number;
    width?: string | number;
    height?: string | number;
}

export function TextAreaComponent({
    placeholder = 'Enter text...',
    rows = 4,
    width = 'auto',
    height = 'auto',
}: TextAreaComponentProps) {
    const sizeStyle = createSizeStyle(width, height);

    return <ShadcnTextarea className="break-all" placeholder={placeholder} rows={rows} style={sizeStyle} />;
}
