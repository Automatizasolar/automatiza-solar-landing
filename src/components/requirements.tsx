import Image from "next/image";
import { requirements } from "@/lib/content";
import { Section, Wrap } from "./ui";

/**
 * Tramo quieto a propósito. La página viene de tres secciones con movimiento
 * fuerte y aquí conviene que el ojo descanse: sin iconos y sin adornos, solo
 * filetes, aire y una placa de textura.
 *
 * La foto va como placa recortada al lado y no de fondo bajo el texto: sobre
 * papel, una imagen al dieciséis por ciento no es sutil, es sucia.
 */
export function Requirements() {
  return (
    <Section hour="15:40" className="overflow-clip">
      <Wrap className="py-24 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
          {/* Recorte duro: la placa se sale del marco por la izquierda. */}
          <div className="reveal relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] border border-[var(--color-rule)] lg:-ml-24 xl:-ml-32">
              <Image
                src="/brand/fotos/panel-textura.jpg"
                alt="Detalle de un panel solar instalado, con el cielo reflejado en el vidrio"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="reveal max-w-[14ch] text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.06] font-semibold tracking-[-0.03em] text-balance">
              {requirements.title}
            </h2>
            <p className="reveal mt-5 max-w-[42ch] text-[17px] leading-[1.6] text-[var(--color-ink-muted)]">
              {requirements.lead}
            </p>

            <ul className="mt-10 border-t border-[var(--color-rule)]">
              {requirements.items.map((item) => (
                <li
                  key={item.n}
                  className="reveal border-b border-[var(--color-rule)] py-5"
                >
                  <p className="max-w-[34ch] text-[clamp(1.02rem,1.4vw,1.2rem)] leading-[1.4] font-medium tracking-[-0.012em]">
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Wrap>
    </Section>
  );
}
