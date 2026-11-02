import { createFileRoute } from "@tanstack/react-router";
import { TopicPage, Box } from "@/components/TopicPage";
import { ZUKUNFTSDEPOT_URL } from "@/lib/topics";

export const Route = createFileRoute("/altersvorsorgedepot")({
  head: () => ({ meta: [
    { title: "Altersvorsorgedepot einfach erklärt – Geldstart" },
    { name: "description", content: "Warum Vorsorge fürs Alter schon mit 16 Sinn macht und wie ein Altersvorsorgedepot funktioniert." },
    { property: "og:title", content: "Altersvorsorgedepot einfach erklärt" },
    { property: "og:description", content: "Früh an später denken – ganz entspannt." },
  ] }),
  component: () => (
    <TopicPage emoji="🧓" title="Altersvorsorgedepot" intro="Rente klingt weit weg. Aber gerade jetzt hast du den größten Vorteil: viel Zeit." next="/staat">
      <Box title="Warum überhaupt?">
        <p>Die gesetzliche Rente wird später wahrscheinlich nicht reichen, um so zu leben wie vorher. Deshalb ist eigene Vorsorge wichtig.</p>
      </Box>
      <Box title="Was ist ein Altersvorsorgedepot?">
        <p>Ein Depot, in dem du Geld fürs Alter anlegst – zum Beispiel in ETFs.</p>
        <p>Die Bundesregierung plant ein neues, staatlich gefördertes Altersvorsorgedepot. Du zahlst ein, der Staat legt etwas dazu, und das Geld bleibt bis zur Rente angelegt.</p>
      </Box>
      <Box tone="warn" title="Wichtig">
        <p>Die genauen Regeln (Start, Förderung, Bedingungen) können sich noch ändern. Informiere dich immer aktuell.</p>
      </Box>
      <Box tone="tip" title="Jetzt starten">
        <p>Mit dem Zukunftsdepot kannst du schon heute langfristig für später anlegen.</p>
        <a href={ZUKUNFTSDEPOT_URL} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block rounded-full bg-primary px-5 py-2 font-bold text-primary-foreground">Zum Zukunftsdepot ↗</a>
      </Box>
    </TopicPage>
  ),
});
