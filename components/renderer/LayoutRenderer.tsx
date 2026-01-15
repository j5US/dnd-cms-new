'use client';

import { LayoutNode, ComponentType } from '@/lib/types';
import { FlexBlock } from '@/components/building-blocks/FlexBlock';
import { GridBlock } from '@/components/building-blocks/GridBlock';
import { ButtonComponent } from '@/components/content/ButtonComponent';
import { TextComponent } from '@/components/content/TextComponent';
import { ImageComponent } from '@/components/content/ImageComponent';
import { InputComponent } from '@/components/content/InputComponent';
import { TextAreaComponent } from '@/components/content/TextAreaComponent';
import { useCampaign } from '@/lib/store';

interface LayoutRendererProps {
    nodes: LayoutNode[];
    isEditor?: boolean;
}

export function LayoutRenderer({ nodes, isEditor = true }: LayoutRendererProps) {
    const { dispatch } = useCampaign();

    const renderNode = (node: LayoutNode) => {
        const handleClick = (e: React.MouseEvent) => {
            if (isEditor) {
                e.stopPropagation();
                dispatch({
                    type: 'SELECT_NODE',
                    nodeId: node.id,
                    componentType: node.type,
                });
            }
        };

        const handleDelete = (e: React.KeyboardEvent) => {
            if (isEditor && e.key === 'Delete') {
                e.preventDefault();
                dispatch({ type: 'DELETE_COMPONENT', nodeId: node.id });
            }
        };

        const wrapperProps = isEditor
            ? {
                onClick: handleClick,
                onKeyDown: handleDelete,
                tabIndex: 0,
                className: 'cursor-pointer hover:ring-2 hover:ring-blue-400 rounded-md transition-all',
            }
            : {};

        let Component: any = null;
        let componentProps: any = { ...node.props, nodeId: node.id };

        // Add isEditor prop for building blocks
        if (node.type === 'flex-block' || node.type === 'grid-block') {
            componentProps.isEditor = isEditor;
        }

        switch (node.type) {
            case 'flex-block':
                Component = FlexBlock;
                break;
            case 'grid-block':
                Component = GridBlock;
                break;
            case 'button':
                Component = ButtonComponent;
                break;
            case 'text':
                Component = TextComponent;
                break;
            case 'image':
                Component = ImageComponent;
                break;
            case 'input':
                Component = InputComponent;
                break;
            case 'textarea':
                Component = TextAreaComponent;
                break;
            default:
                return null;
        }

        // Apply width/height to wrapper if component has them
        const wrapperStyle: React.CSSProperties = {};
        if (node.props.width) {
            wrapperStyle.width = node.props.width === 'auto' ? 'auto' : `min(${node.props.width}px, 100%)`;
            wrapperStyle.boxSizing = 'border-box';
            wrapperStyle.minWidth = 0;
        }
        if (node.props.height && node.props.height !== 'auto') {
            wrapperStyle.height = `${node.props.height}px`;
        }

        return (
            <div key={node.id} {...wrapperProps} style={wrapperStyle}>
                <Component {...componentProps}>
                    {node.children && node.children.length > 0 ? (
                        <LayoutRenderer nodes={node.children} isEditor={isEditor} />
                    ) : null}
                </Component>
            </div>
        );
    };

    return <>{nodes.map(renderNode)}</>;
}
