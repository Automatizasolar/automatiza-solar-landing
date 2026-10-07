import { voices } from "@/lib/content";
import { Wrap } from "./ui";

/**
 * Las palabras del cliente final antes de la demo: tres citas grandes, cada una
 * con su filete, y debajo por qué pasa. Es la respuesta a «la página es muy
 * general»: aquí el dueño de una instaladora se reconoce o no sigue bajando.
 *
 * Sin hora propia en el raíl: sigue siendo el domingo a las 22:14 del hero.
 */
export function Voices() {
  return (
    <section className="relative lg:pl-[104px]">
      <Wrap className="py-16 lg:py-24">
        <h2 className="reveal max-w-[18ch] text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.06] font-semibold tracking-[-0.03em] text-balance">
          {voices.title}
        </h2>
        <p className="reveal mt-4 text-[14px] leading-[1.5] text-[var(--color-ink-faint)]">{voices.source}</p>

        <ul className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {voices.quotes.map((q) => (
            <li key={q} className="reveal border-t border-[var(--color-rule)] pt-5">
              <blockquote className="max-w-[22ch] text-[clamp(1.25rem,1.9vw,1.6rem)] leading-[1.3] font-semibold tracking-[-0.02em] text-balance">
                «{q}»
              </blockquote>
            </li>
          ))}
        </ul>

        <div className="reveal mt-14 max-w-[44rem] border-l-2 border-[var(--color-solar)] pl-5">
          <h3 className="text-[19px] leading-[1.3] font-semibold tracking-[-0.01em]">{voices.why.title}</h3>
          <p className="mt-3 max-w-[58ch] text-[17px] leading-[1.6] text-[var(--color-ink-muted)]">{voices.why.body}</p>
        </div>
      </Wrap>
    </section>
  );
}
