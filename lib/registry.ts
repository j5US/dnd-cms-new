import { ComponentDefinition, ComponentType } from './types';

// Component registry - maps component types to their definitions
export const componentRegistry: Record<ComponentType, ComponentDefinition> = {
    // Building Blocks
    'flex-block': {
        type: 'flex-block',
        category: 'building-block',
        label: 'Flex Block',
        icon: '📦',
        acceptsChildren: true,
        defaultProps: {
            direction: 'column',
            align: 'center',
            justify: 'start',
            gap: 4,
            height: 'auto',
        },
        propSchema: [
            {
                key: 'direction',
                label: 'Direction',
                type: 'select',
                options: ['row', 'column'],
                defaultValue: 'column',
            },
            {
                key: 'align',
                label: 'Align',
                type: 'select',
                options: ['start', 'center', 'end'],
                defaultValue: 'center',
            },
            {
                key: 'justify',
                label: 'Justify',
                type: 'select',
                options: ['start', 'center', 'end', 'between'],
                defaultValue: 'start',
            },
            {
                key: 'gap',
                label: 'Gap',
                type: 'number',
                defaultValue: 4,
            },
            {
                key: 'height',
                label: 'Height (px or auto)',
                type: 'text',
                defaultValue: 'auto',
            },
        ],
    },

    'grid-block': {
        type: 'grid-block',
        category: 'building-block',
        label: 'Grid Block',
        icon: '⊞',
        acceptsChildren: true,
        defaultProps: {
            columns: 2,
            gap: 4,
            height: 'auto',
        },
        propSchema: [
            {
                key: 'columns',
                label: 'Columns',
                type: 'select',
                options: ['1', '2', '3', '4'],
                defaultValue: 2,
            },
            {
                key: 'gap',
                label: 'Gap',
                type: 'number',
                defaultValue: 4,
            },
            {
                key: 'height',
                label: 'Height (px or auto)',
                type: 'text',
                defaultValue: 'auto',
            },
        ],
    },

    'card-block': {
        type: 'card-block',
        category: 'building-block',
        label: 'Card',
        icon: '🎴',
        acceptsChildren: true,
        defaultProps: {
            padding: 4,
            borderRadius: 2,
            backgroundColor: '#ffffff',
            borderColor: '#e5e7eb',
            borderWidth: 1,
            shadow: 'md',
            width: 'auto',
            height: 'auto',
            justify: 'start',
            align: 'start',
        },
        propSchema: [
            {
                key: 'padding',
                label: 'Padding',
                type: 'select',
                options: ['0', '1', '2', '3', '4', '5', '6'],
                defaultValue: 4,
            },
            {
                key: 'borderRadius',
                label: 'Border Radius',
                type: 'select',
                options: ['0', '1', '2', '3', '4'],
                defaultValue: 2,
            },
            {
                key: 'backgroundColor',
                label: 'Background Color',
                type: 'color',
                defaultValue: '#ffffff',
            },
            {
                key: 'borderColor',
                label: 'Border Color',
                type: 'color',
                defaultValue: '#e5e7eb',
            },
            {
                key: 'borderWidth',
                label: 'Border Width',
                type: 'select',
                options: ['0', '1', '2', '3', '4'],
                defaultValue: 1,
            },
            {
                key: 'shadow',
                label: 'Shadow',
                type: 'select',
                options: ['none', 'sm', 'md', 'lg'],
                defaultValue: 'md',
            },
            {
                key: 'justify',
                label: 'Justify Content',
                type: 'select',
                options: ['start', 'center', 'end', 'between'],
                defaultValue: 'start',
            },
            {
                key: 'align',
                label: 'Align Items',
                type: 'select',
                options: ['start', 'center', 'end'],
                defaultValue: 'start',
            },
            {
                key: 'width',
                label: 'Width (px or auto)',
                type: 'text',
                defaultValue: 'auto',
            },
            {
                key: 'height',
                label: 'Height (px or auto)',
                type: 'text',
                defaultValue: 'auto',
            },
        ],
    },

    // Content Components
    'button': {
        type: 'button',
        category: 'content',
        label: 'Button',
        icon: '🔘',
        acceptsChildren: false,
        defaultProps: {
            text: 'Click me',
            variant: 'default',
            size: 'default',
            width: 'auto',
            height: 'auto',
            marginTop: 0,
            marginBottom: 0,
            paddingTop: 0,
            paddingBottom: 0,
        },
        propSchema: [
            {
                key: 'text',
                label: 'Text',
                type: 'text',
                defaultValue: 'Click me',
            },
            {
                key: 'variant',
                label: 'Variant',
                type: 'select',
                options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
                defaultValue: 'default',
            },
            {
                key: 'size',
                label: 'Size',
                type: 'select',
                options: ['default', 'sm', 'lg', 'icon'],
                defaultValue: 'default',
            },
            {
                key: 'width',
                label: 'Width (px or auto)',
                type: 'text',
                defaultValue: 'auto',
            },
            {
                key: 'height',
                label: 'Height (px or auto)',
                type: 'text',
                defaultValue: 'auto',
            },
            {
                key: 'marginTop',
                label: 'Margin Top',
                type: 'select',
                options: ['0', '1', '2', '3', '4'],
                defaultValue: 0,
            },
            {
                key: 'marginBottom',
                label: 'Margin Bottom',
                type: 'select',
                options: ['0', '1', '2', '3', '4'],
                defaultValue: 0,
            },
            {
                key: 'paddingTop',
                label: 'Padding Top',
                type: 'select',
                options: ['0', '1', '2', '3', '4'],
                defaultValue: 0,
            },
            {
                key: 'paddingBottom',
                label: 'Padding Bottom',
                type: 'select',
                options: ['0', '1', '2', '3', '4'],
                defaultValue: 0,
            },
        ],
    },

    'text': {
        type: 'text',
        category: 'content',
        label: 'Text',
        icon: '📝',
        acceptsChildren: false,
        defaultProps: {
            content: 'Your text here',
            tag: 'p',
            align: 'left',
            width: 'auto',
            color: '#000000',
            fontSize: 16,
            marginTop: 0,
            marginBottom: 0,
            paddingTop: 0,
            paddingBottom: 0,
        },
        propSchema: [
            {
                key: 'content',
                label: 'Content',
                type: 'text',
                defaultValue: 'Your text here',
            },
            {
                key: 'tag',
                label: 'Tag',
                type: 'select',
                options: ['p', 'h1', 'h2', 'h3', 'h4'],
                defaultValue: 'p',
            },
            {
                key: 'align',
                label: 'Align',
                type: 'select',
                options: ['left', 'center', 'right'],
                defaultValue: 'left',
            },
            {
                key: 'width',
                label: 'Width (px or auto)',
                type: 'text',
                defaultValue: 'auto',
            },
            {
                key: 'color',
                label: 'Text Color',
                type: 'color',
                defaultValue: '#000000',
            },
            {
                key: 'fontSize',
                label: 'Font Size (px)',
                type: 'number',
                defaultValue: 16,
            },
            {
                key: 'marginTop',
                label: 'Margin Top',
                type: 'select',
                options: ['0', '1', '2', '3', '4'],
                defaultValue: 0,
            },
            {
                key: 'marginBottom',
                label: 'Margin Bottom',
                type: 'select',
                options: ['0', '1', '2', '3', '4'],
                defaultValue: 0,
            },
            {
                key: 'paddingTop',
                label: 'Padding Top',
                type: 'select',
                options: ['0', '1', '2', '3', '4'],
                defaultValue: 0,
            },
            {
                key: 'paddingBottom',
                label: 'Padding Bottom',
                type: 'select',
                options: ['0', '1', '2', '3', '4'],
                defaultValue: 0,
            },
        ],
    },

    'image': {
        type: 'image',
        category: 'content',
        label: 'Image',
        icon: '🖼️',
        acceptsChildren: false,
        defaultProps: {
            src: 'https://via.placeholder.com/300x200',
            alt: 'Placeholder image',
            width: 300,
            height: 200,
            marginTop: 0,
            marginBottom: 0,
            paddingTop: 0,
            paddingBottom: 0,
        },
        propSchema: [
            {
                key: 'src',
                label: 'Image URL',
                type: 'text',
                defaultValue: 'https://via.placeholder.com/300x200',
            },
            {
                key: 'alt',
                label: 'Alt Text',
                type: 'text',
                defaultValue: 'Placeholder image',
            },
            {
                key: 'width',
                label: 'Width',
                type: 'number',
                defaultValue: 300,
            },
            {
                key: 'height',
                label: 'Height',
                type: 'number',
                defaultValue: 200,
            },
            {
                key: 'marginTop',
                label: 'Margin Top',
                type: 'select',
                options: ['0', '1', '2', '3', '4'],
                defaultValue: 0,
            },
            {
                key: 'marginBottom',
                label: 'Margin Bottom',
                type: 'select',
                options: ['0', '1', '2', '3', '4'],
                defaultValue: 0,
            },
            {
                key: 'paddingTop',
                label: 'Padding Top',
                type: 'select',
                options: ['0', '1', '2', '3', '4'],
                defaultValue: 0,
            },
            {
                key: 'paddingBottom',
                label: 'Padding Bottom',
                type: 'select',
                options: ['0', '1', '2', '3', '4'],
                defaultValue: 0,
            },
        ],
    },

    'input': {
        type: 'input',
        category: 'content',
        label: 'Input',
        icon: '📥',
        acceptsChildren: false,
        defaultProps: {
            placeholder: 'Enter text...',
            inputType: 'text',
            width: 'auto',
            height: 'auto',
            marginTop: 0,
            marginBottom: 0,
            paddingTop: 0,
            paddingBottom: 0,
        },
        propSchema: [
            {
                key: 'placeholder',
                label: 'Placeholder',
                type: 'text',
                defaultValue: 'Enter text...',
            },
            {
                key: 'inputType',
                label: 'Type',
                type: 'select',
                options: ['text', 'email', 'password', 'number'],
                defaultValue: 'text',
            },
            {
                key: 'width',
                label: 'Width (px or auto)',
                type: 'text',
                defaultValue: 'auto',
            },
            {
                key: 'height',
                label: 'Height (px or auto)',
                type: 'text',
                defaultValue: 'auto',
            },
            {
                key: 'marginTop',
                label: 'Margin Top',
                type: 'select',
                options: ['0', '1', '2', '3', '4'],
                defaultValue: 0,
            },
            {
                key: 'marginBottom',
                label: 'Margin Bottom',
                type: 'select',
                options: ['0', '1', '2', '3', '4'],
                defaultValue: 0,
            },
            {
                key: 'paddingTop',
                label: 'Padding Top',
                type: 'select',
                options: ['0', '1', '2', '3', '4'],
                defaultValue: 0,
            },
            {
                key: 'paddingBottom',
                label: 'Padding Bottom',
                type: 'select',
                options: ['0', '1', '2', '3', '4'],
                defaultValue: 0,
            },
        ],
    },

    'textarea': {
        type: 'textarea',
        category: 'content',
        label: 'Text Area',
        icon: '📄',
        acceptsChildren: false,
        defaultProps: {
            placeholder: 'Enter text...',
            rows: 4,
            width: 'auto',
            height: 'auto',
            marginTop: 0,
            marginBottom: 0,
            paddingTop: 0,
            paddingBottom: 0,
        },
        propSchema: [
            {
                key: 'placeholder',
                label: 'Placeholder',
                type: 'text',
                defaultValue: 'Enter text...',
            },
            {
                key: 'rows',
                label: 'Rows',
                type: 'number',
                defaultValue: 4,
            },
            {
                key: 'width',
                label: 'Width (px or auto)',
                type: 'text',
                defaultValue: 'auto',
            },
            {
                key: 'height',
                label: 'Height (px or auto)',
                type: 'text',
                defaultValue: 'auto',
            },
            {
                key: 'marginTop',
                label: 'Margin Top',
                type: 'select',
                options: ['0', '1', '2', '3', '4'],
                defaultValue: 0,
            },
            {
                key: 'marginBottom',
                label: 'Margin Bottom',
                type: 'select',
                options: ['0', '1', '2', '3', '4'],
                defaultValue: 0,
            },
            {
                key: 'paddingTop',
                label: 'Padding Top',
                type: 'select',
                options: ['0', '1', '2', '3', '4'],
                defaultValue: 0,
            },
            {
                key: 'paddingBottom',
                label: 'Padding Bottom',
                type: 'select',
                options: ['0', '1', '2', '3', '4'],
                defaultValue: 0,
            },
        ],
    },
};

// Helper to get building blocks
export function getBuildingBlocks(): ComponentDefinition[] {
    return Object.values(componentRegistry).filter(
        (def) => def.category === 'building-block'
    );
}

// Helper to get content components
export function getContentComponents(): ComponentDefinition[] {
    return Object.values(componentRegistry).filter(
        (def) => def.category === 'content'
    );
}

// Helper to check if a component accepts children
export function canAcceptChildren(type: ComponentType): boolean {
    return componentRegistry[type].acceptsChildren;
}
