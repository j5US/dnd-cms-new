import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { Campaign } from '@/lib/types';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { campaign, name } = body as { campaign: Campaign; name?: string };

        if (!campaign || !campaign.pages || !Array.isArray(campaign.pages)) {
            return NextResponse.json(
                { error: 'Invalid campaign data' },
                { status: 400 }
            );
        }

        // Generate name if not provided
        const campaignName = name || `Campaign ${new Date().toLocaleString()}`;

        // Insert or update campaign
        const result = await queryOne<{ id: number }>(
            `INSERT INTO campaigns (name, data, updated_at)
       VALUES ($1, $2, CURRENT_TIMESTAMP)
       RETURNING id`,
            [campaignName, JSON.stringify(campaign)]
        );

        return NextResponse.json({
            success: true,
            id: result?.id,
            message: 'Campaign saved successfully',
        });
    } catch (error) {
        console.error('Error saving campaign:', error);
        return NextResponse.json(
            { error: 'Failed to save campaign' },
            { status: 500 }
        );
    }
}
