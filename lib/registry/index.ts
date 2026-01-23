import { ComponentDefinition, ComponentType } from '../types';
import { buildingBlocks } from './building-blocks';
import { contentComponents } from './content';

// Aggregate registry
export const componentRegistry: Record<ComponentType, ComponentDefinition> = {
    ...buildingBlocks,
    ...contentComponents,
} as Record<ComponentType, ComponentDefinition>;

// Helper to get building blocks
export function getBuildingBlocks(): ComponentDefinition[] {
    return Object.values(componentRegistry).filter(
        (def) => def.category === 'building-block'
    );
}

// Helper to get content components
export function getContentComponents(): ComponentDefinition[] {
    return Object.values(componentRegistry).filter(
        (def) => def.category === 'content'
    );
}

// Helper to check if a component accepts children
export function canAcceptChildren(type: ComponentType): boolean {
    return componentRegistry[type].acceptsChildren;
}
