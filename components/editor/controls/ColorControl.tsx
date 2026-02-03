import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ColorControlProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

export function ColorControl({ label, value, onChange }: ColorControlProps) {
    const isTransparent = value === 'transparent';

    return (
        <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
                {label}
            </Label>
            <div className="flex gap-2 items-center">
                <input
                    type="color"
                    value={isTransparent ? '#ffffff' : value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-12 h-10 rounded border cursor-pointer"
                    disabled={isTransparent}
                />
                <Input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="#ffffff"
                    className="flex-1"
                />
                <button
                    type="button"
                    onClick={() => onChange(isTransparent ? '#ffffff' : 'transparent')}
                    className={`px-2 py-2 text-xs rounded border ${isTransparent
                            ? 'bg-blue-500 text-white border-blue-500'
                            : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                        }`}
                    title="Toggle transparent"
                >
                    🚫
                </button>
            </div>
        </div>
    );
}
