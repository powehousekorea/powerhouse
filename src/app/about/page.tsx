import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export const metadata: Metadata = {
    title: "About | Powerhouse Korea",
    description: "한국청년유권자연맹(청연)을 소개합니다.",
};

const HISTORY_ITEMS = [
    {
        year: "2024",
        items: [
            { date: "2024.2", text: "「청년에겐 정치가 필요하다」 토크콘서트" },
            { date: "2024.2", text: "한국청년유권자연맹 전국지부 신년회 및 국회 청년미래특별위원회와의 만남" }
        ]
    },
    {
        year: "2023",
        items: [
            { date: "2023", text: "(연혁 데이터 추가 필요)" }
        ]
    },
    {
        year: "2015~2022",
        items: [
            { date: "2015~2022", text: "(연혁 데이터 추가 필요)" }
        ]
    },
    {
        year: "2010~2014",
        items: [
            { date: "2012.1.27", text: "청연정책연구원 창립 / 이사장 : 안광복(법무법인 대륙아주 고문) / 원장 : 최진우(한양대 교수)" },
            { date: "2012.1.27", text: "(사)한국청년유권자연맹 창립 2주년 기념 및 청연정책연구원 창립 토론회 '벼랑 끝 북한의 29세 지도자, 어디로 갈 것인가? 청년의 눈으로 본 북한 김정은 체제 변화 예측' 토론회" },
            { date: "2011.7.19", text: "제7회 청연토론회 \"북한인권법, 유권자의 선택은: 북한인권법을 둘러싼 쟁점과 전망\"" },
            { date: "2011.7.19~8.27", text: "제10기 청년리더십프로그램(YLP 10기) 매주 화요일, 총 7주" },
            { date: "2011.7.11~7.14", text: "2011국회인턴프로그램 기본교육 (활동기간 8월 ~ 11월 23일 수료)" },
            { date: "2011.6.13", text: "제6회 청연토론회 양성평등한 국방의무 분담 방안 마련을 위한 토론회 \"국가를 지키는 일에 남녀가 유별하다?\"" },
            { date: "2011.4.22", text: "제5회 청년토론회 \"SNS 전성시대, 대의민주주의의 새로운 대안이 될 것인가?\"" },
            { date: "2011.3.24", text: "4회 비전콘서트 함께가요! 대한민국! - 천안함 희생장병 추모 \"우리는 친구들을 잊지 않겠습니다\"" },
            { date: "2011.3.14", text: "비영리민간단체 등록 (서울특별시)" },
            { date: "2011.3.18~5.6", text: "제2기 청연리더스클럽 (매주 금요일 8주간)" },
            { date: "2011.1.22", text: "창립 1주년 기념행사 : 청연지부조직(강원, 대구, 인천) 및 전국대학생사업추진단(100개 대학교) 발대식" },
            { date: "2011.1.13~2.24", text: "제9기 청년리더십프로그램(YLP 9기)" },
            { date: "2010.12.15", text: "제4회 청연 토론회 - \"청년실업의 오늘과 그들의 목소리\"" },
            { date: "2010.11.23", text: "제 3회 비전콘서트 - \"청년, 정치에 도전하다!\"" },
            { date: "2010.10.13~11.17", text: "제1회 청연 리더스클럽" },
            { date: "2010.10. 7", text: "제 3회 청연 토론회 - \"2030 청년세대에게 통일이란?\"" },
            { date: "2010.8.24", text: "제2회 청연비전콘서트 - \"우리가 대한민국의 주인입니다!\"" },
            { date: "2010.7.29", text: "비영리 사단법인 설립허가 (소관 : 행정안전부)" },
            { date: "2010.7.22 ~ 8.26", text: "제8회 청년리더십프로그램(YLP)" },
            { date: "2010.6.30", text: "제2회 청연토론회 『6.2 지방선거를 통해 본 2030 청년유권자의 정치세력화와 한국정치 전망』" },
            { date: "2010.5.22", text: "제1회 청연토론회 『청년유권자의 눈으로 본 6.2 지방선거 서울시정책토론회』" },
            { date: "2010.4.28", text: "제1회 청연비전콘서트 - '세상을 바꾸는 꿈'" },
            { date: "2010.3.6", text: "제1회 청연 운영위원 전체회의" },
            { date: "2010.1.27", text: "한국청년유권자연맹 창립식 / 초대 운영위원장 : 이연주(전 한국여성유권자연맹 회장)" }
        ]
    }
];

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-5xl">
            {/* Intro Section */}
            <div className="text-center mb-24 space-y-8">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                        청연을<br />소개합니다!
                    </h1>
                    <div className="w-20 h-1 bg-primary mx-auto opacity-50" />
                </div>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    무한한 잠재력과 열정을 지닌 청년세대들이 스스로를 개척하고, 책임지는 참여를 통해<br className="hidden md:block" />
                    사회변혁은 물론 미래를 창조하는 글로벌 인재로 성장할 수 있도록 하는데 그 목적을 두고 있습니다.
                </p>
            </div>

            {/* Mission Section */}
            <section className="mb-32">
                <div className="bg-muted/30 rounded-3xl p-8 md:p-12 text-center">
                    <h2 className="text-3xl font-bold mb-8">한국청년유권자연맹 (청연)은?</h2>
                    <div className="space-y-8 text-lg">
                        <p className="font-medium text-xl leading-relaxed">
                            정치적 중립단체로서 <span className="text-primary">시민교육을 실시하는 학교</span>이자 <span className="text-primary">차세대 지도자를 육성</span>하는 인재 양성소,<br className="hidden md:block" />
                            청년들의 권익을 대변하고 비전을 만들어 내는 역동적인 파워하우스의 기능을 담당합니다.
                        </p>
                        <div className="grid md:grid-cols-3 gap-6 text-left">
                            <Card className="bg-background border-none shadow-sm">
                                <CardContent className="p-6">
                                    <h3 className="font-bold text-lg mb-3 text-primary">첫째</h3>
                                    <p className="text-muted-foreground">유권자로서 권리와 의무를 올바르게 행사할 수 있도록 민주시민의 자질과 소양을 교육한다.</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-background border-none shadow-sm">
                                <CardContent className="p-6">
                                    <h3 className="font-bold text-lg mb-3 text-primary">둘째</h3>
                                    <p className="text-muted-foreground">청년유권자의 권익을 대변하며, 한국사회의 통합과 민주발전을 위해 청년의 힘을 결집한다.</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-background border-none shadow-sm">
                                <CardContent className="p-6">
                                    <h3 className="font-bold text-lg mb-3 text-primary">셋째</h3>
                                    <p className="text-muted-foreground">미래한국사회를 이끌어갈 차세대 지도자를 발굴, 육성하고 경쟁력 있는 네트워크를 만든다.</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Representative Message */}
            <section className="mb-32">
                <h2 className="text-3xl font-bold mb-12 text-center">대표 인사말</h2>
                <div className="flex flex-col md:flex-row gap-12 items-start bg-card border rounded-2xl p-8 md:p-12 shadow-sm">
                    <div className="w-full md:w-1/3 aspect-[3/4] relative rounded-xl overflow-hidden bg-muted shrink-0">
                        <Image
                            src="https://cdn.imweb.me/thumbnail/20250101/placeholder.jpg"
                            alt="정재욱 상임대표"
                            fill
                            className="object-cover"
                            unoptimized
                        />
                    </div>
                    <div className="flex-1 space-y-6">
                        <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                            <p className="font-bold text-foreground text-2xl mb-6">
                                "안녕하세요? <br />사단법인 한국청년유권자연맹 상임대표 정재욱입니다."
                            </p>
                            <p>
                                한국청년유권자연맹을 찾아주신 여러분을 진심으로 환영합니다.
                            </p>
                            <p>
                                한국청년유권자연맹은 2010년 창립 이래 <span className="font-bold text-foreground">책임있는 참여가 미래를 창조한다</span>는 가치를 중심으로, 대한민국의 청년들이 사회적 변화를 이끌어갈 리더로 성장할 수 있도록 힘써왔습니다.
                            </p>
                            <p>
                                특히, 우리의 핵심 활동인 청년 리더십 교육은 청년들에게 책임감과 도전 정신을 심어주고, 미래 통일대한민국을 이끌어나갈 인재를 양성하는 데 기여하고 있습니다. 우리는 청년들이 단순한 정책 소비자가 아닌, 능동적인 미래 설계자로 자리 잡을 수 있도록 다양한 교육 프로그램과 사회 참여 기회를 제공하고 있습니다.
                            </p>
                            <p>
                                그러나 이러한 여정은 청년들의 참여뿐만 아니라, 일반 시민 여러분의 후원과 지지가 없이는 이루어질 수 없습니다. 여러분의 관심과 응원은 대한민국의 미래 리더를 키우는 든든한 기반이자, 더 나은 사회를 만들어가는 데 없어서는 안 될 힘입니다.
                            </p>
                            <p>
                                한국청년유권자연맹은 앞으로도 청년들과 시민들이 함께 소통하고 협력하며, 모두가 공존하는 더 나은 미래를 열어가기 위해 최선을 다하겠습니다.
                            </p>
                            <p>감사합니다.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Major Projects */}
            <section className="mb-32 text-center">
                <h2 className="text-3xl font-bold mb-12">주요 사업</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        "청년정책 연구",
                        "청년정치리더 육성",
                        "전국 청년네트워크 강화"
                    ].map((project) => (
                        <div key={project} className="flex items-center justify-center p-8 rounded-2xl bg-primary/5 border border-primary/10 aspect-video group hover:bg-primary/10 transition-colors">
                            <h3 className="text-2xl font-bold text-primary group-hover:scale-105 transition-transform">{project}</h3>
                        </div>
                    ))}
                </div>
            </section>

            {/* CI Introduction */}
            <section className="mb-32">
                <h2 className="text-3xl font-bold mb-12 text-center">CI 소개</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="space-y-4 p-8 bg-muted/30 rounded-2xl border border-border/50 text-center hover:bg-muted/50 transition-colors">
                        <div className="w-12 h-12 bg-orange-500 rounded-full mx-auto mb-4 shadow-lg shadow-orange-500/20" />
                        <h3 className="text-xl font-bold">상징 : 태양</h3>
                        <p className="text-muted-foreground">미래 한국의 에너지를 만들어내는 발전소<br />(The Powerhouse of Future Korea)</p>
                    </div>
                    <div className="space-y-4 p-8 bg-muted/30 rounded-2xl border border-border/50 text-center hover:bg-muted/50 transition-colors">
                        <div className="w-12 h-12 bg-teal-500 rounded-full mx-auto mb-4 shadow-lg shadow-teal-500/20" />
                        <h3 className="text-xl font-bold">색상 : 청록</h3>
                        <p className="text-muted-foreground">파란색(가능성, 비전)과 초록색(희망, 도전) 혼합<br />→ 청록색(미래에 대한 희망과 확신)</p>
                    </div>
                    <div className="space-y-4 p-8 bg-muted/30 rounded-2xl border border-border/50 text-center hover:bg-muted/50 transition-colors">
                        <div className="w-12 h-12 bg-primary rounded-full mx-auto mb-4 shadow-lg shadow-primary/20 flex items-center justify-center text-white font-bold text-xs">3Y</div>
                        <h3 className="text-xl font-bold">3Y</h3>
                        <p className="text-muted-foreground">Liberty, Energy, Harmony<br />청년의 자유로운 사고와 창의적인 에너지로 조화로운 국가발전에 이바지</p>
                    </div>
                </div>
            </section>

            {/* History */}
            <section>
                <h2 className="text-3xl font-bold mb-12 text-center">연혁</h2>
                <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-muted-foreground/20 before:to-transparent">
                    {HISTORY_ITEMS.map((period, idx) => (
                        <div key={idx} className="relative flex items-start md:justify-normal md:odd:flex-row-reverse group">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-background bg-muted shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 mt-1">
                                <div className="w-3 h-3 bg-primary rounded-full" />
                            </div>
                            <div className="w-[calc(100%-4rem)] ml-6 md:ml-0 md:w-[calc(50%-2.5rem)] p-6 bg-card rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                                <div className="font-bold text-2xl mb-6 text-primary border-b pb-2">{period.year}</div>
                                <ul className="space-y-4">
                                    {period.items.map((item, i) => (
                                        <li key={i} className="text-sm text-muted-foreground flex gap-4">
                                            <span className="font-bold text-foreground min-w-[120px] shrink-0">{item.date}</span>
                                            <span className="flex-1">{item.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
