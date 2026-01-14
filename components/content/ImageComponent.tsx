'use client';

import Image from 'next/image';

interface ImageComponentProps {
    src?: string;
    alt?: string;
    width?: number;
    height?: number;
}

export function ImageComponent({
    src = 'https://via.placeholder.com/300x200',
    alt = 'Placeholder image',
    width = 300,
    height = 200,
}: ImageComponentProps) {
    return (
        <div className="relative">
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className="rounded-md"
                unoptimized // For external URLs
            />
        </div>
    );
}
