import { Campaign } from './types';

/**
 * Exports a campaign as a downloadable JSON file
 * @param campaign - The campaign object to export
 * @param filename - Optional custom filename (without extension)
 */
export function exportCampaign(campaign: Campaign, filename?: string): void {
    // Create a pretty-printed JSON string
    const jsonString = JSON.stringify(campaign, null, 2);

    // Create a Blob from the JSON string
    const blob = new Blob([jsonString], { type: 'application/json' });

    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;

    // Set filename with timestamp if not provided
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    link.download = filename ? `${filename}.json` : `campaign-${timestamp}.json`;

    // Trigger download
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

/**
 * Imports a campaign from a JSON file
 * @param file - The File object containing the campaign JSON
 * @returns Promise resolving to the Campaign object
 * @throws Error if file is invalid or JSON parsing fails
 */
export async function importCampaign(file: File): Promise<Campaign> {
    return new Promise((resolve, reject) => {
        // Validate file type
        if (!file.name.endsWith('.json')) {
            reject(new Error('Invalid file type. Please select a JSON file.'));
            return;
        }

        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                const content = event.target?.result as string;
                const campaign = JSON.parse(content) as Campaign;

                // Basic validation
                if (!campaign.pages || !Array.isArray(campaign.pages)) {
                    throw new Error('Invalid campaign structure: missing pages array');
                }

                if (!campaign.activePageId) {
                    throw new Error('Invalid campaign structure: missing activePageId');
                }

                // Validate that activePageId exists in pages
                const pageExists = campaign.pages.some(page => page.id === campaign.activePageId);
                if (!pageExists && campaign.pages.length > 0) {
                    // Fix by setting first page as active
                    campaign.activePageId = campaign.pages[0].id;
                }

                resolve(campaign);
            } catch (error) {
                if (error instanceof SyntaxError) {
                    reject(new Error('Invalid JSON file. Please check the file format.'));
                } else {
                    reject(error);
                }
            }
        };

        reader.onerror = () => {
            reject(new Error('Failed to read file. Please try again.'));
        };

        reader.readAsText(file);
    });
}
