import Image from "next/image";
import { WhatsappLogoIcon, CalendarBlankIcon } from "@phosphor-icons/react/dist/ssr";
import { closing } from "@/lib/content";
import { cta, site } from "@/lib/site";
import { ActionPrimary, ActionSecondary, Section, Wrap } from "./ui";

/** El día se cierra donde empezó: 22:14. Mañana vuelve a pasar. */
export function Closing() {
  return (
    <Section hour="22:14" className="relative overflow-clip">
      <div className="absolute inset-0">
        <Image
          src="/brand/fotos/casa-instalada.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[center_38%]"
        />
        {/* El lado del texto queda prácticamente en papel sólido: el texto va
            encima de la foto y el contraste no puede depender de la suerte. */}
        <div className="absolute inset-0 bg-[color-mix(in_oklab,var(--color-ground)_52%,transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-ground)_0%,color-mix(in_oklab,var(--color-ground)_92%,transparent)_42%,color-mix(in_oklab,var(--color-ground)_8%,transparent)_86%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-ground)_0%,transparent_30%,transparent_70%,var(--color-ground)_100%)]" />
      </div>

      <Wrap className="relative py-28 lg:py-40">
        <div className="reveal max-w-[34rem]">
          <h2 className="text-[clamp(2.1rem,4.6vw,3.6rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-balance">
            {closing.title}
          </h2>
          <p className="mt-6 max-w-[44ch] text-[clamp(1.05rem,1.4vw,1.2rem)] leading-[1.6] text-[var(--color-ink-muted)]">
            {closing.body}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <ActionPrimary
              href={site.whatsappHref}
              icon={<WhatsappLogoIcon size={19} weight="fill" />}
            >
              {cta.whatsapp}
            </ActionPrimary>
            <ActionSecondary href={site.calendly} icon={<CalendarBlankIcon size={18} />}>
              {cta.call}
            </ActionSecondary>
          </div>
        </div>
      </Wrap>
    </Section>
  );
}
