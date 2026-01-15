import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

interface CampaignListItem {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
}

export async function GET() {
    try {
        const campaigns = await query<CampaignListItem>(
            `SELECT id, name, created_at, updated_at
       FROM campaigns
       ORDER BY updated_at DESC
       LIMIT 100`
        );

        // Ensure all IDs are numbers
        const normalizedCampaigns = campaigns.map(campaign => ({
            ...campaign,
            id: Number(campaign.id)
        }));

        return NextResponse.json({ campaigns: normalizedCampaigns });
    } catch (error) {
        console.error('Error listing campaigns:', error);
        return NextResponse.json(
            { error: 'Failed to list campaigns' },
            { status: 500 }
        );
    }
}
