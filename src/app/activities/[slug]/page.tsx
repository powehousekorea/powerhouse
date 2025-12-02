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

export default async function ActivityPage({ params }: PageProps) {
    const { slug: encodedSlug } = await params;
    const slug = decodeURIComponent(encodedSlug);
    console.log('Requested slug (decoded):', slug);

    const post = await client.fetch(POST_QUERY, { slug });
    console.log('Found post:', post ? post.title : 'NOT FOUND');

    if (!post) {
        notFound();
    }

    return (
        <article className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="mb-8 text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
                    <span className="uppercase tracking-wider font-medium text-primary">
                        Activity
                    </span>
                    <span>•</span>
                    {post.publishedAt && typeof post.publishedAt === 'string' && !isNaN(new Date(post.publishedAt).getTime()) && (
                        <time dateTime={post.publishedAt}>
                            {format(new Date(post.publishedAt), "PPP", { locale: ko })}
                        </time>
                    )}
                </div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 leading-tight">
                    {post.title}
                </h1>
                {post.summary && (
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        {post.summary}
                    </p>
                )}
            </div>

            <div className="prose prose-lg dark:prose-invert mx-auto">
                {post.body && (
                    <div className="space-y-4">
                        {post.body.map((block: any, index: number) => {
                            if (block._type === 'image') {
                                return (
                                    <div key={block._key || index} className="relative aspect-video w-full overflow-hidden rounded-lg my-8">
                                        <Image
                                            src={urlFor(block).url()}
                                            alt="Activity image"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                );
                            }
                            return (
                                <p key={block._key || index} className="leading-relaxed">
                                    {block.children?.map((child: any) => child.text).join('')}
                                </p>
                            );
                        })}
                    </div>
                )}
            </div>
        </article>
    );
}
