# J. Studio — Portfolio Website Design Spec
**Date:** 2026-03-27
**Author:** James (Web-Agentur Gründer, Allgäu)
**Status:** Approved by user

---

## 1. Project Context

James is founding a web agency targeting local service businesses (Handwerker, Dienstleister) in the Allgäu region. The positioning is direct, affordable, and no-bullshit — "vom einfachen Mann für den einfachen Mann." He needs a portfolio website that demonstrates his skills, builds trust with potential clients, and converts visitors into inquiries.

The site must:
- Show existing work (Carwellness Allgäu, Alltec Anhängervermietung)
- Communicate the value proposition clearly and without marketing clichés
- Look modern and premium enough to justify professional pricing
- Work as a sales tool for local businesses who may be skeptical of web agencies

---

## 2. Design System (taste-skill)

**Settings:**
- `DESIGN_VARIANCE: 8` — Asymmetric layouts, no centered hero
- `MOTION_INTENSITY: 6` — Fluid spring animations, scroll-triggered reveals
- `VISUAL_DENSITY: 4` — Daily app mode, balanced whitespace

**Color Palette:**
- Background: `#f8f7f4` (warm off-white)
- Text primary: `#111111` (off-black, never pure #000)
- Text secondary: `#777777`
- Accent: `#2d6a4f` (Forest Green / Sage)
- Accent light: `#e8f5ee`
- Dark section bg: `#111111`
- Border: `#e8e4de`
- Card surface: `#ffffff`

**Typography:**
- Headlines: `Cabinet Grotesk` — weight 800, `tracking-tight`, `leading-none`
- Italic accents: `Cabinet Grotesk` weight 300 italic for contrast
- Body: `Outfit` — weight 400, `leading-relaxed`
- Labels: uppercase, `letter-spacing: 4px`, size `text-[9px]` or `text-[10px]`
- NO Inter font (taste-skill ban)

**Icons:** `@phosphor-icons/react`, strokeWidth `1.5`

---

## 3. Tech Stack

- **Framework:** Next.js 14 (App Router, Server Components)
- **Styling:** Tailwind CSS v3
- **Animation:** Framer Motion (no GSAP mixing)
- **Email:** Resend (requires `app/api/send/route.ts` to protect API key — never expose to client)
- **Fonts:** Cabinet Grotesk via Fontshare CDN (`next/font/local` with downloaded `.woff2`) + Outfit via `next/font/google`
- **Icons:** @phosphor-icons/react
- **Deployment:** Vercel

---

## 4. Architecture — Single Page + Morphing Modals

One single page (`app/page.tsx`) with scroll-based navigation. No routing except for `/impressum` and `/datenschutz` (legal requirement).

Portfolio projects open as Framer Motion morphing modals (using `layoutId`) — the card expands into a full-screen overlay with project details and live link. No separate routes.

### Component Structure

```
app/
  page.tsx               # Main single page
  layout.tsx             # Root layout, fonts, metadata (title, description, OG image)
  impressum/page.tsx     # Legal
  datenschutz/page.tsx   # Legal
  api/send/route.ts      # Resend API route (server-side, protects API key)
components/
  layout/
    Navbar.tsx           # Fixed nav, glassmorphic on scroll
    Footer.tsx           # Dark minimal footer
  sections/
    Hero.tsx             # Split layout hero
    About.tsx            # About me section
    Portfolio.tsx        # Project grid + modal trigger
    Reviews.tsx          # Dark section with marquee
    Contact.tsx          # Split contact form
  ui/
    ProjectCard.tsx      # Portfolio card (triggers modal)
    ProjectModal.tsx     # Morphing full-screen modal
    ReviewCard.tsx       # Testimonial card
    ContactForm.tsx      # Form with validation (client component)
    Marquee.tsx          # Infinite scroll marquee
```

---

## 5. Section Specifications

### 5.1 Navbar
**Must be `"use client"`** — uses `useScroll` from Framer Motion for glassmorphic state.

- Fixed, `z-50`
- Logo: "J. **Studio**" (accent on "Studio")
- Links: Über mich · Projekte · Kontakt (smooth scroll anchors) — hidden on mobile
- CTA button: "Gespräch starten" → scrolls to contact — hidden on mobile (`hidden md:block`)
- On scroll >50px: `backdrop-blur-md bg-[#f8f7f4]/80` + `border-b border-[#e8e4de]` (via `useScroll`)
- **Mobile:** hamburger icon (Phosphor `List`), click opens full-screen overlay (`bg-[#f8f7f4] z-50`), links stacked vertically, overlay slides in from right with Framer Motion

### 5.2 Hero Section
**Layout:** CSS Grid, `grid-cols-1 md:grid-cols-[1.1fr_0.9fr]`, `min-h-[100dvh]`

**Mobile:** Single column. Right column (floating project cards) stacks below text at `md:` breakpoint. On mobile the decorative cards are hidden (`hidden md:flex`) to keep the layout clean.

**Left column (text):**
- Eyebrow label: "Web-Agentur · Allgäu" in accent green
- Headline (3 lines): "Websites für / *lokale* / Dienstleister."
  - Line 2 uses italic + weight 300 for contrast
- Body copy: "Kein Marketing-Bla-Bla. Einfach eine professionelle Web-Präsenz, die neue Kunden bringt — zu einem fairen Preis."
- CTAs: Primary "Projekte ansehen" (dark) + Secondary "Über mich →" (green underline)
- Social proof: stacked avatars + "Vertrauen von lokalen Betrieben im Allgäu"

**Right column (visual):**
- Background: `#f0ede8`
- Two floating project cards, one rotated 3deg, layered with `z-index`
- Decorative circles (green, low opacity)
- Subtle parallax on scroll (Framer Motion `useScroll` + `useTransform`)

**Animations (Framer Motion):**
- Left column: staggered fade-up on mount (`staggerChildren: 0.1`)
- Right column cards: slide in from right with spring (`stiffness: 80, damping: 20`)
- Spring physics on all interactive elements

### 5.3 About Section
**Layout:** CSS Grid, `grid-cols-1 md:grid-cols-[0.9fr_1.1fr]`

**Mobile:** Single column. Stats and photo stack above text.

**Left column:**
- Photo: `rounded-2xl`, responsive fluid size — `w-full aspect-[3/4]` (portrait) on desktop, max ~320px wide
- Three stat blocks separated by `border-t`:
  - `2+` Projekte abgeschlossen
  - `100%` Zufriedene Kunden (accent green)
  - `Fair` Preise ohne Überraschungen

**Right column:**
- Eyebrow: "Wer steckt dahinter"
- Headline: "Hi, ich bin James. / *Webdesigner aus dem Allgäu.*"
- Two paragraphs of honest, direct copy
- CTA: "Jetzt Kontakt aufnehmen" → scroll to contact

**Scroll animation:** Section fades in + slides up when entering viewport (`whileInView`, `once: true`)

### 5.4 Portfolio Section
**Grid:** `grid-cols-1 md:grid-cols-[1.4fr_1fr]` (asymmetric, taste-skill Rule 3 & 7)

**Mobile:** Single column, all cards full-width.

**Project cards:**
- Card 1 (large): Carwellness Allgäu — dark gradient preview, "Live" badge (green)
- Card 2 (small): Alltec Anhängervermietung — green-tinted preview, "In Arbeit" badge
- Card 3 (full-width): "Dein Betrieb könnte hier stehen" — dashed border CTA

**Tech tags:** pill-shaped, `bg-[#f0f0f0]` default, `bg-[#e8f5ee] text-[#2d6a4f]` for local projects

**Morphing Modal (Framer Motion `layoutId`):**
- Card has `layoutId="project-{id}"`
- Click triggers `AnimatePresence` showing full-screen modal
- Modal contains: project screenshot/preview, description, tech stack, live link button
- Close with ESC (`keydown` listener on `document`) or click backdrop
- Scroll lock: `document.body.style.overflow = 'hidden'` on open, restored on close
- iOS: `touch-action: none` on modal backdrop to prevent background scroll on Safari
- `useEffect` cleanup removes listener and restores scroll on unmount
- Keyboard focus trapped inside modal for accessibility (WCAG)

**Scroll animation:** Cards stagger in from bottom (`staggerChildren: 0.15`)

### 5.5 Reviews Section
**Background:** `#111111` (dark contrast break)

**Header:**
- Eyebrow: "Was Kunden sagen"
- Headline: "Echte Ergebnisse. / *Echte Menschen.*"

**Infinite Marquee:**
- CSS keyframe animation (`animation: marquee linear infinite` on `transform: translateX`) — CSS approach is intentional here for performance; the Framer Motion rule applies to interactive/scroll animations only
- Duplicated set of cards for seamless loop
- Pauses on hover (`animation-play-state: paused`)
- 5 placeholder reviews with realistic German names + local professions
- Accent green stars (`★★★★★`)

**Scroll animation:** Section header fades in, marquee starts after 300ms delay

### 5.6 Contact Section
**Layout:** CSS Grid `grid-cols-1 md:grid-cols-2`

**Mobile:** Single column, info block stacks above form.

**Left column:**
- Headline: "Lass uns reden. / *Kein Druck.*"
- Short reassuring copy
- Three contact info blocks (email, phone, location) in `bg-[#f0ede8]` rounded cards
- All data is placeholder until real data provided

**Right column — ContactForm (Client Component `"use client"`):**
- Fields: Name, Email, Nachricht (textarea)
- Labels sit above inputs (taste-skill Rule 6)
- Validation: required fields, email format
- Error states: inline below input, red text
- Submit: calls `app/api/send/route.ts` (Resend)
- Success state: form replaced with confirmation message + animation
- Loading state: button shows shimmer

**Footer:**
- Dark `#111111` background
- Logo + copyright + Impressum + Datenschutz links
- Social icon placeholders (LinkedIn, Instagram)

---

## 6. Scroll Animation System

All scroll-triggered animations use Framer Motion `whileInView` with `viewport={{ once: true, amount: 0.2 }}`:

```tsx
// Standard section entry
initial={{ opacity: 0, y: 40 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}

// Staggered children
variants={{
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
}}
transition={{ type: "spring", stiffness: 100, damping: 20 }}
```

Navbar glassmorphism uses `useScroll` + conditional class swap (no JS scroll listener).

---

## 7. Performance Rules (taste-skill Section 5)

- All perpetual animations (marquee, hover effects) isolated in their own Client Components
- No `useState` for continuous animations — use `useMotionValue`
- Only animate `transform` and `opacity` — never `top/left/width/height`
- `min-h-[100dvh]` for hero — never `h-screen`
- Grain/noise filters only on `fixed pointer-events-none` pseudo-elements
- `will-change: transform` used sparingly

---

## 8. Tailwind Config Extensions

`tailwind.config.js` must extend the theme with named tokens:

```js
theme: {
  extend: {
    colors: {
      background: '#f8f7f4',
      accent: { DEFAULT: '#2d6a4f', light: '#e8f5ee' },
      border: '#e8e4de',
      surface: '#f0ede8',
    },
    fontFamily: {
      display: ['Cabinet Grotesk', 'sans-serif'],
      body: ['Outfit', 'sans-serif'],
    },
  }
}
```

---

## 9. SEO Metadata (`layout.tsx`)

```tsx
export const metadata: Metadata = {
  title: 'J. Studio — Websites für lokale Dienstleister im Allgäu',
  description: 'Professionelle Websites für Handwerker und lokale Betriebe. Kein Marketing-Bla-Bla, faire Preise, direkte Kommunikation.',
  openGraph: {
    title: 'J. Studio',
    description: 'Websites für lokale Dienstleister im Allgäu.',
    url: 'https://j-studio.de',
    siteName: 'J. Studio',
    locale: 'de_DE',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}
```

---

## 10. Content (Placeholder Data)

**Contact:**
- Email: hallo@j-studio.de
- Phone: +49 (0) 831 XXX-XXXX
- Location: Allgäu, Bayern

**Projects:**
1. Carwellness Allgäu — https://www.carwellness-allgaeu.de/ — Live
2. Alltec Anhängervermietung — https://alltec-anhaengervermietung.vercel.app/ — In Arbeit

**Reviews (5 placeholder):**
Realistic German names, local Allgäu professions, organic copy — no "John Doe", no "99.99%" (taste-skill Rule)

---

## 11. Legal Requirements

- `/impressum` page (Pflicht für DE)
- `/datenschutz` page (DSGVO)
- Cookie notice (minimal — only if analytics added later)

---

## 12. Verification

1. `npm run dev` — site loads at localhost:3000
2. All 5 sections scroll smoothly with animations (Hero, About, Portfolio, Reviews, Contact)
3. Portfolio modal opens/closes on click with spring animation
4. Contact form validates and shows error/success states
5. Responsive: mobile layout collapses to single column
6. Navbar becomes glassmorphic after scroll
7. Marquee loops seamlessly, pauses on hover
8. No `h-screen` usage — only `min-h-[100dvh]`
9. No Inter font loaded
10. No emojis anywhere in code or content
