import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HourRail } from "@/components/hour-rail";
import { Hero } from "@/components/hero";
import { Conversation } from "@/components/conversation";
import { Arrivals } from "@/components/arrivals";
import { AgentStack } from "@/components/agent-stack";
import { Panel } from "@/components/panel";
import { SevenDays } from "@/components/seven-days";
import { Requirements } from "@/components/requirements";
import { Fit } from "@/components/fit";
import { Faq } from "@/components/faq";
import { Closing } from "@/components/closing";

/**
 * Una jornada completa, de domingo 22:14 a lunes 22:14.
 * El scroll es el paso del tiempo y el raíl de la izquierda lo mide.
 */
export default function Page() {
  return (
    <>
      <span id="top" />
      <SiteHeader />
      <HourRail />

      <main>
        <Hero />
        <Conversation />
        <Arrivals />
        <AgentStack />
        <Panel />
        <SevenDays />
        <Requirements />
        <Fit />
        <Faq />
        <Closing />
      </main>

      <SiteFooter />
    </>
  );
}
