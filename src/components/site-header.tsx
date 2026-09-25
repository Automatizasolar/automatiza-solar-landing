"use client";

import Image from "next/image";
import { WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { cta, site } from "@/lib/site";

/**
 * Una sola línea, 64px de alto. Por debajo de 30rem el botón se queda con el
 * glifo y la etiqueta pasa a lector de pantalla: con el logo al lado no caben
 * dos etiquetas.
 */
export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 h-16">
      <div className="absolute inset-0 border-b border-[var(--color-rule-soft)] bg-[color-mix(in_oklab,var(--color-ground)_82%,transparent)] backdrop-blur-xl" />
      <div className="relative flex h-full items-center justify-between gap-4 px-5 sm:px-8 lg:pr-12 lg:pl-[116px]">
        <a href="#top" className="flex items-center" aria-label="Automatiza Solar, ir al inicio">
          <Image
            src="/brand/logo-horizontal.svg"
            alt="Automatiza Solar"
            width={720}
            height={170}
            priority
            className="h-6 w-auto sm:h-7"
          />
        </a>

        <a
          href={site.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[var(--color-solar)] px-3 py-2 text-[14px] leading-none font-medium text-white transition-[transform,background-color] duration-150 ease-[var(--ease-out-strong)] hover:bg-[var(--color-solar-deep)] active:scale-[0.97] sm:px-4"
        >
          <WhatsappLogoIcon size={18} weight="fill" />
          <span className="hidden sm:inline">{cta.whatsapp}</span>
          <span className="sr-only sm:hidden">{cta.whatsapp}</span>
        </a>
      </div>
    </header>
  );
}
