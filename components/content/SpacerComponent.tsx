import { CSSProperties } from 'react';

interface SpacerComponentProps {
    height: number;
}

export function SpacerComponent({ height = 32 }: SpacerComponentProps) {
    const style: CSSProperties = {
        height: `${height}px`,
        width: '100%',
        display: 'block',
    };

    return <div style={style} aria-hidden="true" />;
}
