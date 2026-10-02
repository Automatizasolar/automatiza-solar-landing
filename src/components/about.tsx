import Image from "next/image";
import { CalendarBlankIcon } from "@phosphor-icons/react/dist/ssr";
import { funnelCopy } from "@/lib/content";
import { cta, funnel } from "@/lib/site";
import { ActionPrimary, Section, Wrap } from "./ui";

/**
 * Responde a "¿puedo fiarme de esta persona?". Cara, nombre y una frase
 * honesta. El hueco de la prueba social se queda dicho en voz alta hasta que
 * haya un primer caso real con permiso: no se inventa ninguno.
 *
 * Cierra con el botón de mitad de página: después de la prueba es cuando más
 * gente decide, y no tiene que bajar hasta la agenda para encontrarlo.
 */
export function About() {
  const { about } = funnelCopy;

  return (
    <Section hour="19:40">
      <Wrap className="py-16 lg:py-24">
        <h2 className="reveal max-w-[16ch] text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.06] font-semibold tracking-[-0.03em] text-balance">
          {about.title}
        </h2>

        <div className="reveal mt-12 flex max-w-[44rem] flex-col gap-8 sm:flex-row sm:items-start">
          <div className="h-28 w-28 shrink-0 overflow-hidden rounded-full border border-[var(--color-rule)] bg-[var(--color-raised-2)] sm:h-32 sm:w-32">
            <Image
              src={about.photo.src}
              alt={`${about.name}, fundador de Automatiza Solar`}
              width={about.photo.w}
              height={about.photo.h}
              sizes="128px"
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <p className="text-[19px] leading-[1.3] font-semibold tracking-[-0.01em]">
              {about.name}
              <span className="font-normal text-[var(--color-ink-faint)]"> · {about.place}</span>
            </p>
            <p className="mt-4 max-w-[48ch] text-[17px] leading-[1.6] text-[var(--color-ink-muted)]">
              {about.body}
            </p>
            <p className="mt-5 max-w-[48ch] border-l-2 border-[var(--color-solar)] pl-4 text-[16px] leading-[1.6] text-[var(--color-ink)]">
              {about.honest}
            </p>
          </div>
        </div>

        <div className="reveal mt-12">
          <ActionPrimary
            href={funnel.agendaHref}
            external={false}
            icon={<CalendarBlankIcon size={18} weight="bold" />}
          >
            {cta.bookFit}
          </ActionPrimary>
          <p className="mt-4 text-[14px] leading-[1.5] text-[var(--color-ink-faint)]">{about.ctaNote}</p>
        </div>
      </Wrap>
    </Section>
  );
}
