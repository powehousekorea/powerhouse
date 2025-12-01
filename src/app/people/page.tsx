import { client } from "@/sanity/lib/client";
import { PEOPLE_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const revalidate = 60;

export default async function PeoplePage() {
    const people = await client.fetch(PEOPLE_QUERY);

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-12 text-center">
                <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl mb-4">
                    People
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Powerhouse Korea를 만들어가는 사람들입니다.
                </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {people.length > 0 ? (
                    people.map((person: any) => (
                        <Card key={person._id} className="overflow-hidden border-none shadow-none bg-transparent text-center group">
                            <div className="relative mx-auto mb-4 h-48 w-48 overflow-hidden rounded-full bg-muted">
                                {person.image ? (
                                    <Image
                                        src={urlFor(person.image).width(400).height(400).url()}
                                        alt={person.name}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-muted-foreground text-4xl font-serif">
                                        {person.name.slice(0, 1)}
                                    </div>
                                )}
                            </div>
                            <CardHeader className="p-0 mb-2">
                                <h3 className="font-serif text-xl font-bold">{person.name}</h3>
                                <p className="text-sm font-medium text-primary uppercase tracking-wider">
                                    {person.role}
                                </p>
                            </CardHeader>
                            <CardContent className="p-0">
                                <p className="text-sm text-muted-foreground line-clamp-3 px-4">
                                    {person.bio}
                                </p>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 text-muted-foreground">
                        아직 등록된 멤버가 없습니다.
                    </div>
                )}
            </div>
        </div>
    );
}
