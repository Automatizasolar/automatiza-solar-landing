"use client";

import { useEffect, useSyncExternalStore } from "react";
import { loadPixel, onConsentChange, readConsent, saveConsent } from "@/lib/pixel";
import { PrivacyButton } from "./privacy";

/** En el servidor no hay decisión que leer: el aviso solo existe en el navegador. */
const SERVER = "ssr" as const;

/**
 * El aviso de cookies y lo único que carga el pixel de Meta. Mientras no haya
 * decisión, Meta no recibe nada. Va arriba de la barra de reserva del móvil y
 * desaparece en cuanto se elige.
 */
export function CookieConsent() {
  const consent = useSyncExternalStore(onConsentChange, readConsent, () => SERVER);

  useEffect(() => {
    if (consent === "granted") loadPixel();
  }, [consent]);

  if (consent !== null) return null;

  return (
    <div
      role="region"
      aria-label="Aviso de cookies"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto flex max-w-[44rem] flex-col gap-3 rounded-[14px] border border-[var(--color-rule)] bg-[var(--color-raised)] p-4 sm:flex-row sm:items-center sm:gap-5 sm:p-5"
    >
      <p className="flex-1 text-[14px] leading-[1.5] text-[var(--color-ink-muted)]">
        Uso cookies de Meta para saber qué anuncios traen reservas. No se activan hasta que
        aceptes. <PrivacyButton />.
      </p>
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={() => saveConsent("denied")}
          className="cursor-pointer rounded-full border border-[var(--color-rule)] px-4 py-2.5 text-[14px] leading-none font-medium text-[var(--color-ink)] transition-colors duration-150 hover:bg-[var(--color-raised-2)]"
        >
          Solo las necesarias
        </button>
        <button
          type="button"
          onClick={() => saveConsent("granted")}
          className="cursor-pointer rounded-full bg-[var(--color-solar)] px-4 py-2.5 text-[14px] leading-none font-medium text-white transition-colors duration-150 hover:bg-[var(--color-solar-deep)]"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}

/** En el pie: borra la decisión y el aviso vuelve a salir. */
export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => saveConsent(null)}
      className="cursor-pointer underline decoration-[color-mix(in_oklab,currentColor_40%,transparent)] transition-colors duration-150 hover:text-[var(--color-ink)]"
    >
      Preferencias de cookies
    </button>
  );
}
