/**
 * Utility function to create CSS spacing styles from spacing property values.
 * Converts numeric spacing values (0-4) to pixel values (0px, 4px, 8px, 12px, 16px).
 * Also handles new flexible spacing objects { top, right, bottom, left, all }.
 */

import { CSSProperties } from "react";

export function getSpacing(val: any, side: 'top' | 'right' | 'bottom' | 'left' | 'all'): string {
    if (typeof val === 'number') return `${val * 4}px`; // Backward compat
    if (typeof val === 'string') return val; // Simple string
    if (typeof val === 'object' && val !== null) {
        // If requesting a specific side, check for that side, then fallback to 'all'
        if (side !== 'all') {
            return val[side] || val.all || '0px';
        }
        return val.all || '0px';
    }
    return '0px';
}

export function createSpacingStyle(
    marginTop?: any,
    marginBottom?: any,
    paddingTop?: any,
    paddingBottom?: any,
    margin?: any,
    padding?: any
): CSSProperties {
    const style: CSSProperties = {};

    // Legacy individual props support (converted to string via getSpacing if needed, but here we assume they might be numbers or new objects)
    // Actually, strictly following the old signature:
    // marginTop/Bottom etc were numbers or strings.

    // If new 'margin' / 'padding' objects are provided, they take precedence or merge?
    // Let's assume 'margin' and 'padding' props are the new standard.

    if (margin) {
        style.marginTop = getSpacing(margin, 'top');
        style.marginRight = getSpacing(margin, 'right');
        style.marginBottom = getSpacing(margin, 'bottom');
        style.marginLeft = getSpacing(margin, 'left');
    } else {
        // Fallback to individual legacy props if margin object missing
        if (marginTop !== undefined) style.marginTop = getSpacing(marginTop, 'all'); // Treat number as 'all' or simple value
        if (marginBottom !== undefined) style.marginBottom = getSpacing(marginBottom, 'all');
    }

    if (padding) {
        style.paddingTop = getSpacing(padding, 'top');
        style.paddingRight = getSpacing(padding, 'right');
        style.paddingBottom = getSpacing(padding, 'bottom');
        style.paddingLeft = getSpacing(padding, 'left');
    } else {
        if (paddingTop !== undefined) style.paddingTop = getSpacing(paddingTop, 'all');
        if (paddingBottom !== undefined) style.paddingBottom = getSpacing(paddingBottom, 'all');
    }

    return style;
}
