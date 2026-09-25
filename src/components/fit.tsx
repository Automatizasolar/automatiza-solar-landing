import { CheckIcon, MinusIcon } from "@phosphor-icons/react/dist/ssr";
import { fit } from "@/lib/content";
import { Section, Wrap } from "./ui";

/** Decir a quién no le sirve es lo que hace creíble a quién sí. */
export function Fit() {
  return (
    <Section hour="18:20">
      <Wrap className="py-24 lg:py-32">
        <h2 className="reveal max-w-[16ch] text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.06] font-semibold tracking-[-0.03em] text-balance">
          {fit.title}
        </h2>

        <div className="mt-14 grid gap-12 sm:grid-cols-2 sm:gap-10 lg:gap-16">
          {[
            { ...fit.yes, positive: true },
            { ...fit.no, positive: false },
          ].map((col) => (
            <div key={col.title} className="reveal">
              <h3
                className={`border-t pt-5 text-[15px] font-medium tracking-[-0.01em] ${
                  col.positive
                    ? "border-[var(--color-solar)] text-[var(--color-ink)]"
                    : "border-[var(--color-rule)] text-[var(--color-ink-muted)]"
                }`}
              >
                {col.title}
              </h3>

              <ul className="mt-6 flex flex-col gap-5">
                {col.items.map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-[0.3rem] shrink-0">
                      {col.positive ? (
                        <CheckIcon
                          size={16}
                          weight="bold"
                          className="text-[var(--color-solar)]"
                        />
                      ) : (
                        <MinusIcon
                          size={16}
                          weight="bold"
                          className="text-[var(--color-ink-faint)]"
                        />
                      )}
                    </span>
                    <span
                      className={`max-w-[38ch] text-[17px] leading-[1.55] ${
                        col.positive ? "text-[var(--color-ink)]" : "text-[var(--color-ink-muted)]"
                      }`}
                    >
                      {t}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Wrap>
    </Section>
  );
}
