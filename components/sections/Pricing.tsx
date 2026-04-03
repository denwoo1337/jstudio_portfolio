"use client";

import { motion, type Variants } from "framer-motion";
import BorderGlow from "@/components/BorderGlow";

type Package = {
  id: string;
  name: string;
  price: string;
  pricePrefix: string;
  tagline: string;
  vatNote: string;
  features: string[];
  featured: boolean;
  featuredLabel?: string;
  ctaLabel: string;
  ctaPrimary: boolean;
};

type Addon = {
  icon: string;
  name: string;
  price: string;
};

const packages: Package[] = [
  {
    id: "starter",
    name: "Starter",
    price: "890",
    pricePrefix: "ab",
    tagline: "Landingpage & One-Pager",
    vatNote: "zzgl. MwSt.",
    features: [
      "Responsive Design (Mobil & Desktop)",
      "Bis zu 3 Abschnitte / Sektionen",
      "Kontaktformular",
      "Basis-SEO (Meta, Sitemap)",
      "1 Korrekturschleife",
    ],
    featured: false,
    ctaLabel: "Anfragen",
    ctaPrimary: false,
  },
  {
    id: "business",
    name: "Business",
    price: "2.490",
    pricePrefix: "ab",
    tagline: "Mehrseitige Unternehmenswebsite",
    vatNote: "zzgl. MwSt.",
    features: [
      "Alles aus Starter",
      "Bis zu 7 Seiten",
      "Individuelles Konzept & Design",
      "CMS (eigene Inhaltspflege)",
      "SEO-Optimierung",
      "Google Maps / Kontakt-Integration",
      "2 Korrekturschleifen",
    ],
    featured: true,
    featuredLabel: "Meistgewählt",
    ctaLabel: "Jetzt anfragen",
    ctaPrimary: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: "4.900",
    pricePrefix: "ab",
    tagline: "Individualprojekt & komplexe Anforderungen",
    vatNote: "zzgl. MwSt.",
    features: [
      "Alles aus Business",
      "Unbegrenzte Seiten",
      "Buchungssystem / E-Commerce mögl.",
      "Performance- & Core Web Vitals-Opt.",
      "Analytics-Setup",
      "30 Tage Support nach Launch",
      "3 Korrekturschleifen",
    ],
    featured: false,
    ctaLabel: "Anfragen",
    ctaPrimary: false,
  },
];

const addons: Addon[] = [
  { icon: "🔍", name: "SEO-Paket", price: "ab 249 €" },
  { icon: "✍️", name: "Blog einrichten", price: "179 €" },
  { icon: "⚡", name: "Speed-Optimierung", price: "149 €" },
  { icon: "🎨", name: "Logo & Branding", price: "ab 299 €" },
  { icon: "📍", name: "Google Business", price: "79 €" },
  { icon: "🍪", name: "Cookie & Datenschutz", price: "99 €" },
  { icon: "📊", name: "Analytics-Setup", price: "99 €" },
  { icon: "📧", name: "Newsletter", price: "149 €" },
];

const cardContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const addonContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const addonVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export default function Pricing() {
  const handleContactScroll = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="preise"
      className="relative z-10 py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-[var(--surface)] overflow-hidden"
    >
      {/* Background blobs */}
      <div
        className="absolute top-[-60px] right-[-60px] w-[350px] h-[350px] rounded-full opacity-20 bg-[radial-gradient(circle,#0ea5e9_0%,transparent_70%)] blur-[100px] animate-blob-float pointer-events-none"
        style={{ animationDelay: "-4s" }}
      />
      <div
        className="absolute bottom-[-40px] left-[-40px] w-[300px] h-[300px] rounded-full opacity-15 bg-[radial-gradient(circle,#06b6d4_0%,transparent_70%)] blur-[100px] animate-blob-float pointer-events-none"
        style={{ animationDelay: "-10s" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
        >
          <p
            className="font-body text-[10px] uppercase gradient-text"
            style={{ letterSpacing: "4px" }}
          >
            PREISE & PAKETE
          </p>
          <h2 className="font-display font-extrabold tracking-tighter leading-none text-4xl md:text-5xl mt-4 uppercase">
            Transparente
            <br />
            <span className="gradient-text-animated">Preise.</span>
          </h2>
          <p className="mt-6 text-base text-muted font-body leading-relaxed">
            Klare Festpreise — kein Stundensatz-Roulette, keine versteckten Kosten.
          </p>
        </motion.div>

        {/* Package cards */}
        <motion.div
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              variants={cardVariants}
              className="relative"
            >
              {/* Featured badge – outside BorderGlow to avoid overflow-clip */}
              {pkg.featured && pkg.featuredLabel && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 z-10 px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest text-white whitespace-nowrap"
                  style={{
                    top: "-14px",
                    background: "linear-gradient(90deg, #a855f7, #ec4899)",
                  }}
                >
                  {pkg.featuredLabel}
                </div>
              )}

              <BorderGlow
                backgroundColor="#12121e"
                borderRadius={16}
                glowColor="40 80 80"
                glowRadius={53}
                glowIntensity={1.8}
                coneSpread={16}
                edgeSensitivity={30}
                animated={pkg.featured}
                colors={["#c084fc", "#f472b6", "#38bdf8"]}
                className="flex flex-col p-7 h-full"
              >
                {/* Package name */}
                <p
                  className="font-body text-[11px] uppercase text-muted font-bold"
                  style={{ letterSpacing: "2px" }}
                >
                  {pkg.name}
                </p>

                {/* Price */}
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-body text-sm text-muted">{pkg.pricePrefix}</span>
                  <span className="font-display font-extrabold text-5xl gradient-text-animated leading-none">
                    {pkg.price}
                  </span>
                  <span className="font-body text-lg text-muted ml-1">€</span>
                </div>

                {/* Tagline */}
                <p className="mt-2 font-body text-sm text-muted leading-snug">
                  {pkg.tagline}
                  <br />
                  <span className="text-xs opacity-60">{pkg.vatNote}</span>
                </p>

                {/* Divider */}
                <hr className="my-5 border-[var(--border)]" />

                {/* Features */}
                <ul className="flex-1 space-y-2.5">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 font-body text-sm text-muted"
                    >
                      <span className="text-sky-400 font-bold mt-0.5 flex-shrink-0">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-7">
                  {pkg.ctaPrimary ? (
                    <button
                      onClick={handleContactScroll}
                      className="gradient-btn font-body text-sm px-6 py-3 rounded-full w-full"
                    >
                      {pkg.ctaLabel}
                    </button>
                  ) : (
                    <button
                      onClick={handleContactScroll}
                      className="w-full font-body text-sm text-muted hover:text-foreground transition-colors py-3"
                    >
                      {pkg.ctaLabel}
                    </button>
                  )}
                </div>
              </BorderGlow>
            </motion.div>
          ))}
        </motion.div>

        {/* Add-ons */}
        <div className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
            className="text-center mb-8"
          >
            <h3 className="font-display font-bold text-xl md:text-2xl text-foreground uppercase tracking-tight">
              Extraleistungen dazubuchen
            </h3>
            <p className="mt-2 font-body text-sm text-muted">
              Ergänze dein Paket mit passenden Add-ons
            </p>
          </motion.div>

          <motion.div
            variants={addonContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {addons.map((addon) => (
              <motion.div
                key={addon.name}
                variants={addonVariants}
              >
                <BorderGlow
                  backgroundColor="#12121e"
                  borderRadius={12}
                  glowColor="40 80 80"
                  glowRadius={53}
                  glowIntensity={1.8}
                  coneSpread={16}
                  edgeSensitivity={30}
                  colors={["#c084fc", "#f472b6", "#38bdf8"]}
                  className="p-4 text-center"
                >
                  <div className="text-2xl mb-2">{addon.icon}</div>
                  <p className="font-body text-sm font-semibold text-foreground">{addon.name}</p>
                  <p className="font-display font-bold text-base gradient-text-animated mt-1">
                    {addon.price}
                  </p>
                </BorderGlow>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Footer note */}
        <p className="mt-10 text-center font-body text-xs text-muted opacity-60">
          Alle Preise zzgl. MwSt. · Individuelle Projekte auf Anfrage · Festpreisgarantie
        </p>
      </div>
    </section>
  );
}
