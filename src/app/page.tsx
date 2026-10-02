import { FunnelHeader } from "@/components/funnel-header";
import { FunnelFooter } from "@/components/funnel-footer";
import { HourRail } from "@/components/hour-rail";
import { Hero } from "@/components/hero";
import { Conversation } from "@/components/conversation";
import { Panel } from "@/components/panel";
import { AgentStack } from "@/components/agent-stack";
import { Arrivals } from "@/components/arrivals";
import { SevenDays } from "@/components/seven-days";
import { Fit } from "@/components/fit";
import { About } from "@/components/about";
import { Faq } from "@/components/faq";
import { Agenda } from "@/components/agenda";
import { BookBar } from "@/components/book-bar";

/**
 * La web es el funnel de los anuncios: sin menú ni salidas. Las seis piezas,
 * en orden: llamada al nicho y titular (hero), VSL, demo (la conversación y el
 * panel), y el formulario con el calendario al final (agenda). Lo de en medio
 * responde las seis preguntas con las que llega el dueño.
 */
export default function Page() {
  return (
    <>
      <span id="top" />
      <FunnelHeader />
      <HourRail mobileClock={false} />

      <main>
        <Hero funnel />
        {/* Pieza 3 · VSL: entra aquí cuando esté grabado (lección 6). */}
        <Conversation />
        <Panel link={false} />
        <AgentStack />
        <Arrivals />
        <SevenDays />
        <Fit />
        <About />
        <Faq />
        <Agenda />
      </main>

      <FunnelFooter />
      <BookBar />
    </>
  );
}
