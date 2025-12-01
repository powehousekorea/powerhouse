import { client } from "@/sanity/lib/client";
import { LINK_CARDS_QUERY } from "@/sanity/lib/queries";
import { LinkPreviewCard } from "@/components/features/link-preview-card";

export const revalidate = 60;

export default async function ActivitiesPage() {
    const links = await client.fetch(LINK_CARDS_QUERY);

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-12 text-center">
                <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl mb-4">
                    Archive
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Powerhouse Korea가 주목하는 기사와 자료들을 모았습니다.
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {links.length > 0 ? (
                    links.map((item: any) => (
                        <LinkPreviewCard key={item._id} item={item} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 text-muted-foreground">
                        아직 등록된 자료가 없습니다.
                    </div>
                )}
            </div>
        </div>
    );
}
