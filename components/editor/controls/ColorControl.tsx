import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ColorControlProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

export function ColorControl({ label, value, onChange }: ColorControlProps) {
    return (
        <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
                {label}
            </Label>
            <div className="flex gap-2 items-center">
                <input
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-12 h-10 rounded border cursor-pointer"
                />
                <Input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="#ffffff"
                    className="flex-1"
                />
            </div>
        </div>
    );
}
