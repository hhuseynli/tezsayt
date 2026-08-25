import { ScrollReveal, RevealItem } from "@/components/ScrollReveal";

export function HowItWorks({ dict }: { dict: Record<string, string> }) {
  const steps = [
    { title: dict["home.how.step1.title"], body: dict["home.how.step1.body"] },
    { title: dict["home.how.step2.title"], body: dict["home.how.step2.body"] },
    { title: dict["home.how.step3.title"], body: dict["home.how.step3.body"] },
  ];

  return (
    <section className="bg-bg">
      <div className="max-w-[1120px] mx-auto px-[20px] md:px-[24px] py-[64px] md:py-[96px]">
        <ScrollReveal>
          <RevealItem>
            <h2 className="font-serif text-[26px] md:text-[32px] font-normal leading-[1.2] tracking-[-0.02em] max-w-[20ch]">{dict["home.how.heading"]}</h2>
          </RevealItem>
          <RevealItem>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[32px] mt-[48px]">
              {steps.map((step, i) => (
                <div key={i} className="flex md:block gap-[16px]">
                  <div className="relative flex-shrink-0">
                    {i < steps.length - 1 && <div className="md:hidden absolute top-[32px] left-[15px] w-[1px] h-[calc(100%+32px)] bg-border" />}
                    <div className="w-[32px] h-[32px] rounded-full bg-accent text-white flex items-center justify-center text-[15px] font-semibold relative z-10">{i + 1}</div>
                  </div>
                  <div>
                    <h3 className="font-serif text-[20px] font-normal leading-[1.3] md:mt-[16px]">{step.title}</h3>
                    <p className="text-[15px] text-text-muted mt-[8px]">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </RevealItem>
          <RevealItem>
            <p className="text-[13px] text-text-faint mt-[40px] text-center">{dict["home.how.fineprint"]}</p>
          </RevealItem>
        </ScrollReveal>
      </div>
    </section>
  );
}
