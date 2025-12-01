import ogs from 'open-graph-scraper';

export interface LinkMetadata {
    title?: string;
    description?: string;
    image?: string;
    url: string;
}

export async function fetchLinkMetadata(url: string): Promise<LinkMetadata> {
    try {
        const { result } = await ogs({ url });
        return {
            title: result.ogTitle,
            description: result.ogDescription,
            image: result.ogImage?.[0]?.url,
            url: result.ogUrl || url,
        };
    } catch (error) {
        console.error(`Failed to fetch metadata for ${url}:`, error);
        return { url };
    }
}
