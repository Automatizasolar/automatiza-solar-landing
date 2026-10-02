import Image from "next/image";
import { funnelCopy } from "@/lib/content";
import { site } from "@/lib/site";
import { CookieSettingsButton } from "./cookie-consent";
import { PrivacyButton } from "./privacy";
import { Wrap } from "./ui";

/** Pie del funnel: sin WhatsApp, correo ni enlaces a la home. Solo lo legal. */
export function FunnelFooter() {
  return (
    <footer className="border-t border-[var(--color-rule-soft)] pb-24 sm:pb-0 lg:pl-[104px]">
      <Wrap className="py-12">
        <Image
          src="/brand/logo-horizontal.svg"
          alt="Automatiza Solar"
          width={720}
          height={170}
          className="h-6 w-auto"
        />
        <p className="mt-8 max-w-[62ch] border-t border-[var(--color-rule-soft)] pt-6 text-[13px] leading-[1.6] text-[var(--color-ink-faint)]">
          © {new Date().getFullYear()} {site.name}. {funnelCopy.legal}{" "}
          <PrivacyButton /> · <CookieSettingsButton />.
        </p>
      </Wrap>
    </footer>
  );
}
