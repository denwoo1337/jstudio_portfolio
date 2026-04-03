"use client";

import { motion, type Variants } from "framer-motion";
import { Envelope, Phone, MapPin } from "@phosphor-icons/react";
import ContactForm from "@/components/ui/ContactForm";

const contactInfo = [
  {
    icon: Envelope,
    label: "E-Mail",
    value: "hallo@j-studio.de",
    href: "mailto:hallo@j-studio.de",
  },
  {
    icon: Phone,
    label: "Telefon",
    value: "+49 (0) 831 XXX-XXXX",
    href: "tel:+4983100000000",
  },
  {
    icon: MapPin,
    label: "Standort",
    value: "Allgäu, Bayern",
    href: null,
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export default function Contact() {
  return (
    <section id="contact" className="relative z-10 py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-[var(--background)] overflow-hidden">
      {/* Background blob */}
      <div
        className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full opacity-20 bg-[radial-gradient(circle,#06b6d4_0%,transparent_70%)] blur-[120px] animate-blob-float pointer-events-none"
        style={{ animationDelay: "-8s" }}
      />
      <div
        className="absolute top-[-60px] right-[-60px] w-[350px] h-[350px] rounded-full opacity-15 bg-[radial-gradient(circle,#0ea5e9_0%,transparent_70%)] blur-[90px] animate-blob-float pointer-events-none"
        style={{ animationDelay: "-15s" }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 relative z-10"
      >
        <p className="font-body text-[10px] uppercase tracking-[4px] gradient-text mb-4">
          KONTAKT
        </p>
        <h2 className="font-display font-extrabold tracking-tighter leading-none text-4xl md:text-6xl text-foreground uppercase">
          Lass uns reden.{" "}
          <span className="font-light italic text-muted normal-case text-3xl md:text-4xl">
            Kein Bullshit.
          </span>
        </h2>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 relative z-10">
        {/* Left — info */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-6"
        >
          <motion.p
            variants={itemVariants}
            className="font-body text-base text-muted leading-relaxed"
          >
            Du hast eine Frage, eine Idee oder willst einfach wissen, was eine
            neue Website für deinen Betrieb kosten würde? Schreib mir — ich
            antworte innerhalb von 24 Stunden.
          </motion.p>

          <div className="space-y-3">
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <motion.div key={label} variants={itemVariants}>
                {href ? (
                  <a
                    href={href}
                    className="flex items-center gap-4 bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 hover:border-[rgba(14,165,233,0.4)] transition-all duration-200 group"
                    style={{ transition: "box-shadow 0.2s, border-color 0.2s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 20px rgba(14,165,233,0.15)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0ea5e9] to-[#06b6d4] flex items-center justify-center flex-shrink-0">
                      <Icon size={18} weight="light" className="text-white" />
                    </div>
                    <div>
                      <p className="font-body text-[10px] uppercase tracking-[3px] text-muted mb-0.5">
                        {label}
                      </p>
                      <p className="font-body text-sm text-foreground group-hover:gradient-text transition-colors">
                        {value}
                      </p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-4 bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0ea5e9] to-[#06b6d4] flex items-center justify-center flex-shrink-0">
                      <Icon size={18} weight="light" className="text-white" />
                    </div>
                    <div>
                      <p className="font-body text-[10px] uppercase tracking-[3px] text-muted mb-0.5">
                        {label}
                      </p>
                      <p className="font-body text-sm text-foreground">
                        {value}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}
