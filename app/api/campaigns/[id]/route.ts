import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';

interface CampaignRow {
    id: number;
    name: string;
    data: any;
    created_at: Date;
    updated_at: Date;
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;
        const id = parseInt(resolvedParams.id, 10);

        if (isNaN(id)) {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }

        const campaign = await queryOne<CampaignRow>(
            'SELECT * FROM campaigns WHERE id = $1',
            [id]
        );

        if (!campaign) {
            return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
        }

        return NextResponse.json({
            id: campaign.id,
            name: campaign.name,
            campaign: campaign.data,
            created_at: campaign.created_at,
            updated_at: campaign.updated_at,
        });
    } catch (error) {
        console.error('Error loading campaign:', error);
        return NextResponse.json(
            { error: 'Failed to load campaign' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;
        const id = parseInt(resolvedParams.id, 10);

        if (isNaN(id)) {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }

        const body = await request.json();
        const { campaign, name } = body;

        if (!campaign || !campaign.pages || !Array.isArray(campaign.pages)) {
            return NextResponse.json(
                { error: 'Invalid campaign data' },
                { status: 400 }
            );
        }

        // Update the campaign
        const result = await queryOne<CampaignRow>(
            `UPDATE campaigns 
             SET data = $1, name = COALESCE($2, name), updated_at = CURRENT_TIMESTAMP 
             WHERE id = $3 
             RETURNING *`,
            [JSON.stringify(campaign), name || null, id]
        );

        if (!result) {
            return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            id: result.id,
            name: result.name,
            message: 'Campaign updated successfully',
        });
    } catch (error) {
        console.error('Error updating campaign:', error);
        return NextResponse.json(
            { error: 'Failed to update campaign' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;
        const id = parseInt(resolvedParams.id, 10);

        if (isNaN(id)) {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }

        await query('DELETE FROM campaigns WHERE id = $1', [id]);

        return NextResponse.json({ success: true, message: 'Campaign deleted' });
    } catch (error) {
        console.error('Error deleting campaign:', error);
        return NextResponse.json(
            { error: 'Failed to delete campaign' },
            { status: 500 }
        );
    }
}
