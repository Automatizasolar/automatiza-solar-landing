import type { ReactNode, Ref } from "react";

/**
 * Sistema de formas, documentado y sin excepciones:
 * controles pequeños en pill, superficies a 14px, elevación declarada una
 * sola vez con borde de 1px y nunca además con sombra difusa.
 *
 * Sobre el verde sólido la tinta es blanca (5,8:1). En un tema claro el verde
 * tiene que bajar de luminosidad para sostener texto encima; el verde de marca
 * tal cual daba 3,2:1 sobre papel y era ilegible.
 */

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full whitespace-nowrap " +
  "px-5 py-3 text-[15px] font-medium leading-none " +
  "transition-[transform,background-color,border-color,color] duration-150 ease-[var(--ease-out-strong)] " +
  "active:scale-[0.97]";

export function ActionPrimary({
  href,
  children,
  icon,
}: {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} bg-[var(--color-solar)] text-white hover:bg-[var(--color-solar-deep)]`}
    >
      {icon}
      {children}
    </a>
  );
}

export function ActionSecondary({
  href,
  children,
  icon,
}: {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} border border-[var(--color-rule)] bg-[color-mix(in_oklab,var(--color-raised)_82%,transparent)] text-[var(--color-ink)] backdrop-blur-sm hover:border-[#bcc6c2] hover:bg-[var(--color-raised)]`}
    >
      {icon}
      {children}
    </a>
  );
}

/**
 * Cada sección declara su hora. El raíl lee estos atributos para colocar sus
 * divisiones, así que la hora no es una etiqueta suelta: es la posición.
 */
export function Section({
  id,
  hour,
  scale = "hora",
  className = "",
  children,
  ref,
}: {
  id?: string;
  hour: string;
  scale?: "hora" | "día";
  className?: string;
  children: ReactNode;
  ref?: Ref<HTMLElement>;
}) {
  return (
    <section
      ref={ref}
      id={id}
      data-hour={hour}
      data-scale={scale}
      className={`relative lg:pl-[104px] ${className}`}
    >
      {children}
    </section>
  );
}

/** Ancho de lectura y márgenes laterales, una sola vez para toda la página. */
export function Wrap({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1180px] px-5 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}

/** Cifra medida. Mono solo aquí, donde de verdad hay medida. */
export function Measure({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="tnum font-[family-name:var(--font-mono)] text-[15px] text-[var(--color-solar)]">
        {value}
      </span>
      <span className="text-[13px] text-[var(--color-ink-faint)]">{label}</span>
    </div>
  );
}
