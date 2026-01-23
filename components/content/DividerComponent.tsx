import { CSSProperties } from 'react';

interface DividerComponentProps {
    color: string;
    thickness: number;
    width: string;
    marginTop?: number;
    marginBottom?: number;
    paddingTop?: number;
    paddingBottom?: number;
}

export function DividerComponent({
    color = '#e5e7eb',
    thickness = 1,
    width = '100%',
    marginTop = 2,
    marginBottom = 2,
    paddingTop = 0,
    paddingBottom = 0,
}: DividerComponentProps) {
    const style: CSSProperties = {
        width: width,
        height: `${thickness}px`,
        backgroundColor: color,
        marginTop: `${marginTop * 4}px`,
        marginBottom: `${marginBottom * 4}px`,
        paddingTop: `${paddingTop * 4}px`,
        paddingBottom: `${paddingBottom * 4}px`,
        marginLeft: 'auto',
        marginRight: 'auto',
    };

    return <div style={style} />;
}
