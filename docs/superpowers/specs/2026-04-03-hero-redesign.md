# Hero Section Redesign

**Date:** 2026-04-03
**Status:** Approved

## Context

Die aktuelle Hero-Sektion ist zentriert ausgerichtet und enthält mehrere Inhaltselemente: Eyebrow, Headline (Shutter-Effekt), Body-Copy, zwei CTAs und einen Social-Proof-Bereich. Inspiriert von Tech-Dark Designs wie AEON soll die Hero auf ein links-ausgerichtetes, reduzierteres Layout umgestellt werden — schärfer, direkter, mit mehr visueller Bühne für den bestehenden LightPillar-Hintergrund.

## Änderungen

### Layout
- Content-Wrapper in `Hero.tsx`: `items-center text-center max-w-3xl mx-auto` → `items-start text-left max-w-xl` (`mx-auto` entfernen)
- Innere Wrapper-Divs (Headline-Gruppe, CTA-Gruppe): `items-center` → `items-start`, `justify-center` → `justify-start` wo vorhanden
- Der Content-Block erhält eine maximale Breite von `max-w-xl` (ca. 40–50% bei großen Screens), damit der LightPillar rechts dominant bleibt
- Das äußere Padding `px-6 md:px-12 lg:px-20` bleibt unverändert (linkes Padding gibt den Abstand)
- LightPillar bleibt vollständig unverändert

### HeroShutterText — Alignment-Props
- `hero-shutter-text.tsx` erhält einen `align`-Prop: `"center"` (default) | `"left"`
- Bei `align="left"`: äußeres `div` bekommt `items-start` statt `items-center`, inneres `div` `justify-start` statt `justify-center`
- In `Hero.tsx` wird `<HeroShutterText align="left" ... />` übergeben

### Headline
- Neuer Text: **"DIGITALE PRÄSENZ. MAXIMIERT."** (3 Zeilen: `DIGITALE` / `PRÄSENZ.` / `MAXIMIERT.`)
- Shutter-Animation bleibt vollständig erhalten
- Letzte Zeile (`MAXIMIERT.`) mit `gradient: true` für Cyan-Gradient

### Eyebrow
- Text ändert sich von `"WEB-AGENTUR · ALLGÄU"` → `"Webdesign & Entwicklung"`
- Klasse `gradient-text` bleibt

### Body-Copy
- **Wird entfernt** (`<motion.p>` mit Beschreibungstext)

### CTAs
- **Nur noch ein Button:** "Projekte ansehen" (`gradient-btn`, scrollt zu `#portfolio`)
- **"Über mich"-Button wird entfernt**

### Social Proof
- **Wird entfernt** (Avatare + Text komplett)

### Scroll-Blur
- Bleibt unverändert

## Dateien

- `components/sections/Hero.tsx` — Layout, Eyebrow-Text, Headline-Text, CTA- und Social-Proof-Entfernung
- `components/ui/hero-shutter-text.tsx` — `align` Prop hinzufügen

## Verifikation

1. `npm run dev` starten
2. Hero im Browser prüfen:
   - Text ist links-ausgerichtet (Eyebrow, Headline, CTA)
   - Headline zeigt "DIGITALE PRÄSENZ. MAXIMIERT." mit Shutter-Animation
   - "MAXIMIERT." erscheint in Cyan-Gradient
   - Body-Copy ist nicht sichtbar
   - Nur ein CTA-Button vorhanden
   - Social Proof ist nicht sichtbar
   - LightPillar läuft im Hintergrund (rechts dominant)
   - Scroll-Blur funktioniert beim Herunterscrollen
3. Mobile-Ansicht prüfen (kein Scroll-Blur, Layout korrekt links-ausgerichtet)
