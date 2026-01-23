import { Label } from '@/components/ui/label';

interface ToggleControlProps {
    label: string;
    value: boolean;
    onChange: (value: boolean) => void;
}

export function ToggleControl({ label, value, onChange }: ToggleControlProps) {
    return (
        <div className="flex items-center gap-2">
            <input
                type="checkbox"
                checked={value}
                onChange={(e) => onChange(e.target.checked)}
                className="w-4 h-4"
                id={`toggle-${label.replace(/\s+/g, '-').toLowerCase()}`}
            />
            <Label
                htmlFor={`toggle-${label.replace(/\s+/g, '-').toLowerCase()}`}
                className="text-sm font-medium text-gray-700"
            >
                {label}
            </Label>
        </div>
    );
}
