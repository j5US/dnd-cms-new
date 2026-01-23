import { Label } from '@/components/ui/label';

interface SelectControlProps {
    label: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
}

export function SelectControl({ label, value, options, onChange }: SelectControlProps) {
    return (
        <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
                {label}
            </Label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-3 py-2 border rounded-md bg-white"
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}
