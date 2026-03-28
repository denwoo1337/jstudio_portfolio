# Cycling Headline Animation — Design Spec

**Date:** 2026-03-28
**Status:** Approved

---

## Overview

Add a word-cycling animation to the hero section's bottom two headline lines. The static "Deine Website." is replaced by a looping sequence of 7 phrases. The first phrase enters with the existing shutter animation; all subsequent phrases animate in with a per-character blur-in effect using Framer Motion.

---

## Phrases (in order)

1. Deine Webseite.
2. Dein Auftritt.
3. Dein Kundenmagnet.
4. Dein Kundengewinner.
5. Deine Bühne.
6. Dein Vertrieb.
7. Dein Vorsprung.

Loops back to 1 after 7. All phrases contain exactly one space, splitting cleanly into two lines.

---

## Architecture

```
Hero.tsx
├── HeroShutterText  →  lines 1–2: "Dein" / "Betrieb."  (static, unchanged)
└── CyclingHeadline  →  lines 3–4: cycles through 7 phrases
```

`Hero.tsx` composes both components side by side inside the existing `motion.div` with `itemVariants`.

---

## HeroShutterText changes

Remove lines 3–4 from the `lines` prop passed in `Hero.tsx`:

```tsx
// Before
lines={[
  { text: "Dein" },
  { text: "Betrieb." },
  { text: "Deine", gradient: true },
  { text: "Website.", gradient: true },
]}

// After
lines={[
  { text: "Dein" },
  { text: "Betrieb." },
]}
```

The component file `hero-shutter-text.tsx` is **not modified**. With only 2 lines (12 chars: "Dein"=4, "Betrieb."=8), the last char settles at delay `11 * 0.04 + 0.3 = 0.74s`.

---

## CyclingHeadline component

**File:** `components/ui/cycling-headline.tsx`

Must include `"use client"` directive at the top — the component uses `useState` and `useEffect`, which require client-side rendering in Next.js 14 App Router.

### Props

```ts
interface CyclingHeadlineProps {
  phrases: string[];      // must each contain exactly one space, e.g. "Deine Webseite."
  charOffset?: number;    // char index offset for shutter timing on first phrase (default: 12)
                          // NOTE: this must equal the total char count of all static lines
                          // in HeroShutterText ("Dein"=4 + "Betrieb."=8 = 12). Update if
                          // static lines change.
  initialDelay?: number;  // ms before first swap (default: 3500)
  interval?: number;      // ms between swaps (default: 3000)
  className?: string;
}
```

### Line split

Each phrase is split at the **first space** into `[word1, word2]`:
- `"Deine Webseite."` → `["Deine", "Webseite."]`
- `"Dein Auftritt."` → `["Dein", "Auftritt."]`

All 7 defined phrases satisfy this constraint. No runtime validation is required for this use case; document the constraint on the prop.

### Typography

Both lines use the exact same font classes as `HeroShutterText` to ensure visual continuity:

```
font-display font-extrabold tracking-tighter leading-none
text-5xl md:text-6xl lg:text-8xl uppercase gradient-text-animated
```

`gradient-text-animated` is defined in `app/globals.css` and is already used on the current "Deine Website." lines.

### Index 0 — shutter animation

Render each character using the same 3-slice shutter pattern as `HeroShutterText`. Delays are computed as:

```ts
const delay = (charOffset + globalCharIdx) * 0.04;
```

Space characters render as `\u00A0` (non-breaking space) and increment `globalCharIdx` but require no shutter spans.

Approximate shutter active window for "Deine Webseite." (14 chars, charOffset=12):
- First char: `12 * 0.04 = 0.48s`
- Last char shutter: `(12 + 13) * 0.04 + 0.2 + 0.7 = 1.9s` (bottom slice completes)
- Last char settled: `(12 + 13) * 0.04 + 0.3 + 0.8 = 2.1s` (blur-in completes)

### Index 1+ — blur-in animation

Use `AnimatePresence mode="wait"` so the exiting phrase fully disappears before the entering phrase starts animating. This prevents two `text-8xl` blocks stacking in the DOM simultaneously.

The phrase container must carry `key={phraseIndex}` so Framer Motion detects the swap and fires exit/enter:

```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={phraseIndex}
    exit={{ opacity: 0, transition: { duration: 0.15 } }}
  >
    {/* two lines of characters */}
  </motion.div>
</AnimatePresence>
```

Each character (excluding spaces) animates:

```
initial:  { opacity: 0, y: 10, filter: "blur(8px)" }
animate:  { opacity: 1, y: 0,  filter: "blur(0px)" }
duration: 0.3s
ease:     "easeOut"
stagger:  0.015s per character (across both lines combined)
```

Space characters render as `\u00A0` inline-block spans with no animation variant — they are static placeholders.

### Cycling — useEffect

The interval is **nested inside** the initial timeout to ensure the first swap never fires before `initialDelay`:

```ts
useEffect(() => {
  let intervalId: ReturnType<typeof setInterval>;

  const timeoutId = setTimeout(() => {
    setIndex(i => (i + 1) % phrases.length);
    intervalId = setInterval(() => {
      setIndex(i => (i + 1) % phrases.length);
    }, interval);
  }, initialDelay);

  return () => {
    clearTimeout(timeoutId);
    clearInterval(intervalId);
  };
}, [phrases.length, initialDelay, interval]);
```

### Accessibility note

`prefers-reduced-motion` is **out of scope** for this iteration. Future work should pause cycling or use instant crossfades for users with motion sensitivity.

---

## Timing

| Event | Time from page load |
|---|---|
| Shutter starts on "Deine Webseite." (first char) | ~0.48s |
| Shutter sweeps active through last char | ~0.48s → ~1.9s |
| "Deine Webseite." fully settled | ~2.1s |
| First phrase swap (→ "Dein Auftritt.") | ~3.5s |
| Each subsequent swap | every 3s |

---

## File changes

| File | Change |
|---|---|
| `components/sections/Hero.tsx` | Remove lines 3–4 from `HeroShutterText`; add `<CyclingHeadline>` below it |
| `components/ui/cycling-headline.tsx` | New file |

No new npm dependencies.

---

## Out of scope

- No changes to body copy, CTAs, or social proof
- No changes to scroll parallax / blur effects
- No `prefers-reduced-motion` support (noted above)
- No mobile-specific timing overrides
