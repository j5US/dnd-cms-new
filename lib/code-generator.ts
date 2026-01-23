import { Campaign, LayoutNode, ComponentType } from './types';
import { componentRegistry } from './registry';

/**
 * Generates React TSX code that uses the actual component implementations
 * from the project, making it a true representation of the page structure
 */
export function generatePageCode(pageLayout: LayoutNode[], pageName: string = 'GeneratedPage'): string {
    // Handle empty page
    if (!pageLayout || pageLayout.length === 0) {
        return `// No components on this page
export default function ${pageName}() {
  return null;
}`;
    }

    // Collect all component types used in the layout
    const usedComponents = new Set<ComponentType>();
    const collectComponents = (nodes: LayoutNode[]) => {
        nodes.forEach(node => {
            usedComponents.add(node.type);
            if (node.children && node.children.length > 0) {
                collectComponents(node.children);
            }
        });
    };
    collectComponents(pageLayout);

    // Generate imports for used components
    const imports: string[] = [];

    // Component type to import mapping
    const componentImports: Record<ComponentType, { path: string; name: string }> = {
        'flex-block': { path: '@/components/building-blocks/FlexBlock', name: 'FlexBlock' },
        'grid-block': { path: '@/components/building-blocks/GridBlock', name: 'GridBlock' },
        'card-block': { path: '@/components/building-blocks/CardBlock', name: 'CardBlock' },
        'button': { path: '@/components/content/ButtonComponent', name: 'ButtonComponent' },
        'text': { path: '@/components/content/TextComponent', name: 'TextComponent' },
        'heading': { path: '@/components/content/HeadingComponent', name: 'HeadingComponent' },
        'image': { path: '@/components/content/ImageComponent', name: 'ImageComponent' },
        'input': { path: '@/components/content/InputComponent', name: 'InputComponent' },
        'textarea': { path: '@/components/content/TextAreaComponent', name: 'TextAreaComponent' },
        'video': { path: '@/components/content/VideoComponent', name: 'VideoComponent' },
        'divider': { path: '@/components/content/DividerComponent', name: 'DividerComponent' },
        'spacer': { path: '@/components/content/SpacerComponent', name: 'SpacerComponent' },
    };

    // Generate import statements
    usedComponents.forEach(componentType => {
        const importInfo = componentImports[componentType];
        if (importInfo) {
            imports.push(`import { ${importInfo.name} } from '${importInfo.path}';`);
        }
    });

    // Generate JSX using actual components
    const generateJSX = (nodes: LayoutNode[], indent: number = 2): string => {
        const indentStr = ' '.repeat(indent);

        return nodes.map(node => {
            const def = componentRegistry[node.type];

            if (!def) {
                return `${indentStr}{/* Unsupported component: ${node.type} */}`;
            }

            const props = node.props || {};
            const hasChildren = node.children && node.children.length > 0;

            // Get the component name from our mapping
            const importInfo = componentImports[node.type];
            if (!importInfo) {
                return `${indentStr}{/* Unknown component: ${node.type} */}`;
            }

            const componentName = importInfo.name;

            // Generate props string
            const propsArray: string[] = [];
            Object.entries(props).forEach(([key, value]) => {
                if (typeof value === 'string') {
                    propsArray.push(`${key}="${value}"`);
                } else if (typeof value === 'number' || typeof value === 'boolean') {
                    propsArray.push(`${key}={${value}}`);
                }
            });

            const propsStr = propsArray.length > 0 ? ' ' + propsArray.join(' ') : '';

            // Generate JSX
            if (hasChildren) {
                const childrenJSX = generateJSX(node.children!, indent + 2);
                return `${indentStr}<${componentName}${propsStr}>
${childrenJSX}
${indentStr}</${componentName}>`;
            } else {
                return `${indentStr}<${componentName}${propsStr} />`;
            }
        }).join('\n');
    };

    // Generate the complete code
    const jsx = generateJSX(pageLayout);

    return `// Portable React component - no custom dependencies required
${imports.join('\n')}

export default function ${pageName}() {
  return (
${jsx}
  );
}`;
}

// Generates code for the currently active page in a campaign
export function generateActivePageCode(campaign: Campaign, activePageId: string | null): string {
    if (!activePageId) {
        return '// No active page selected';
    }

    const activePage = campaign.pages.find(p => p.id === activePageId);
    if (!activePage) {
        return '// Active page not found';
    }

    return generatePageCode(activePage.layout, activePage.name.replace(/\s+/g, ''));
}
