'use client';

import { Textarea as ShadcnTextarea } from '@/components/ui/textarea';
import { createSizeStyle } from '@/lib/size-utils';
import { createSpacingStyle } from '@/lib/spacing-utils';

interface TextAreaComponentProps {
    placeholder?: string;
    rows?: number;
    width?: string | number;
    height?: string | number;
    marginTop?: number;
    marginBottom?: number;
    paddingTop?: number;
    paddingBottom?: number;
}

export function TextAreaComponent({
    placeholder = 'Enter text...',
    rows = 4,
    width = 'auto',
    height = 'auto',
    marginTop = 0,
    marginBottom = 0,
    paddingTop = 0,
    paddingBottom = 0,
}: TextAreaComponentProps) {
    const sizeStyle = createSizeStyle(width, height);
    const spacingStyle = createSpacingStyle(marginTop, marginBottom, paddingTop, paddingBottom);

    return (
        <div style={spacingStyle}>
            <ShadcnTextarea className="break-all" placeholder={placeholder} rows={rows} style={sizeStyle} />
        </div>
    );
}
