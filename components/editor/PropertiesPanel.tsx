'use client';

import { useCampaign } from '@/lib/store';
import { componentRegistry } from '@/lib/registry';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function PropertiesPanel() {
    const { state, dispatch, activePage } = useCampaign();

    if (!state.selectedNode || !activePage) {
        return (
            <div className="w-80 border-l bg-gray-50 p-4">
                <div className="text-center text-gray-400 mt-8">
                    <p className="text-sm">No component selected</p>
                    <p className="text-xs mt-2">Click on a component to edit its properties</p>
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
        <div className="w-80 border-l bg-gray-50 p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Properties</h2>

            <div className="mb-4 pb-4 border-b">
                <p className="text-sm text-gray-600">
                    <strong>{definition.label}</strong>
                </p>
                <p className="text-xs text-gray-500 mt-1">ID: {nodeId}</p>
            </div>

            <div className="space-y-4">
                {definition.propSchema.map((schema) => {
                    const currentValue = node.props[schema.key] ?? schema.defaultValue;

                    return (
                        <div key={schema.key}>
                            <Label htmlFor={schema.key} className="text-sm font-medium text-gray-700 mb-2 block">
                                {schema.label}
                            </Label>

                            {schema.type === 'text' && (
                                <Input
                                    id={schema.key}
                                    type="text"
                                    value={currentValue as string}
                                    onChange={(e) => handlePropChange(schema.key, e.target.value)}
                                />
                            )}

                            {schema.type === 'number' && (
                                <Input
                                    id={schema.key}
                                    type="number"
                                    value={currentValue as number}
                                    onChange={(e) => handlePropChange(schema.key, Number(e.target.value))}
                                />
                            )}

                            {schema.type === 'select' && schema.options && (
                                <select
                                    id={schema.key}
                                    value={currentValue as string}
                                    onChange={(e) => handlePropChange(schema.key, e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md bg-white"
                                >
                                    {schema.options.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            )}

                            {schema.type === 'toggle' && (
                                <input
                                    id={schema.key}
                                    type="checkbox"
                                    checked={currentValue as boolean}
                                    onChange={(e) => handlePropChange(schema.key, e.target.checked)}
                                    className="w-4 h-4"
                                />
                            )}

                            {schema.type === 'color' && (
                                <div className="flex gap-2 items-center">
                                    <input
                                        id={schema.key}
                                        type="color"
                                        value={currentValue as string}
                                        onChange={(e) => handlePropChange(schema.key, e.target.value)}
                                        className="w-12 h-10 rounded border cursor-pointer"
                                    />
                                    <Input
                                        type="text"
                                        value={currentValue as string}
                                        onChange={(e) => handlePropChange(schema.key, e.target.value)}
                                        placeholder="#ffffff"
                                        className="flex-1"
                                    />
                                </div>
                            )}
                        </div>
                    );
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
