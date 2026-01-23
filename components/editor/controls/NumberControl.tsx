import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface NumberControlProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
}

export function NumberControl({ label, value, onChange }: NumberControlProps) {
    return (
        <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
                {label}
            </Label>
            <Input
                type="number"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
            />
        </div>
    );
}
