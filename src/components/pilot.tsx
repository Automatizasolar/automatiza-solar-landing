import { CheckIcon } from "@phosphor-icons/react/dist/ssr";
import { funnelCopy } from "@/lib/content";
import { Section, Wrap } from "./ui";

/**
 * «¿Qué es esto exactamente?» contado como la oferta del cuaderno: un piloto
 * pequeño, en días, con garantía y sin permanencia. Sin precio: el precio se
 * da en la llamada, con el catálogo delante.
 */
export function Pilot() {
  const { pilot } = funnelCopy;

  return (
    <Section hour="20:15">
      <Wrap className="py-16 lg:py-24">
        <h2 className="reveal max-w-[16ch] text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.06] font-semibold tracking-[-0.03em] text-balance">
          {pilot.title}
        </h2>
        <p className="reveal mt-6 max-w-[44ch] text-[17px] leading-[1.6] text-[var(--color-ink-muted)]">
          {pilot.lead}
        </p>

        <ul className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:gap-x-16">
          {pilot.items.map((item) => (
            <li key={item.title} className="reveal flex gap-3 border-t border-[var(--color-rule)] pt-5">
              <CheckIcon size={16} weight="bold" className="mt-[0.3rem] shrink-0 text-[var(--color-solar)]" />
              <div>
                <h3 className="text-[17px] leading-[1.4] font-medium">{item.title}</h3>
                <p className="mt-2 max-w-[40ch] text-[16px] leading-[1.6] text-[var(--color-ink-muted)]">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Wrap>
    </Section>
  );
}
