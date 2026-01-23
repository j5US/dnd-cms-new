import { CSSProperties } from 'react';

interface HeadingComponentProps {
    text: string;
    level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    align: 'left' | 'center' | 'right';
    color: string;
    width?: string;
    marginTop?: number;
    marginBottom?: number;
    paddingTop?: number;
    paddingBottom?: number;
}

export function HeadingComponent({
    text = 'Heading',
    level = 'h2',
    align = 'left',
    color = '#000000',
    width = 'auto',
    marginTop = 0,
    marginBottom = 0,
    paddingTop = 0,
    paddingBottom = 0,
}: HeadingComponentProps) {
    const Tag = level;

    const style: CSSProperties = {
        textAlign: align,
        color,
        width: width === 'auto' ? 'auto' : `min(${width}, 100%)`, // Ensures responsiveness
        marginTop: `${marginTop * 4}px`,
        marginBottom: `${marginBottom * 4}px`,
        paddingTop: `${paddingTop * 4}px`,
        paddingBottom: `${paddingBottom * 4}px`,
    };

    return (
        <Tag className="font-bold leading-tight" style={style}>
            {text}
        </Tag>
    );
}
