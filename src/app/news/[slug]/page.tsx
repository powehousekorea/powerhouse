import { client } from "@/sanity/lib/client";
import { POST_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

export const revalidate = 60;

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = await client.fetch(POST_QUERY, { slug });

    if (!post) {
        notFound();
    }

    return (
        <article className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="mb-8 text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
                    {post.categories?.map((cat: string) => (
                        <span key={cat} className="uppercase tracking-wider font-medium text-primary">
                            {cat}
                        </span>
                    ))}
                    <span>•</span>
                    <time dateTime={post.publishedAt}>
                        {format(new Date(post.publishedAt), "PPP", { locale: ko })}
                    </time>
                </div>
                <h1 className="font-serif text-3xl font-bold tracking-tight sm:text-5xl mb-6 leading-tight">
                    {post.title}
                </h1>
                {post.summary && (
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        {post.summary}
                    </p>
                )}
            </div>

            {post.mainImage && (
                <div className="relative aspect-video w-full overflow-hidden rounded-xl mb-12 bg-muted">
                    <Image
                        src={urlFor(post.mainImage).width(1200).height(675).url()}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            )}

            <div className="prose prose-lg dark:prose-invert mx-auto">
                {post.body && (
                    <div className="space-y-4">
                        {post.body.map((block: any, index: number) => (
                            <p key={block._key || index} className="leading-relaxed">
                                {block.children?.map((child: any) => child.text).join('')}
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </article>
    );
}
