"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { XIcon } from "@phosphor-icons/react/dist/ssr";
import { privacy } from "@/lib/privacy";
import { cta } from "@/lib/site";

/** El texto de la política. Lo comparten la página /privacidad y el modal del funnel. */
export function PrivacyText({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const Title = headingLevel === 1 ? "h1" : "h2";
  const Sub = headingLevel === 1 ? "h2" : "h3";

  return (
    <div>
      <Title className="text-[clamp(1.5rem,3vw,2.2rem)] leading-[1.1] font-semibold tracking-[-0.025em] text-balance">
        {privacy.title}
      </Title>
      <p className="mt-3 text-[14px] text-[var(--color-ink-faint)]">
        Actualizada el {privacy.updated}
      </p>
      {privacy.sections.map((s) => (
        <section key={s.h} className="mt-7">
          <Sub className="text-[16px] font-semibold">{s.h}</Sub>
          {s.p.map((t) => (
            <p key={t} className="mt-2 max-w-[62ch] text-[15px] leading-[1.65] text-[var(--color-ink-muted)]">
              {t}
            </p>
          ))}
        </section>
      ))}
    </div>
  );
}

/**
 * En el funnel la política se abre encima de la página y no en otra: un enlace
 * a /privacidad sería una salida. El botón va dentro de un párrafo, así que el
 * `<dialog>` no puede ir a su lado (el HTML cierra el `<p>` y React no hidrata):
 * se monta en el body solo al abrirlo. Nativo, así que Escape lo cierra.
 */
export function PrivacyButton({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`cursor-pointer underline decoration-[color-mix(in_oklab,currentColor_40%,transparent)] transition-colors duration-150 hover:text-[var(--color-ink)] ${className}`}
      >
        {cta.privacy}
      </button>
      {open && createPortal(<PrivacyDialog onClose={() => setOpen(false)} />, document.body)}
    </>
  );
}

function PrivacyDialog({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialog.current?.showModal();
  }, []);

  return (
    // data-lenis-prevent: dentro del modal el scroll es nativo, no de Lenis.
    <dialog
      ref={dialog}
      data-lenis-prevent
      onClose={onClose}
      onClick={(e) => e.target === dialog.current && dialog.current?.close()}
      className="m-auto max-h-[85dvh] w-[min(36rem,calc(100%-2rem))] rounded-[14px] border border-[var(--color-rule)] bg-[var(--color-raised)] p-0 text-[var(--color-ink)] backdrop:bg-[color-mix(in_oklab,var(--color-ink)_45%,transparent)]"
    >
      <div className="relative p-6 sm:p-8">
        <button
          type="button"
          onClick={() => dialog.current?.close()}
          aria-label="Cerrar"
          className="absolute top-4 right-4 cursor-pointer rounded-full p-2 text-[var(--color-ink-faint)] transition-colors duration-150 hover:bg-[var(--color-raised-2)] hover:text-[var(--color-ink)]"
        >
          <XIcon size={18} weight="bold" />
        </button>
        <PrivacyText />
      </div>
    </dialog>
  );
}
