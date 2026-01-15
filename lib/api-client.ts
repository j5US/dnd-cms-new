import { Campaign } from './types';

export interface CampaignListItem {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface SaveCampaignResponse {
    success: boolean;
    id: number;
    message: string;
}

export interface LoadCampaignResponse {
    id: number;
    name: string;
    campaign: Campaign;
    created_at: string;
    updated_at: string;
}

/**
 * Save a campaign to the database
 */
export async function saveCampaign(
    campaign: Campaign,
    name?: string
): Promise<SaveCampaignResponse> {
    const response = await fetch('/api/campaigns/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaign, name }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save campaign');
    }

    return response.json();
}

/**
 * Load a campaign from the database by ID
 */
export async function loadCampaign(id: number): Promise<LoadCampaignResponse> {
    const response = await fetch(`/api/campaigns/${id}`);

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to load campaign');
    }

    const data: LoadCampaignResponse = await response.json();
    return data;
}

/**
 * Update an existing campaign
 */
export async function updateCampaign(
    id: number,
    campaign: Campaign,
    name?: string
): Promise<SaveCampaignResponse> {
    const response = await fetch(`/api/campaigns/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaign, name }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update campaign');
    }

    return response.json();
}

/**
 * Get list of all saved campaigns
 */
export async function listCampaigns(): Promise<CampaignListItem[]> {
    const response = await fetch('/api/campaigns/list');

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to list campaigns');
    }

    const data = await response.json();
    return data.campaigns;
}

/**
 * Delete a campaign by ID
 */
export async function deleteCampaign(id: number): Promise<void> {
    const response = await fetch(`/api/campaigns/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete campaign');
    }
}
