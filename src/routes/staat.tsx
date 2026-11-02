import { createFileRoute } from "@tanstack/react-router";
import { TopicPage, Box } from "@/components/TopicPage";

export const Route = createFileRoute("/staat")({
  head: () => ({ meta: [
    { title: "Finanzielle Unterstützung vom Staat – Geldstart" },
    { name: "description", content: "Frühstart-Rente, VL, Arbeitnehmersparzulage und Riester einfach erklärt." },
    { property: "og:title", content: "Geld vom Staat fürs Sparen" },
    { property: "og:description", content: "Geschenktes Geld, das viele vergessen." },
  ] }),
  component: () => (
    <TopicPage emoji="🏛️" title="Hilfe vom Staat" intro="Der Staat unterstützt dich beim Sparen. Viele junge Leute nutzen das nicht – du schon!">
      <Box title="🚀 Frühstart-Rente (geplant)">
        <p>Geplant ist, dass der Staat für Kinder und Jugendliche jeden Monat einen kleinen Betrag in ein Vorsorgedepot einzahlt. Die Details sind noch in Arbeit.</p>
      </Box>
      <Box title="💼 Vermögenswirksame Leistungen (VL)">
        <p>In der Ausbildung zahlt dein Chef oft bis zu 40 € im Monat extra für dich in einen Sparvertrag. Frag einfach nach!</p>
      </Box>
      <Box title="🎁 Arbeitnehmersparzulage">
        <p>Legst du VL in einem Fonds-Sparplan an, gibt der Staat bei geringem Einkommen noch etwas dazu.</p>
      </Box>
      <Box title="🏠 Wohnungsbauprämie">
        <p>Wenn du mit einem Bausparvertrag sparst, gibt's unter bestimmten Bedingungen eine Prämie.</p>
      </Box>
      <Box title="🧾 Riester-Zulagen">
        <p>Wer einen Riester-Vertrag hat, bekommt Zulagen vom Staat. Junge Leute unter 25 bekommen einmalig einen Bonus.</p>
      </Box>
      <Box tone="warn" title="Tipp">
        <p>Regeln und Beträge ändern sich. Prüfe immer die aktuellen Infos, z. B. bei der Verbraucherzentrale.</p>
      </Box>
    </TopicPage>
  ),
});
