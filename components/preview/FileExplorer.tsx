'use client';

import { useState } from 'react';
import { FileNode } from '@/lib/file-tree';
import { ChevronRight, ChevronDown, File, Folder } from 'lucide-react';

interface FileExplorerProps {
    files: FileNode[];
    selectedFile: string | null;
    onFileSelect: (path: string) => void;
}

export function FileExplorer({ files, selectedFile, onFileSelect }: FileExplorerProps) {
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['components/building-blocks', 'components/content', 'components/renderer', 'components/ui']));

    const toggleFolder = (path: string) => {
        const newExpanded = new Set(expandedFolders);
        if (newExpanded.has(path)) {
            newExpanded.delete(path);
        } else {
            newExpanded.add(path);
        }
        setExpandedFolders(newExpanded);
    };

    const renderNode = (node: FileNode, depth: number = 0) => {
        const isExpanded = expandedFolders.has(node.path);
        const isSelected = selectedFile === node.path;

        if (node.type === 'folder') {
            return (
                <div key={node.path}>
                    <div
                        className="flex items-center gap-1 px-2 py-1 hover:bg-[#2a2d2e] cursor-pointer select-none"
                        style={{ paddingLeft: `${8 + depth * 12}px` }}
                        onClick={() => toggleFolder(node.path)}
                    >
                        {isExpanded ? (
                            <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                        ) : (
                            <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
                        )}
                        <Folder className="w-4 h-4 text-blue-400 shrink-0" />
                        <span className="text-sm text-gray-300">{node.name}</span>
                    </div>
                    {isExpanded && node.children && (
                        <div>
                            {node.children.map(child => renderNode(child, depth + 1))}
                        </div>
                    )}
                </div>
            );
        }

        return (
            <div
                key={node.path}
                className={`flex items-center gap-1 px-2 py-1 hover:bg-[#2a2d2e] cursor-pointer select-none ${isSelected ? 'bg-[#37373d]' : ''
                    }`}
                style={{ paddingLeft: `${20 + depth * 12}px` }}
                onClick={() => onFileSelect(node.path)}
            >
                <File className="w-4 h-4 text-gray-400 shrink-0" />
                <span className={`text-sm ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                    {node.name}
                </span>
            </div>
        );
    };

    return (
        <div className="h-full bg-[#1e1e1e] overflow-y-auto border-r border-[#2d2d30]">
            <div className="px-3 py-2 border-b border-[#2d2d30]">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Component Files
                </div>
            </div>
            <div className="py-1">
                {files.map(node => renderNode(node, 0))}
            </div>
        </div>
    );
}
