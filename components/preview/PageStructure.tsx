'use client';

import { useState } from 'react';
import { LayoutNode, ComponentType } from '@/lib/types';
import { componentRegistry } from '@/lib/registry';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface PageStructureProps {
    nodes: LayoutNode[];
    pageName: string;
    onComponentSelect?: (componentType: ComponentType | null) => void;
    selectedComponentType?: ComponentType | null;
}

// Component type to icon/emoji mapping
const componentIcons: Record<string, string> = {
    'flex-block': '📦',
    'grid-block': '🔲',
    'button': '🔘',
    'text': '📝',
    'image': '🖼️',
    'input': '📋',
    'textarea': '📄',
};

// Get a readable label for a component
function getComponentLabel(node: LayoutNode): string {
    const def = componentRegistry[node.type];
    if (!def) return node.type;

    // Add extra info based on component type
    switch (node.type) {
        case 'flex-block':
            const direction = node.props.direction || 'column';
            return `${def.label} (${direction})`;
        case 'grid-block':
            const columns = node.props.columns || 2;
            return `${def.label} (${columns} cols)`;
        case 'text':
            const tag = node.props.tag || 'p';
            return `${def.label} (${tag})`;
        case 'button':
            const variant = node.props.variant || 'default';
            return `${def.label} (${variant})`;
        default:
            return def.label;
    }
}

export function PageStructure({ nodes, pageName, onComponentSelect, selectedComponentType }: PageStructureProps) {
    const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

    // Initially expand all nodes
    useState(() => {
        const allNodeIds = new Set<string>();
        const collectIds = (nodeList: LayoutNode[]) => {
            nodeList.forEach(node => {
                allNodeIds.add(node.id);
                if (node.children && node.children.length > 0) {
                    collectIds(node.children);
                }
            });
        };
        collectIds(nodes);
        setExpandedNodes(allNodeIds);
    });

    const toggleNode = (nodeId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const newExpanded = new Set(expandedNodes);
        if (newExpanded.has(nodeId)) {
            newExpanded.delete(nodeId);
        } else {
            newExpanded.add(nodeId);
        }
        setExpandedNodes(newExpanded);
    };

    const renderNode = (node: LayoutNode, depth: number = 0) => {
        const hasChildren = node.children && node.children.length > 0;
        const isExpanded = expandedNodes.has(node.id);
        const isSelected = selectedComponentType === node.type;
        const icon = componentIcons[node.type] || '📌';
        const label = getComponentLabel(node);

        return (
            <div key={node.id}>
                <div
                    className={`flex items-center gap-1 px-2 py-1.5 cursor-pointer select-none group ${isSelected ? 'bg-[#37373d]' : 'hover:bg-[#2a2d2e]'
                        }`}
                    style={{ paddingLeft: `${8 + depth * 16}px` }}
                    onClick={() => onComponentSelect && onComponentSelect(node.type)}
                >
                    <span
                        className="shrink-0"
                        onClick={(e) => hasChildren && toggleNode(node.id, e)}
                    >
                        {hasChildren ? (
                            isExpanded ? (
                                <ChevronDown className="w-3 h-3 text-gray-400 shrink-0" />
                            ) : (
                                <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
                            )
                        ) : (
                            <span className="w-3 h-3 inline-block" />
                        )}
                    </span>
                    <span className="text-sm mr-1">{icon}</span>
                    <span className={`text-xs ${isSelected ? 'text-white font-medium' : 'text-gray-300 group-hover:text-white'}`}>
                        {label}
                    </span>
                    {hasChildren && (
                        <span className="text-xs text-gray-500 ml-1">
                            ({node.children!.length})
                        </span>
                    )}
                </div>
                {hasChildren && isExpanded && (
                    <div>
                        {node.children!.map(child => renderNode(child, depth + 1))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="h-full bg-[#1e1e1e] overflow-y-auto border-r border-[#2d2d30]">
            <div className="px-3 py-2 border-b border-[#2d2d30]">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Page Structure
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                    {pageName}
                </div>
                <div className="text-xs text-gray-500 mt-1 italic">
                    Click &quot;Page Code&quot; or components below
                </div>
            </div>
            <div className="py-2">
                {nodes.length > 0 ? (
                    <>
                        <div
                            className={`px-2 py-1.5 mx-2 mb-2 text-xs font-medium rounded cursor-pointer ${!selectedComponentType ? 'bg-[#37373d] text-white' : 'text-gray-400 hover:bg-[#2a2d2e] hover:text-white'
                                }`}
                            onClick={() => onComponentSelect && onComponentSelect(null)}
                        >
                            📄 Page Code
                        </div>
                        <div className="px-2 py-1 text-xs text-gray-400 font-medium">
                            Components ({nodes.length})
                        </div>
                        {nodes.map(node => renderNode(node, 0))}
                    </>
                ) : (
                    <div className="px-3 py-8 text-center text-xs text-gray-500">
                        No components on this page
                    </div>
                )}
            </div>
        </div>
    );
}
