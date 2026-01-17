'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface CopyButtonProps {
    code: string;
}

export function CopyButton({ code }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy code:', error);
        }
    };

    return (
        <Button
            onClick={handleCopy}
            variant="outline"
            size="sm"
            className="gap-2"
        >
            {copied ? (
                <>
                    ✓ Copied
                </>
            ) : (
                <>
                    📋 Copy Code
                </>
            )}
        </Button>
    );
}
