"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Square, LayoutTemplate } from "lucide-react";

interface SpacingControlProps {
    label: string;
    values: {
        top?: string;
        right?: string;
        bottom?: string;
        left?: string;
        all?: string;
    };
    onChange: (values: { top?: string; right?: string; bottom?: string; left?: string; all?: string }) => void;
}

export function SpacingControl({ label, values, onChange }: SpacingControlProps) {
    const [mode, setMode] = useState<"all" | "individual">("all");
    const [unit, setUnit] = useState<"px" | "rem" | "%">("px");

    // Initialize local state from props
    useEffect(() => {
        // Basic heuristic to detect if we have mixed values, if so switch to individual
        if (values.top !== values.bottom || values.right !== values.left || values.top !== values.right) {
            if (values.top || values.right || values.bottom || values.left) {
                setMode("individual");
            }
        }
    }, []); // Only run on mount to avoid overriding user interaction

    const parseValue = (val: string | undefined): number => {
        if (!val) return 0;
        const match = val.match(/^(-?\d*\.?\d+)/);
        return match ? parseFloat(match[1]) : 0;
    };

    const updateValue = (side: keyof typeof values | "all", val: number) => {
        const newValue = `${val}${unit}`;
        if (side === "all") {
            onChange({
                top: newValue,
                right: newValue,
                bottom: newValue,
                left: newValue,
                all: newValue
            });
        } else {
            onChange({
                ...values,
                [side]: newValue,
                all: undefined // Clear 'all' if individual side changes
            });
        }
    };

    const handleUnitChange = (newUnit: "px" | "rem" | "%") => {
        setUnit(newUnit);
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-gray-700">{label}</Label>
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-md">
                    <button
                        onClick={() => setMode("all")}
                        className={`p-1 rounded ${mode === "all" ? "bg-white shadow-sm" : "hover:bg-gray-200"}`}
                        title="All sides"
                    >
                        <Square size={14} />
                    </button>
                    <button
                        onClick={() => setMode("individual")}
                        className={`p-1 rounded ${mode === "individual" ? "bg-white shadow-sm" : "hover:bg-gray-200"}`}
                        title="Individual sides"
                    >
                        <LayoutTemplate size={14} />
                    </button>
                </div>
            </div>

            <div className="flex justify-end mb-2">
                <select
                    value={unit}
                    onChange={(e) => handleUnitChange(e.target.value as "px" | "rem" | "%")}
                    className="w-[70px] h-7 text-xs border rounded-md px-1 bg-white"
                >
                    <option value="px">px</option>
                    <option value="rem">rem</option>
                    <option value="%">%</option>
                </select>
            </div>

            {mode === "all" ? (
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <input
                            type="range"
                            value={parseValue(values.all || values.top)}
                            min={0}
                            max={unit === "px" ? 100 : 20}
                            step={unit === "px" ? 1 : 0.1}
                            onChange={(e) => updateValue("all", Number(e.target.value))}
                            className="flex-1 h-4"
                        />
                        <Input
                            type="number"
                            value={parseValue(values.all || values.top)}
                            onChange={(e) => updateValue("all", Number(e.target.value))}
                            className="w-16 h-8 text-xs"
                        />
                    </div>
                    <p className="text-xs text-center text-gray-400">All sides</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-x-2 gap-y-3">
                    {/* TOP */}
                    <div className="space-y-1">
                        <div className="flex items-center justify-between font-xs text-gray-500">
                            <span>Top</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Input
                                type="number"
                                value={parseValue(values.top)}
                                onChange={(e) => updateValue("top", Number(e.target.value))}
                                className="h-7 text-xs"
                            />
                        </div>
                    </div>
                    {/* RIGHT */}
                    <div className="space-y-1">
                        <div className="flex items-center justify-between font-xs text-gray-500">
                            <span>Right</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Input
                                type="number"
                                value={parseValue(values.right)}
                                onChange={(e) => updateValue("right", Number(e.target.value))}
                                className="h-7 text-xs"
                            />
                        </div>
                    </div>
                    {/* BOTTOM */}
                    <div className="space-y-1">
                        <div className="flex items-center justify-between font-xs text-gray-500">
                            <span>Bottom</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Input
                                type="number"
                                value={parseValue(values.bottom)}
                                onChange={(e) => updateValue("bottom", Number(e.target.value))}
                                className="h-7 text-xs"
                            />
                        </div>
                    </div>
                    {/* LEFT */}
                    <div className="space-y-1">
                        <div className="flex items-center justify-between font-xs text-gray-500">
                            <span>Left</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Input
                                type="number"
                                value={parseValue(values.left)}
                                onChange={(e) => updateValue("left", Number(e.target.value))}
                                className="h-7 text-xs"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
