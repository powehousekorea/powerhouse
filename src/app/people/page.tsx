import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const revalidate = 60;

const leadership = [
    {
        name: "정재욱",
        role: "상임대표",
        bio: [
            "서강대학교, 경희대학교 겸임교수",
            "강남구 청년정책위원회 공동위원장",
            "전 서울시 청년자치정부 추진위원회 공동추진위원장",
            "전 LH청년위원회 위원장"
        ]
    }
];

const advisors = [
    {
        name: "이부형",
        role: "고문",
        bio: [
            "국민의힘 중앙위원회 부위원장",
            "전 대통령 비서실 행정관",
            "전 경상북도 경제특별보좌관",
            "전 새누리당 중앙청년위원장",
            "전 위덕대학교 산학부총장",
            "전 동국대학교 인재교육원 원장, 산학협력 초빙교수"
        ]
    },
    {
        name: "장경태",
        role: "고문",
        bio: [
            "제21대, 제22대 국회의원(서울 동대문구을)",
            "더불어민주당 서울특별시당 위원장",
            "전 더불어민주당 최고위원",
            "전 더불어민주당 전국청년위원장",
            "전 더불어민주당 정치혁신위원장"
        ]
    }
];

const steeringCommittee = [
    {
        name: "박용범",
        role: "중앙 운영위원장",
        bio: [
            "한국청년유권자연맹 부설 ‘청년일자리정책연구소 소장’",
            "전 대통령직속일자리위원회 청년TF위원",
            "전 고용고용부 청년TF위원",
            "전 청주시 청년정책위원회 위원장",
            "전 한국청년유권자연맹 사무총장, 충북지부위원장"
        ]
    },
    {
        name: "이승환",
        role: "운영위원",
        bio: ["이슈 큐레이팅 매거진 'ㅍㅍㅅㅅ' 대표"]
    },
    {
        name: "이예송",
        role: "운영위원",
        bio: ["전 서울시 미래청년기획단 주무관"]
    },
    {
        name: "심성훈",
        role: "운영위원",
        bio: ["국민의힘 제22대 총선 영입인재, 국민의힘 공약개발본부 중앙공약개발단 자문위원"]
    },
    {
        name: "정주현",
        role: "운영위원",
        bio: ["윈지코리아컨설팅 부대표"]
    },
    {
        name: "최영은",
        role: "운영위원",
        bio: ["KTV 기자"]
    }
];

function PersonCard({ person }: { person: { name: string, role: string, bio: string[] } }) {
    return (
        <Card className="h-full border-none shadow-none bg-transparent">
            <CardHeader className="p-0 mb-4">
                <div className="flex items-baseline gap-2 mb-1">
                    <CardTitle className="text-xl font-bold">{person.name}</CardTitle>
                    <CardDescription className="text-primary font-medium text-base">{person.role}</CardDescription>
                </div>
                <div className="w-10 h-1 bg-primary/20 rounded-full" />
            </CardHeader>
            <CardContent className="p-0">
                <ul className="space-y-1">
                    {person.bio.map((line, i) => (
                        <li key={i} className="text-muted-foreground text-sm leading-relaxed">
                            {line}
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}

export default function PeoplePage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-5xl">
            <div className="mb-20 text-center space-y-6">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                    청연과 함께하는 사람들
                </h1>
                <div className="space-y-2 text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
                    <p>한국청년유권자연맹은 어떤 사람들과 함께하고 있을까요?</p>
                    <p>대한민국에 청년의 목소리를 담기 위해 활동하는 사람들을 소개합니다!</p>
                </div>
            </div>

            <div className="space-y-20">
                {/* Leadership Section */}
                <section>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 justify-center">
                        {leadership.map((person) => (
                            <PersonCard key={person.name} person={person} />
                        ))}
                    </div>
                </section>

                {/* Advisors Section */}
                <section>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                        {advisors.map((person) => (
                            <PersonCard key={person.name} person={person} />
                        ))}
                    </div>
                </section>

                {/* Steering Committee Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-10 pb-4 border-b">중앙 운영위원</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                        {steeringCommittee.map((person) => (
                            <PersonCard key={person.name} person={person} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
