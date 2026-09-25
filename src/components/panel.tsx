import Image from "next/image";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { panel } from "@/lib/content";
import { cta, site } from "@/lib/site";
import { Section, Wrap } from "./ui";

/**
 * Va justo detrás de la conversación, a las 07:40, porque es la segunda demo:
 * el remate de la conversación dice "te enteraste el lunes a las 7:40" y este
 * titular empieza con una "Y" que solo conecta si está aquí.
 *
 * En la sección del panel va una captura del panel, no una foto de archivo.
 * Lo que convence aquí es el producto. La captura se recorta dura contra el
 * campo oscuro en vez de flotar centrada con sombra.
 */
export function Panel() {
  return (
    <Section hour="07:40" className="overflow-clip">
      <Wrap className="py-16 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div className="reveal">
            <h2 className="max-w-[14ch] text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.06] font-semibold tracking-[-0.03em] text-balance">
              {panel.title}
            </h2>
            <p className="mt-6 max-w-[44ch] text-[17px] leading-[1.6] text-[var(--color-ink-muted)]">
              {panel.body}
            </p>
            <p className="mt-5 max-w-[44ch] text-[15px] leading-[1.6] text-[var(--color-ink-faint)]">
              {panel.note}
            </p>

            <a
              href={site.panel}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-1.5 text-[16px] font-medium text-[var(--color-solar)] underline decoration-[color-mix(in_oklab,var(--color-solar)_40%,transparent)] transition-[color,text-decoration-color] duration-150 hover:decoration-[var(--color-solar)]"
            >
              {cta.panel}
              <ArrowUpRightIcon size={16} weight="bold" />
            </a>
          </div>

          {/* Recorte duro: la captura se sale del marco por la derecha. */}
          <div className="reveal relative">
            <div className="overflow-hidden rounded-[14px] border border-[var(--color-rule)] lg:-mr-24 xl:-mr-32">
              <Image
                src={panel.image.src}
                alt="Panel de gestión con las conversaciones del agente y el estado de cada una"
                width={panel.image.w}
                height={panel.image.h}
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="block w-full"
              />
            </div>
          </div>
        </div>
      </Wrap>
    </Section>
  );
}
