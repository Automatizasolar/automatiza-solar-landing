import Image from "next/image";
import { legal } from "@/lib/content";
import { cta, site } from "@/lib/site";
import { Wrap } from "./ui";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-rule-soft)] lg:pl-[104px]">
      <Wrap className="py-14">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Image
              src="/brand/logo-horizontal.svg"
              alt="Automatiza Solar"
              width={720}
              height={170}
              className="h-6 w-auto"
            />
            <p className="tnum mt-5 font-[family-name:var(--font-mono)] text-[13px] text-[var(--color-ink-muted)]">
              {site.whatsappPretty}
            </p>
          </div>

          <nav className="flex flex-col gap-3 text-[15px] sm:items-end">
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-ink)] transition-colors duration-150 hover:text-[var(--color-solar)]"
            >
              {cta.whatsapp}
            </a>
            <a
              href={site.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-ink-muted)] transition-colors duration-150 hover:text-[var(--color-ink)]"
            >
              {cta.call}
            </a>
            <a
              href={site.mailtoHref}
              className="text-[var(--color-ink-muted)] transition-colors duration-150 hover:text-[var(--color-ink)]"
            >
              {cta.mail}
            </a>
          </nav>
        </div>

        <p className="mt-12 max-w-[62ch] border-t border-[var(--color-rule-soft)] pt-6 text-[13px] leading-[1.6] text-[var(--color-ink-faint)]">
          © {new Date().getFullYear()} {site.name}. {legal}
        </p>
      </Wrap>
    </footer>
  );
}
