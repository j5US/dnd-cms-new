/**
 * Utility function to create CSS spacing styles from spacing property values.
 * Converts numeric spacing values (0-4) to pixel values (0px, 4px, 8px, 12px, 16px).
 */
export function createSpacingStyle(
    marginTop?: number,
    marginBottom?: number,
    paddingTop?: number,
    paddingBottom?: number
): React.CSSProperties {
    const style: React.CSSProperties = {};

    // Convert spacing values to pixels (0 = 0px, 1 = 4px, 2 = 8px, etc.)
    const toPixels = (value?: number) => value ? value * 4 : 0;

    if (marginTop !== undefined && marginTop !== 0) {
        style.marginTop = `${toPixels(marginTop)}px`;
    }
    if (marginBottom !== undefined && marginBottom !== 0) {
        style.marginBottom = `${toPixels(marginBottom)}px`;
    }
    if (paddingTop !== undefined && paddingTop !== 0) {
        style.paddingTop = `${toPixels(paddingTop)}px`;
    }
    if (paddingBottom !== undefined && paddingBottom !== 0) {
        style.paddingBottom = `${toPixels(paddingBottom)}px`;
    }

    return style;
}
