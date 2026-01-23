import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TextControlProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

export function TextControl({ label, value, onChange }: TextControlProps) {
    return (
        <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
                {label}
            </Label>
            <Input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}
