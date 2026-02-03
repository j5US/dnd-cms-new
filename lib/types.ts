// Core type definitions for the campaign page builder

export type ComponentCategory = 'building-block' | 'content';

export type ComponentType =
  | 'flex-block'
  | 'grid-block'
  | 'card-block'
  | 'button'
  | 'text'
  | 'image'
  | 'input'
  | 'textarea'
  | 'heading'
  | 'video'
  | 'divider'
  | 'spacer';

// Property value types
export type PropertyValue = string | number | boolean | Record<string, string | number>;

// Property schema for the properties panel
export interface PropertySchema {
  key: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'toggle' | 'color' | 'spacing';
  options?: string[];
  defaultValue: PropertyValue;
}

// Component definition in the registry
export interface ComponentDefinition {
  type: ComponentType;
  category: ComponentCategory;
  label: string;
  icon?: string; // Icon name or emoji
  defaultProps: Record<string, PropertyValue>;
  propSchema: PropertySchema[];
  acceptsChildren: boolean;
}

// Layout node represents a component instance in the page
export interface LayoutNode {
  id: string;
  type: ComponentType;
  props: Record<string, PropertyValue>;
  children?: LayoutNode[];
}

// Spacing value for padding/margin controls
export interface SpacingValue {
  all: string;
  top: string;
  right: string;
  bottom: string;
  left: string;
}

// Page-level settings for canvas styling
export interface PageSettings {
  padding: SpacingValue;
  backgroundColor?: string;
  backgroundImage?: string;
}

// Page/Slide
export interface Page {
  id: string;
  name: string;
  layout: LayoutNode[];
  settings?: PageSettings;
}

// Campaign (collection of pages)
export interface Campaign {
  pages: Page[];
  activePageId: string;
}

// Drag and drop types
export type DragType = 'new' | 'existing';

export interface DragData {
  type: DragType;
  componentType: ComponentType;
  nodeId?: string; // Only for existing nodes
}

// Selected component state
export interface Selection {
  nodeId: string;
  componentType: ComponentType;
}
