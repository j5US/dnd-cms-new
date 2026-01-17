'use client';

import Editor from '@monaco-editor/react';

interface CodeViewProps {
    code: string;
    height?: string;
    filePath?: string;
}

export function CodeView({ code, height = '100%', filePath }: CodeViewProps) {
    return (
        <div className="h-full w-full bg-[#1e1e1e] flex flex-col">
            {filePath && (
                <div className="px-4 py-2 border-b border-[#2d2d30] bg-[#252526]">
                    <span className="text-xs text-gray-400 font-mono">{filePath}</span>
                </div>
            )}
            <div className="flex-1">
                <Editor
                    height={height}
                    defaultLanguage="typescript"
                    value={code}
                    theme="vs-dark"
                    options={{
                        readOnly: true,
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        fontSize: 14,
                        lineNumbers: 'on',
                        glyphMargin: false,
                        folding: true,
                        lineDecorationsWidth: 0,
                        lineNumbersMinChars: 3,
                        renderLineHighlight: 'none',
                        scrollbar: {
                            vertical: 'visible',
                            horizontal: 'visible',
                            verticalScrollbarSize: 10,
                            horizontalScrollbarSize: 10,
                        },
                        automaticLayout: true,
                    }}
                />
            </div>
        </div>
    );
}
