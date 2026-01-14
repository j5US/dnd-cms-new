/**
 * Utility functions for handling component size properties
 */

/**
 * Validates and normalizes a size value (width or height)
 * @param value - The input value (can be 'auto', number, or string)
 * @param maxValue - Optional maximum value in pixels
 * @returns A valid CSS value string or undefined if invalid
 */
export function normalizeSizeValue(
    value: string | number | undefined,
    maxValue?: number
): string {
    // Handle undefined or null
    if (value === undefined || value === null || value === '') {
        return 'auto';
    }

    // Handle 'auto' string
    if (typeof value === 'string' && value.toLowerCase().trim() === 'auto') {
        return 'auto';
    }

    // Convert to number
    const numValue = typeof value === 'number' ? value : parseFloat(value);

    // Handle invalid numbers
    if (isNaN(numValue)) {
        return 'auto';
    }

    // Handle negative values
    if (numValue < 0) {
        return 'auto';
    }

    // Apply max constraint if provided
    const finalValue = maxValue && numValue > maxValue ? maxValue : numValue;

    return `${finalValue}px`;
}

/**
 * Creates a size style object for components
 * @param width - Width value
 * @param height - Height value
 * @returns Style object with width, height, and constraints
 */
export function createSizeStyle(
    width: string | number | undefined,
    height: string | number | undefined
): React.CSSProperties {
    const widthValue = normalizeSizeValue(width);
    const heightValue = normalizeSizeValue(height);

    // For width, use clamp to constrain to parent container
    const constrainedWidth = widthValue === 'auto' ? 'auto' : `min(${widthValue}, 100%)`;

    return {
        width: constrainedWidth,
        height: heightValue,
        boxSizing: 'border-box',
        minWidth: 0,
    };
}
