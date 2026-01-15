'use client';

import Image from 'next/image';
import { createSpacingStyle } from '@/lib/spacing-utils';

interface ImageComponentProps {
    src?: string;
    alt?: string;
    width?: number;
    height?: number;
    marginTop?: number;
    marginBottom?: number;
    paddingTop?: number;
    paddingBottom?: number;
}

export function ImageComponent({
    src = 'https://via.placeholder.com/300x200',
    alt = 'Placeholder image',
    width = 300,
    height = 200,
    marginTop = 0,
    marginBottom = 0,
    paddingTop = 0,
    paddingBottom = 0,
}: ImageComponentProps) {
    const spacingStyle = createSpacingStyle(marginTop, marginBottom, paddingTop, paddingBottom);

    return (
        <div className="relative" style={{ ...spacingStyle, width: `${width}px`, height: `${height}px` }}>
            <Image
                src={src}
                alt={alt}
                fill
                className="rounded-md object-cover"
                unoptimized // For external URLs
            />
        </div>
    );
}
