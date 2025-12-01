import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About | Powerhouse Korea",
    description: "한국청년유권자연맹(청연)을 소개합니다.",
};

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-4xl">
            <div className="text-center mb-16">
                <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl mb-6">
                    About Us
                </h1>
                <div className="w-20 h-1 bg-primary mx-auto opacity-50" />
            </div>

            <div className="space-y-12 text-lg leading-relaxed text-muted-foreground">
                <section className="space-y-6">
                    <h2 className="font-serif text-2xl font-bold text-foreground">
                        청연을 소개합니다
                    </h2>
                    <p>
                        무한한 잠재력과 열정을 지닌 청년세대들이 스스로를 개척하고, 책임지는 참여를 통해
                        사회변혁은 물론 미래를 창조하는 글로벌 인재로 성장할 수 있도록 하는데 그 목적을 두고 있습니다.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="font-serif text-2xl font-bold text-foreground">
                        한국청년유권자연맹 (청연)은?
                    </h2>
                    <p>
                        정치적 중립단체로서 시민교육을 실시하는 학교이자 차세대 지도자를 육성하는 인재 양성소,
                        청년들의 권익을 대변하고 비전을 만들어 내는 역동적인 파워하우스의 기능을 담당합니다.
                    </p>
                </section>
            </div>
        </div>
    );
}
