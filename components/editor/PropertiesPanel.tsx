import { useCampaign } from '@/lib/store';
import { componentRegistry } from '@/lib/registry';
import { TextControl } from './controls/TextControl';
import { NumberControl } from './controls/NumberControl';
import { SelectControl } from './controls/SelectControl';
import { ToggleControl } from './controls/ToggleControl';
import { ColorControl } from './controls/ColorControl';
import { SpacingControl } from './controls/SpacingControl';
import { PageSettings, SpacingValue } from '@/lib/types';

export function PropertiesPanel() {
    const { state, dispatch, activePage } = useCampaign();

    // Default page settings
    const defaultPageSettings: PageSettings = {
        padding: { all: '16px', top: '16px', right: '16px', bottom: '16px', left: '16px' },
    };

    // Handle page settings changes
    const handlePageSettingChange = (key: keyof PageSettings, value: { top?: string; right?: string; bottom?: string; left?: string; all?: string }) => {
        // Ensure all values are defined with defaults
        const spacingValue: SpacingValue = {
            all: value.all || value.top || '0px',
            top: value.top || value.all || '0px',
            right: value.right || value.all || '0px',
            bottom: value.bottom || value.all || '0px',
            left: value.left || value.all || '0px',
        };
        dispatch({
            type: 'UPDATE_PAGE_SETTINGS',
            settings: { [key]: spacingValue },
        });
    };

    // Show Page Settings when no component is selected
    if (!state.selectedNode) {
        const pageSettings = activePage?.settings || defaultPageSettings;

        return (
            <div className="w-[448px] border-l bg-gray-50 p-4 overflow-y-auto">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Page Settings</h2>

                <div className="mb-4 pb-4 border-b">
                    <p className="text-sm text-gray-600">
                        <strong>Canvas Layout</strong>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        Configure padding for the main canvas area
                    </p>
                </div>

                <div className="space-y-4">
                    <SpacingControl
                        label="Padding"
                        values={pageSettings.padding}
                        onChange={(val) => handlePageSettingChange('padding', val)}
                    />
                </div>

                <div className="mt-6 pt-4 border-t text-center text-gray-400">
                    <p className="text-xs">Click on a component to edit its properties</p>
                </div>
            </div>
        );
    }

    if (!activePage) {
        return (
            <div className="w-[448px] border-l bg-gray-50 p-4">
                <div className="text-center text-gray-400 mt-8">
                    <p className="text-sm">No active page</p>
                </div>
            </div>
        );
    }

    const { nodeId, componentType } = state.selectedNode;
    const definition = componentRegistry[componentType];

    // Find the node to get current props
    function findNode(nodes: any[], id: string): any {
        for (const node of nodes) {
            if (node.id === id) return node;
            if (node.children) {
                const found = findNode(node.children, id);
                if (found) return found;
            }
        }
        return null;
    }

    const node = findNode(activePage.layout, nodeId);
    if (!node) return null;

    const handlePropChange = (key: string, value: any) => {
        dispatch({
            type: 'UPDATE_COMPONENT',
            nodeId,
            props: { [key]: value },
        });
    };

    return (
        <div className="w-[448px] border-l bg-gray-50 p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Properties</h2>

            <div className="mb-4 pb-4 border-b">
                <p className="text-sm text-gray-600">
                    <strong>{definition.label}</strong>
                </p>
                <p className="text-xs text-gray-500 mt-1">ID: {nodeId}</p>
            </div>

            <div className="space-y-4">
                {definition.propSchema.map((schema: any) => {
                    const currentValue = node.props[schema.key] ?? schema.defaultValue;

                    switch (schema.type) {
                        case 'text':
                            return (
                                <TextControl
                                    key={schema.key}
                                    label={schema.label}
                                    value={currentValue as string}
                                    onChange={(val) => handlePropChange(schema.key, val)}
                                />
                            );
                        case 'number':
                            return (
                                <NumberControl
                                    key={schema.key}
                                    label={schema.label}
                                    value={currentValue as number}
                                    onChange={(val) => handlePropChange(schema.key, val)}
                                />
                            );
                        case 'select':
                            return (
                                <SelectControl
                                    key={schema.key}
                                    label={schema.label}
                                    value={currentValue as string}
                                    options={schema.options || []}
                                    onChange={(val) => handlePropChange(schema.key, val)}
                                />
                            );
                        case 'toggle':
                            return (
                                <ToggleControl
                                    key={schema.key}
                                    label={schema.label}
                                    value={currentValue as boolean}
                                    onChange={(val) => handlePropChange(schema.key, val)}
                                />
                            );
                        case 'color':
                            return (
                                <ColorControl
                                    key={schema.key}
                                    label={schema.label}
                                    value={currentValue as string}
                                    onChange={(val) => handlePropChange(schema.key, val)}
                                />
                            );
                        case 'spacing':
                            return (
                                <SpacingControl
                                    key={schema.key}
                                    label={schema.label}
                                    values={currentValue as any || {}}
                                    onChange={(val) => handlePropChange(schema.key, val)}
                                />
                            );
                        default:
                            return null;
                    }
                })}
            </div>

            <div className="mt-6 pt-4 border-t">
                <button
                    onClick={() => dispatch({ type: 'DELETE_COMPONENT', nodeId })}
                    className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                    Delete Component
                </button>
            </div>
        </div>
    );
}
