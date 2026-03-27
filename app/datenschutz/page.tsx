import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz — J. Studio",
};

export default function Datenschutz() {
  return (
    <main className="min-h-screen bg-background px-6 md:px-12 lg:px-20 py-24">
      <div className="max-w-2xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-body text-sm text-muted hover:text-[var(--accent-1)] transition-colors mb-12"
        >
          ← Zurück zur Startseite
        </Link>

        <h1 className="font-display font-extrabold text-4xl text-foreground tracking-tight mb-10">
          Datenschutzerklärung
        </h1>

        <div className="font-body text-muted leading-relaxed space-y-8">
          <section>
            <h2 className="font-display font-bold text-lg text-foreground mb-3">
              1. Datenschutz auf einen Blick
            </h2>
            <h3 className="font-body font-medium text-foreground mb-2">
              Allgemeine Hinweise
            </h3>
            <p className="text-sm">
              Die folgenden Hinweise geben einen einfachen Überblick darüber,
              was mit Ihren personenbezogenen Daten passiert, wenn Sie diese
              Website besuchen. Personenbezogene Daten sind alle Daten, mit
              denen Sie persönlich identifiziert werden können.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-foreground mb-3">
              2. Datenerfassung auf dieser Website
            </h2>
            <h3 className="font-body font-medium text-foreground mb-2">
              Kontaktformular
            </h3>
            <p className="text-sm mb-4">
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden
              Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort
              angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für
              den Fall von Anschlussfragen bei uns gespeichert. Diese Daten
              geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
            <p className="text-sm">
              Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6
              Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines
              Vertrags zusammenhängt oder zur Durchführung vorvertraglicher
              Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die
              Verarbeitung auf unserem berechtigten Interesse an der effektiven
              Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f
              DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO)
              sofern diese abgefragt wurde.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-foreground mb-3">
              3. Ihre Rechte
            </h2>
            <p className="text-sm">
              Sie haben jederzeit das Recht auf unentgeltliche Auskunft über
              Herkunft, Empfänger und Zweck Ihrer gespeicherten
              personenbezogenen Daten. Sie haben außerdem ein Recht, die
              Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie
              eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie
              diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem
              haben Sie das Recht, unter bestimmten Umständen die Einschränkung
              der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
              Wenden Sie sich dazu an: hallo@j-studio.de
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-foreground mb-3">
              4. Hosting
            </h2>
            <p className="text-sm">
              Diese Website wird bei Vercel Inc. gehostet. Anbieter ist die
              Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA. Details
              entnehmen Sie der Datenschutzerklärung von Vercel:{" "}
              <span className="text-[var(--accent-1)]">vercel.com/legal/privacy-policy</span>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
