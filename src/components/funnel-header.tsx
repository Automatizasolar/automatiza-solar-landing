import Image from "next/image";
import { cta, funnel } from "@/lib/site";

/**
 * La cabecera del funnel: el logo sin enlace (llevaría a la home, que es una
 * salida) y un único botón que baja a la agenda. En móvil ese papel lo hace la
 * barra de reserva de abajo, así que aquí el botón solo aparece desde 640px.
 */
export function FunnelHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 h-16">
      <div className="absolute inset-0 border-b border-[var(--color-rule-soft)] bg-[color-mix(in_oklab,var(--color-ground)_82%,transparent)] backdrop-blur-xl" />
      <div className="relative flex h-full items-center justify-between gap-4 px-5 sm:px-8 lg:pr-12 lg:pl-[116px]">
        <Image
          src="/brand/logo-horizontal.svg"
          alt="Automatiza Solar"
          width={720}
          height={170}
          priority
          className="h-6 w-auto sm:h-7"
        />

        <a
          href={funnel.agendaHref}
          className="hidden items-center rounded-full bg-[var(--color-solar)] px-4 py-2 text-[14px] leading-none font-medium text-white transition-[transform,background-color] duration-150 ease-[var(--ease-out-strong)] hover:bg-[var(--color-solar-deep)] active:scale-[0.97] sm:inline-flex"
        >
          {cta.book}
        </a>
      </div>
    </header>
  );
}
