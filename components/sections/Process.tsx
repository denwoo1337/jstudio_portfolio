"use client";

import { motion, type Variants } from "framer-motion";

type ProcessStep = {
  id: string;
  icon: string;
  label: string;
  title: string;
  body: string;
};

const steps: ProcessStep[] = [
  {
    id: "01",
    icon: "📞",
    label: "Schritt 01",
    title: "Erstgespräch",
    body: "Ruf mich an, schreib eine Nachricht oder E-Mail. Erzähl mir kurz, was du dir vorstellst — kein Formular, kein Stress.",
  },
  {
    id: "02",
    icon: "📋",
    label: "Schritt 02",
    title: "Angebot & Konzept",
    body: "Du bekommst ein klares Angebot mit Festpreis und Zeitplan. Keine versteckten Kosten, keine bösen Überraschungen.",
  },
  {
    id: "03",
    icon: "✏️",
    label: "Schritt 03",
    title: "Design & Umsetzung",
    body: "Ich designe und baue deine Website. Du gibst Feedback, ich passe an — bis alles genau so ist, wie du es dir vorstellst.",
  },
  {
    id: "04",
    icon: "🔍",
    label: "Schritt 04",
    title: "Feinschliff & Freigabe",
    body: "Letzte Anpassungen, Tests auf Handy, Tablet und Desktop. Alles läuft perfekt — du gibst das OK.",
  },
  {
    id: "05",
    icon: "🚀",
    label: "Schritt 05",
    title: "Launch & Übergabe",
    body: "Deine neue Website geht live. Ich kümmere mich um Domain und Hosting — du bekommst alle Zugänge übergeben.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.65 },
  },
};

const stepVariants: Variants = {
  hidden: {},
  visible: {},
};

const dotVariants: Variants = {
  hidden: { opacity: 0, scale: 0.4 },
  visible: {
    opacity: 1,
    scale: 1,
    boxShadow: [
      "0 0 0px 0px rgba(14,165,233,0)",
      "0 0 20px 6px rgba(14,165,233,0.55)",
      "0 0 10px 2px rgba(14,165,233,0.2)",
    ],
  },
};

const dotTransition = {
  duration: 0.5,
  ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
  boxShadow: { duration: 0.5, times: [0, 0.6, 1] },
};

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

const contentTransition = {
  duration: 0.45,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

const lineVariants: Variants = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1 },
};

const lineTransition = {
  duration: 0.4,
  ease: "easeInOut" as const,
  delay: 0.3,
};

export default function Process() {
  const handleContactScroll = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="process"
      className="relative z-10 py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-[var(--surface)] overflow-hidden"
    >
      {/* Background blobs */}
      <div
        className="absolute top-[-60px] left-[-60px] w-[350px] h-[350px] rounded-full opacity-20 bg-[radial-gradient(circle,#0ea5e9_0%,transparent_70%)] blur-[100px] animate-blob-float pointer-events-none"
        style={{ animationDelay: "-2s" }}
      />
      <div
        className="absolute bottom-[-40px] right-[-40px] w-[300px] h-[300px] rounded-full opacity-15 bg-[radial-gradient(circle,#06b6d4_0%,transparent_70%)] blur-[100px] animate-blob-float pointer-events-none"
        style={{ animationDelay: "-8s" }}
      />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <p
          className="font-body text-[10px] uppercase gradient-text"
          style={{ letterSpacing: "4px" }}
        >
          WIE ES LÄUFT
        </p>

        <h2 className="font-display font-extrabold tracking-tighter leading-none text-4xl md:text-5xl mt-4 uppercase">
          Von der Idee
          <br />
          <span className="gradient-text-animated">zur fertigen Website.</span>
        </h2>

        <p className="mt-6 text-base text-muted font-body leading-relaxed">
          Kein komplizierter Prozess. Keine langen Wartezeiten.
          <br />
          Nur das, was du wirklich brauchst.
        </p>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 md:mt-16"
        >
          {steps.map((step, i) => {
            const isLast = i === steps.length - 1;
            return (
              <motion.div
                key={step.id}
                variants={stepVariants}
                className="flex flex-row gap-4 md:gap-6 items-start"
              >
                {/* Left column: dot + line */}
                <div className="flex flex-col items-center w-10 md:w-12 flex-shrink-0">
                  <motion.div
                    variants={dotVariants}
                    transition={dotTransition}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#0ea5e9] to-[#06b6d4] flex items-center justify-center text-white flex-shrink-0"
                    style={{ fontSize: "18px" }}
                  >
                    {step.icon}
                  </motion.div>
                  {!isLast && (
                    <motion.div
                      variants={lineVariants}
                      transition={lineTransition}
                      className="w-0.5 flex-1 mt-1"
                      style={{
                        background:
                          "linear-gradient(to bottom, rgba(14,165,233,0.5), transparent)",
                        transformOrigin: "top",
                        minHeight: "48px",
                      }}
                    />
                  )}
                </div>

                {/* Right column: content */}
                <motion.div
                  variants={contentVariants}
                  transition={contentTransition}
                  className={`flex-1 pt-1 ${isLast ? "pb-0" : "pb-8"}`}
                >
                  <p
                    className="font-body text-[10px] uppercase text-muted"
                    style={{ letterSpacing: "3px" }}
                  >
                    {step.label}
                  </p>
                  <h3 className="font-display font-bold text-lg md:text-xl text-foreground mt-1 mb-2">
                    {step.title}
                  </h3>
                  <p className="font-body text-sm md:text-base text-muted leading-relaxed">
                    {step.body}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex items-center gap-4"
        >
          <button
            onClick={handleContactScroll}
            className="gradient-btn font-body text-sm px-6 py-3 rounded-full"
          >
            Jetzt Kontakt aufnehmen
          </button>
          <span className="font-body text-sm text-muted">
            Kostenlos &amp; unverbindlich
          </span>
        </motion.div>
      </div>
    </section>
  );
}
