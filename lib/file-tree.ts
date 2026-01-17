export interface FileNode {
    name: string;
    type: 'file' | 'folder';
    path: string;
    children?: FileNode[];
    content?: string;
}

export const componentFileTree: FileNode[] = [
    {
        name: 'building-blocks',
        type: 'folder',
        path: 'components/building-blocks',
        children: [
            {
                name: 'FlexBlock.tsx',
                type: 'file',
                path: 'components/building-blocks/FlexBlock.tsx',
                content: `'use client';

import { ReactNode } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';

interface FlexBlockProps {
    direction?: 'row' | 'column';
    align?: 'start' | 'center' | 'end';
    justify?: 'start' | 'center' | 'end' | 'between';
    gap?: number;
    height?: string | number;
    children?: ReactNode;
    className?: string;
    nodeId?: string;
    isEditor?: boolean;
}

export function FlexBlock({
    direction = 'column',
    align = 'center',
    justify = 'start',
    gap = 4,
    height = 'auto',
    children,
    className,
    nodeId,
    isEditor = true,
}: FlexBlockProps) {
    const { setNodeRef, isOver } = useDroppable({
        id: nodeId || 'flex-block',
        data: {
            accepts: 'content',
        },
    });
    const flexDirection = direction === 'row' ? 'flex-row' : 'flex-col';

    const alignItems =
        align === 'start'
            ? 'items-start'
            : align === 'end'
                ? 'items-end'
                : 'items-center';

    const justifyContent =
        justify === 'start'
            ? 'justify-start'
            : justify === 'end'
                ? 'justify-end'
                : justify === 'between'
                    ? 'justify-between'
                    : 'justify-center';

    const gapStyle = gap * 4; // Convert to pixels (gap-1 = 4px in Tailwind)

    const heightStyle = height === 'auto' ? { gap: \`\${gapStyle}px\` } : { height: \`\${height}px\`, gap: \`\${gapStyle}px\` };

    return (
        <div
            ref={setNodeRef}
            className={cn(
                'w-full flex',
                flexDirection,
                alignItems,
                justifyContent,
                // Only show editor-specific styling when in editor mode
                isEditor && 'p-4 border border-dashed border-gray-300 rounded-md bg-gray-50/50',
                isEditor && isOver && 'ring-2 ring-green-400 bg-green-50/50',
                className
            )}
            style={heightStyle}
        >
            {children || (
                isEditor && <div className="text-sm text-gray-400 italic">Drop content components here</div>
            )}
        </div>
    );
}
`
            },
            {
                name: 'GridBlock.tsx',
                type: 'file',
                path: 'components/building-blocks/GridBlock.tsx',
                content: `'use client';

import { ReactNode } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';

interface GridBlockProps {
    columns?: number;
    gap?: number;
    height?: string | number;
    children?: ReactNode;
    className?: string;
    nodeId?: string;
    isEditor?: boolean;
}

export function GridBlock({
    columns = 2,
    gap = 4,
    height = 'auto',
    children,
    className,
    nodeId,
    isEditor = true,
}: GridBlockProps) {
    const { setNodeRef, isOver } = useDroppable({
        id: nodeId || 'grid-block',
        data: {
            accepts: 'content',
        },
    });
    const gapStyle = gap * 4; // Convert to pixels (gap-1 = 4px in Tailwind)

    const heightStyle = height === 'auto'
        ? { gap: \`\${gapStyle}px\`, gridTemplateColumns: \`repeat(\${columns}, 1fr)\` }
        : { height: \`\${height}px\`, gap: \`\${gapStyle}px\`, gridTemplateColumns: \`repeat(\${columns}, 1fr)\` };

    return (
        <div
            ref={setNodeRef}
            className={cn(
                'w-full grid *:w-full',
                // Only show editor-specific styling when in editor mode
                isEditor && 'p-4 border border-dashed border-gray-300 rounded-md bg-gray-50/50',
                isEditor && isOver && 'ring-2 ring-green-400 bg-green-50/50',
                className
            )}
            style={heightStyle}
        >
            {children || (
                isEditor && (
                    <div className="col-span-full text-sm text-gray-400 italic">
                        Drop content components here
                    </div>
                )
            )}
        </div>
    );
}
`
            },
            {
                name: 'CardBlock.tsx',
                type: 'file',
                path: 'components/building-blocks/CardBlock.tsx',
                content: `'use client';

import { ReactNode } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';

interface CardBlockProps {
    padding?: number;
    borderRadius?: number;
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    shadow?: 'none' | 'sm' | 'md' | 'lg';
    width?: string | number;
    height?: string | number;
    justify?: 'start' | 'center' | 'end' | 'between';
    align?: 'start' | 'center' | 'end';
    children?: ReactNode;
    className?: string;
    nodeId?: string;
    isEditor?: boolean;
}

export function CardBlock({
    padding = 4,
    borderRadius = 2,
    backgroundColor = '#ffffff',
    borderColor = '#e5e7eb',
    borderWidth = 1,
    shadow = 'md',
    width = 'auto',
    height = 'auto',
    justify = 'start',
    align = 'start',
    children,
    className,
    nodeId,
    isEditor = true,
}: CardBlockProps) {
    const { setNodeRef, isOver } = useDroppable({
        id: nodeId || 'card-block',
        data: {
            accepts: 'content',
        },
    });

    const shadowClass = {
        'none': '',
        'sm': 'shadow-sm',
        'md': 'shadow-md',
        'lg': 'shadow-lg',
    }[shadow];

    const paddingPx = padding * 4;
    const borderRadiusPx = borderRadius * 4;

    const justifyClass = {
        'start': 'justify-start',
        'center': 'justify-center',
        'end': 'justify-end',
        'between': 'justify-between',
    }[justify];

    const alignClass = {
        'start': 'items-start',
        'center': 'items-center',
        'end': 'items-end',
    }[align];

    const cardStyle: React.CSSProperties = {
        padding: \`\${paddingPx}px\`,
        borderRadius: \`\${borderRadiusPx}px\`,
        backgroundColor,
        borderColor,
        borderWidth: \`\${borderWidth}px\`,
        borderStyle: 'solid',
    };

    if (width !== 'auto') {
        cardStyle.width = typeof width === 'number' ? \`\${width}px\` : width;
    }
    if (height !== 'auto') {
        cardStyle.height = \`\${height}px\`;
    }

    return (
        <div
            ref={setNodeRef}
            className={cn(
                'w-full flex flex-col',
                justifyClass,
                alignClass,
                shadowClass,
                isEditor && isOver && 'ring-2 ring-green-400',
                className
            )}
            style={cardStyle}
        >
            {children || (
                isEditor && <div className="text-sm text-gray-400 italic text-center">Drop content components here</div>
            )}
        </div>
    );
}
`
            }
        ]
    },
    {
        name: 'content',
        type: 'folder',
        path: 'components/content',
        children: [
            {
                name: 'ButtonComponent.tsx',
                type: 'file',
                path: 'components/content/ButtonComponent.tsx',
                content: `'use client';

import { Button as ShadcnButton } from '@/components/ui/button';
import { createSizeStyle } from '@/lib/size-utils';
import { createSpacingStyle } from '@/lib/spacing-utils';

interface ButtonComponentProps {
    text?: string;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    width?: string | number;
    height?: string | number;
    marginTop?: number;
    marginBottom?: number;
    paddingTop?: number;
    paddingBottom?: number;
}

export function ButtonComponent({
    text = 'Click me',
    variant = 'default',
    size = 'default',
    width = 'auto',
    height = 'auto',
    marginTop = 0,
    marginBottom = 0,
    paddingTop = 0,
    paddingBottom = 0,
}: ButtonComponentProps) {
    const sizeStyle = createSizeStyle(width, height);
    const spacingStyle = createSpacingStyle(marginTop, marginBottom, paddingTop, paddingBottom);

    return (
        <div style={spacingStyle}>
            <ShadcnButton
                className="break-all whitespace-normal"
                variant={variant}
                size={size}
                style={sizeStyle}
            >
                {text}
            </ShadcnButton>
        </div>
    );
}
`
            },
            {
                name: 'ImageComponent.tsx',
                type: 'file',
                path: 'components/content/ImageComponent.tsx',
                content: `'use client';

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
        <div className="relative" style={{ ...spacingStyle, width: \`\${width}px\`, height: \`\${height}px\` }}>
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
`
            },
            {
                name: 'InputComponent.tsx',
                type: 'file',
                path: 'components/content/InputComponent.tsx',
                content: `'use client';

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
`
            },
            {
                name: 'TextAreaComponent.tsx',
                type: 'file',
                path: 'components/content/TextAreaComponent.tsx',
                content: `'use client';

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
`
            },
            {
                name: 'TextComponent.tsx',
                type: 'file',
                path: 'components/content/TextComponent.tsx',
                content: `'use client';

import { cn } from '@/lib/utils';
import { createSizeStyle } from '@/lib/size-utils';
import { createSpacingStyle } from '@/lib/spacing-utils';

interface TextComponentProps {
    content?: string;
    tag?: 'p' | 'h1' | 'h2' | 'h3' | 'h4';
    align?: 'left' | 'center' | 'right';
    width?: string | number;
    marginTop?: number;
    marginBottom?: number;
    paddingTop?: number;
    paddingBottom?: number;
}

export function TextComponent({
    content = 'Your text here',
    tag = 'p',
    align = 'left',
    width = 'auto',
    marginTop = 0,
    marginBottom = 0,
    paddingTop = 0,
    paddingBottom = 0,
}: TextComponentProps) {
    const Tag = tag;

    const alignClass =
        align === 'center'
            ? 'text-center'
            : align === 'right'
                ? 'text-right'
                : 'text-left';

    const tagStyles = {
        h1: 'text-4xl font-bold',
        h2: 'text-3xl font-bold',
        h3: 'text-2xl font-semibold',
        h4: 'text-xl font-semibold',
        p: 'text-base',
    };

    const sizeStyle = createSizeStyle(width, undefined);
    const spacingStyle = createSpacingStyle(marginTop, marginBottom, paddingTop, paddingBottom);

    return (
        <div style={spacingStyle}>
            <Tag className={cn(tagStyles[tag], alignClass, 'break-all')} style={sizeStyle}>{content}</Tag>
        </div>
    );
}
`
            }
        ]
    },
    {
        name: 'renderer',
        type: 'folder',
        path: 'components/renderer',
        children: [
            {
                name: 'LayoutRenderer.tsx',
                type: 'file',
                path: 'components/renderer/LayoutRenderer.tsx',
                content: `'use client';

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
            wrapperStyle.width = node.props.width === 'auto' ? 'auto' : \`min(\${node.props.width}px, 100%)\`;
            wrapperStyle.boxSizing = 'border-box';
            wrapperStyle.minWidth = 0;
        }
        if (node.props.height && node.props.height !== 'auto') {
            wrapperStyle.height = \`\${node.props.height}px\`;
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
`
            }
        ]
    },
    {
        name: 'ui',
        type: 'folder',
        path: 'components/ui',
        children: [
            {
                name: 'button.tsx',
                type: 'file',
                path: 'components/ui/button.tsx',
                content: `import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
`
            }
        ]
    }
];

// Helper function to flatten the tree and get all files
export function getAllFiles(nodes: FileNode[]): FileNode[] {
    const files: FileNode[] = [];

    function traverse(node: FileNode) {
        if (node.type === 'file') {
            files.push(node);
        } else if (node.children) {
            node.children.forEach(traverse);
        }
    }

    nodes.forEach(traverse);
    return files;
}

// Helper function to find a file by path
export function findFileByPath(nodes: FileNode[], path: string): FileNode | null {
    for (const node of nodes) {
        if (node.path === path && node.type === 'file') {
            return node;
        }
        if (node.children) {
            const found = findFileByPath(node.children, path);
            if (found) return found;
        }
    }
    return null;
}
