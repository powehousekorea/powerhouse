import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Join Us | Powerhouse Korea",
    description: "한국청년유권자연맹(청연) 회원 가입 및 후원 안내",
};

export default function JoinPage() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-4xl">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
                    Join Us
                </h1>
                <div className="w-20 h-1 bg-primary mx-auto opacity-50" />
                <p className="mt-6 text-xl text-muted-foreground">
                    청연 회원 가입 및 후원 안내
                </p>
            </div>

            <div className="space-y-12 text-lg leading-relaxed text-muted-foreground">
                <section className="space-y-6 text-center">
                    <h2 className="text-2xl font-bold text-foreground">
                        한국청년유권자연맹의 회원이 되어<br />청연과 함께해 주세요!
                    </h2>
                    <div className="flex justify-center gap-4 pt-4">
                        <Button size="lg" asChild>
                            <Link href="https://secure.donus.org/powerhouse/pay/step1" target="_blank" rel="noopener noreferrer">
                                회원가입 및 후원하기
                            </Link>
                        </Button>
                    </div>
                </section>

                <div className="border-t my-12" />

                <section className="space-y-6">
                    <h2 className="text-2xl font-bold text-foreground">
                        회원가입 및 후원 안내
                    </h2>
                    <p>
                        지금 대한민국은 정치적 위기를 맞이하고 있습니다. 이러한 위기를 극복하고,
                        우리나라의 미래를 책임질 정치 리더를 발굴하고 육성하는 일은 모두가 함께 해결해야 할 가장 중요한 과제입니다.
                    </p>
                    <p>
                        사단법인 한국청년유권자연맹은 2010년 1월 27일 창립 이후, 민주시민교육을 통해 청년들의 의식을 깨우고,
                        차세대 지도자를 양성하는 데 앞장서 왔습니다. 우리는 청년들의 목소리가 사회 전반에 반영되고,
                        이들이 정치적 역량을 갖춘 미래의 주역으로 성장하도록 돕고 있습니다.
                    </p>
                    <p>
                        여러분의 후원과 참여는 단순한 기여를 넘어, 우리 사회의 미래를 설계하는 일입니다.
                        이는 청년들에게 더 나은 교육과 기회를 제공하며, 한국 정치의 지속 가능한 발전을 이루는 밑거름이 됩니다.
                        함께 만들어가는 변화, 여러분의 참여를 통해 시작됩니다!
                    </p>
                </section>

                <section className="bg-muted/30 p-8 rounded-lg mt-12">
                    <h3 className="text-xl font-bold text-foreground mb-4">
                        후원 안내
                    </h3>
                    <p className="mb-4">
                        후원 계좌 및 자세한 문의는 아래 연락처로 부탁드립니다.
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>전화: 02-000-0000</li>
                        <li>이메일: contact@powerhousekorea.com</li>
                    </ul>
                </section>
            </div>
        </div>
    );
}
