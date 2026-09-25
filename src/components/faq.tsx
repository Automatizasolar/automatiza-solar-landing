import { PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { faqs } from "@/lib/content";
import { Section, Wrap } from "./ui";

/**
 * `<details>` nativos, no un acordeón a mano: se abren con el teclado sin
 * escribir una línea, un lector de pantalla los anuncia bien y siguen
 * funcionando aunque el JavaScript falle. El `name` compartido hace que abrir
 * uno cierre el anterior, también de forma nativa.
 *
 * Van justo antes del cierre: primero se resuelven las dudas y después se
 * pide la cita, no al revés.
 */
export function Faq() {
  return (
    <Section hour="20:50">
      <Wrap className="py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] lg:gap-20">
          <h2 className="reveal text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.06] font-semibold tracking-[-0.03em] text-balance lg:sticky lg:top-28 lg:self-start">
            Lo que siempre me preguntan
          </h2>

          <div className="reveal">
            {faqs.map((f) => (
              <details
                key={f.q}
                name="faq"
                className="faq-item group border-b border-[var(--color-rule-soft)] first:border-t"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[17px] leading-[1.4] font-medium transition-colors duration-150 select-none hover:text-[var(--color-solar)] [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <PlusIcon
                    size={18}
                    className="mt-1 shrink-0 text-[var(--color-ink-faint)] transition-transform duration-200 ease-[var(--ease-out-strong)] group-open:rotate-45"
                  />
                </summary>
                <div className="pb-6">
                  <p className="max-w-[58ch] text-[16px] leading-[1.65] text-[var(--color-ink-muted)]">
                    {f.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </Wrap>
    </Section>
  );
}
