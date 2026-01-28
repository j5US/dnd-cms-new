'use client';

import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Campaign, Page, LayoutNode, ComponentType, Selection, PageSettings } from './types';
import { componentRegistry } from './registry';

interface CampaignState {
  campaign: Campaign;
  selectedNode: Selection | null;
}

type CampaignAction =
  | { type: 'ADD_PAGE' }
  | { type: 'DELETE_PAGE'; pageId: string }
  | { type: 'SET_ACTIVE_PAGE'; pageId: string }
  | { type: 'ADD_COMPONENT'; componentType: ComponentType; parentId?: string; index?: number }
  | { type: 'UPDATE_COMPONENT'; nodeId: string; props: Record<string, any> }
  | { type: 'DELETE_COMPONENT'; nodeId: string }
  | { type: 'MOVE_COMPONENT'; nodeId: string; newParentId?: string; newIndex: number }
  | { type: 'SELECT_NODE'; nodeId: string | null; componentType?: ComponentType }
  | { type: 'UPDATE_PAGE_SETTINGS'; settings: Partial<PageSettings> }
  | { type: 'LOAD_CAMPAIGN'; campaign: Campaign };

function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function findNode(nodes: LayoutNode[], nodeId: string): LayoutNode | null {
  for (const node of nodes) {
    if (node.id === nodeId) return node;
    if (node.children) {
      const found = findNode(node.children, nodeId);
      if (found) return found;
    }
  }
  return null;
}

function removeNode(nodes: LayoutNode[], nodeId: string): LayoutNode[] {
  return nodes
    .filter((node) => node.id !== nodeId)
    .map((node) => ({
      ...node,
      children: node.children ? removeNode(node.children, nodeId) : undefined,
    }));
}

function updateNodeProps(
  nodes: LayoutNode[],
  nodeId: string,
  props: Record<string, any>
): LayoutNode[] {
  return nodes.map((node) => {
    if (node.id === nodeId) {
      return { ...node, props: { ...node.props, ...props } };
    }
    if (node.children) {
      return { ...node, children: updateNodeProps(node.children, nodeId, props) };
    }
    return node;
  });
}

const initialState: CampaignState = {
  campaign: {
    pages: [
      {
        id: 'page-1',
        name: 'Page 1',
        layout: [],
        settings: {
          padding: { all: '16px', top: '16px', right: '16px', bottom: '16px', left: '16px' },
        },
      },
    ],
    activePageId: 'page-1',
  },
  selectedNode: null,
};

function campaignReducer(state: CampaignState, action: CampaignAction): CampaignState {
  switch (action.type) {
    case 'ADD_PAGE': {
      const newPage: Page = {
        id: generateId('page'),
        name: `Page ${state.campaign.pages.length + 1}`,
        layout: [],
      };
      return {
        ...state,
        campaign: {
          ...state.campaign,
          pages: [...state.campaign.pages, newPage],
          activePageId: newPage.id,
        },
        selectedNode: null,
      };
    }

    case 'DELETE_PAGE': {
      const remainingPages = state.campaign.pages.filter((p) => p.id !== action.pageId);
      if (remainingPages.length === 0) {
        return state;
      }
      const newActivePageId =
        state.campaign.activePageId === action.pageId
          ? remainingPages[0].id
          : state.campaign.activePageId;
      return {
        ...state,
        campaign: {
          ...state.campaign,
          pages: remainingPages,
          activePageId: newActivePageId,
        },
        selectedNode: null,
      };
    }

    case 'SET_ACTIVE_PAGE': {
      return {
        ...state,
        campaign: {
          ...state.campaign,
          activePageId: action.pageId,
        },
        selectedNode: null,
      };
    }

    case 'ADD_COMPONENT': {
      const activePage = state.campaign.pages.find((p) => p.id === state.campaign.activePageId);
      if (!activePage) return state;

      const componentDef = componentRegistry[action.componentType];
      const newNode: LayoutNode = {
        id: generateId('node'),
        type: action.componentType,
        props: { ...componentDef.defaultProps },
        children: componentDef.acceptsChildren ? [] : undefined,
      };

      let updatedLayout: LayoutNode[];

      if (!action.parentId) {
        const insertIndex = action.index ?? activePage.layout.length;
        updatedLayout = [...activePage.layout];
        updatedLayout.splice(insertIndex, 0, newNode);
      } else {
        // Capture these before the nested function for proper type narrowing
        const targetParentId = action.parentId;
        const targetIndex = action.index;

        function addToParent(nodes: LayoutNode[]): LayoutNode[] {
          return nodes.map((node) => {
            if (node.id === targetParentId) {
              const children = node.children || [];
              const insertIndex = targetIndex ?? children.length;
              const updatedChildren = [...children];
              updatedChildren.splice(insertIndex, 0, newNode);
              return { ...node, children: updatedChildren };
            }
            if (node.children) {
              return { ...node, children: addToParent(node.children) };
            }
            return node;
          });
        }
        updatedLayout = addToParent(activePage.layout);
      }

      return {
        ...state,
        campaign: {
          ...state.campaign,
          pages: state.campaign.pages.map((p) =>
            p.id === activePage.id ? { ...p, layout: updatedLayout } : p
          ),
        },
      };
    }

    case 'UPDATE_COMPONENT': {
      const activePage = state.campaign.pages.find((p) => p.id === state.campaign.activePageId);
      if (!activePage) return state;

      const updatedLayout = updateNodeProps(activePage.layout, action.nodeId, action.props);

      return {
        ...state,
        campaign: {
          ...state.campaign,
          pages: state.campaign.pages.map((p) =>
            p.id === activePage.id ? { ...p, layout: updatedLayout } : p
          ),
        },
      };
    }

    case 'DELETE_COMPONENT': {
      const activePage = state.campaign.pages.find((p) => p.id === state.campaign.activePageId);
      if (!activePage) return state;

      const updatedLayout = removeNode(activePage.layout, action.nodeId);

      return {
        ...state,
        campaign: {
          ...state.campaign,
          pages: state.campaign.pages.map((p) =>
            p.id === activePage.id ? { ...p, layout: updatedLayout } : p
          ),
        },
        selectedNode:
          state.selectedNode?.nodeId === action.nodeId ? null : state.selectedNode,
      };
    }

    case 'MOVE_COMPONENT': {
      return state;
    }

    case 'SELECT_NODE': {
      if (!action.nodeId) {
        return { ...state, selectedNode: null };
      }
      return {
        ...state,
        selectedNode: {
          nodeId: action.nodeId,
          componentType: action.componentType!,
        },
      };
    }

    case 'LOAD_CAMPAIGN': {
      return {
        ...state,
        campaign: action.campaign,
        selectedNode: null,
      };
    }

    case 'UPDATE_PAGE_SETTINGS': {
      const activePage = state.campaign.pages.find((p) => p.id === state.campaign.activePageId);
      if (!activePage) return state;

      const defaultSettings: PageSettings = {
        padding: { all: '16px', top: '16px', right: '16px', bottom: '16px', left: '16px' },
      };

      const updatedSettings = {
        ...defaultSettings,
        ...activePage.settings,
        ...action.settings,
      };

      return {
        ...state,
        campaign: {
          ...state.campaign,
          pages: state.campaign.pages.map((p) =>
            p.id === activePage.id ? { ...p, settings: updatedSettings } : p
          ),
        },
      };
    }

    default:
      return state;
  }
}

interface CampaignContextValue {
  state: CampaignState;
  dispatch: React.Dispatch<CampaignAction>;
  activePage: Page | undefined;
}

const CampaignContext = createContext<CampaignContextValue | undefined>(undefined);

export function CampaignProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(campaignReducer, initialState);

  const activePage = state.campaign.pages.find((p) => p.id === state.campaign.activePageId);

  useEffect(() => {
    try {
      localStorage.setItem('campaign', JSON.stringify(state.campaign));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }, [state.campaign]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('campaign');
      if (saved) {
        const campaign = JSON.parse(saved);
        dispatch({ type: 'LOAD_CAMPAIGN', campaign });
      }
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
    }
  }, []);

  return (
    <CampaignContext.Provider value={{ state, dispatch, activePage }}>
      {children}
    </CampaignContext.Provider>
  );
}

export function useCampaign() {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error('useCampaign must be used within CampaignProvider');
  }
  return context;
}