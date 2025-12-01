import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { fetchLinkMetadata } from "@/lib/metadata";

interface LinkCardProps {
    item: {
        title?: string;
        url: string;
        description?: string;
        thumbnail?: any;
        publishedAt: string;
    };
}

export async function LinkPreviewCard({ item }: LinkCardProps) {
    // If Sanity data is missing, fetch from URL
    let title = item.title;
    let description = item.description;
    let imageUrl = item.thumbnail ? urlFor(item.thumbnail).width(800).height(400).url() : null;

    if (!title || !imageUrl) {
        const metadata = await fetchLinkMetadata(item.url);
        if (!title) title = metadata.title;
        if (!description) description = metadata.description;
        if (!imageUrl) imageUrl = metadata.image || null;
    }

    return (
        <Link href={item.url} target="_blank" rel="noopener noreferrer" className="group block h-full">
            <Card className="h-full overflow-hidden border transition-all hover:shadow-md hover:border-primary/50">
                <div className="relative aspect-[1.91/1] w-full overflow-hidden bg-muted">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={title || "Link preview"}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            unoptimized={!item.thumbnail} // External images might need unoptimized if domain not configured
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground">
                            <ExternalLink className="h-10 w-10 opacity-50" />
                        </div>
                    )}
                </div>
                <CardHeader className="p-4 pb-2">
                    <h3 className="font-serif text-lg font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                        {title || item.url}
                    </h3>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                        {description}
                    </p>
                    <div className="mt-4 flex items-center text-xs text-muted-foreground/80">
                        <ExternalLink className="mr-1 h-3 w-3" />
                        <span className="truncate max-w-[200px]">{new URL(item.url).hostname}</span>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
