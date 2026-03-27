import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum — J. Studio",
};

export default function Impressum() {
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
          Impressum
        </h1>

        <div className="prose prose-sm max-w-none font-body text-muted leading-relaxed space-y-6">
          <section>
            <h2 className="font-display font-bold text-lg text-foreground mb-3">
              Angaben gemäß § 5 TMG
            </h2>
            <p>
              James [Nachname]
              <br />
              J. Studio
              <br />
              [Straße und Hausnummer]
              <br />
              [PLZ] [Ort], Bayern
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-foreground mb-3">
              Kontakt
            </h2>
            <p>
              E-Mail: hallo@j-studio.de
              <br />
              Telefon: +49 (0) 831 XXX-XXXX
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-foreground mb-3">
              Haftung für Inhalte
            </h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene
              Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
              verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter
              jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen oder nach Umständen zu forschen, die
              auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-foreground mb-3">
              Haftung für Links
            </h2>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf
              deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
              diese fremden Inhalte auch keine Gewähr übernehmen. Für die
              Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
              oder Betreiber der Seiten verantwortlich.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-foreground mb-3">
              Urheberrecht
            </h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem deutschen Urheberrecht. Die
              Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
              Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
              schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
