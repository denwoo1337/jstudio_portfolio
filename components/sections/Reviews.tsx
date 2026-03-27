"use client"

import { motion } from "framer-motion"
import Marquee from "@/components/ui/Marquee"
import ReviewCard from "@/components/ui/ReviewCard"

const reviews = [
  {
    name: "Markus Keller",
    role: "Fliesenleger, Kempten",
    initials: "MK",
    text: "James hat unsere Website komplett neu gemacht. Endlich sieht sie so aus, wie wir uns das vorgestellt haben. Kunden sprechen uns direkt drauf an.",
  },
  {
    name: "Sandra Braun",
    role: "Massagepraxis, Sonthofen",
    initials: "SB",
    text: "Unkompliziert, schnell und fair im Preis. Genau das, was ich gesucht habe. Meine Buchungsanfragen haben sich verdoppelt.",
  },
  {
    name: "Thomas Huber",
    role: "Elektriker, Füssen",
    initials: "TH",
    text: "Ich war skeptisch, ob sich eine neue Website lohnt. Mittlerweile kommen über 60% meiner Neukunden über die Seite.",
  },
  {
    name: "Anna Müller",
    role: "Gärtnerei, Memmingen",
    initials: "AM",
    text: "Sehr professionelle Zusammenarbeit. James hat alles genau so umgesetzt, wie ich es mir gewünscht habe. Klare Empfehlung!",
  },
  {
    name: "Felix Wagner",
    role: "Schreiner, Kaufbeuren",
    initials: "FW",
    text: "Endlich eine Website, die mein Handwerk richtig zeigt. Die Reaktion meiner Kunden war sofort positiv. Danke James!",
  },
]

export default function Reviews() {
  return (
    <section id="reviews" className="relative z-10 py-24 md:py-32 bg-[var(--surface)] overflow-hidden">
      {/* Background blob */}
      <div
        className="absolute top-[-80px] right-[-80px] w-[500px] h-[500px] rounded-full opacity-20 bg-[radial-gradient(circle,#7c3aed_0%,transparent_70%)] blur-[110px] animate-blob-float pointer-events-none"
        style={{ animationDelay: "-3s" }}
      />
      <motion.div
        className="px-6 md:px-12 lg:px-20 mb-16 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <p
          className="font-body uppercase text-[10px] tracking-[4px] gradient-text mb-4"
          aria-label="Was Kunden sagen"
        >
          WAS KUNDEN SAGEN
        </p>

        <h2 className="font-display font-extrabold tracking-tighter leading-none text-4xl md:text-6xl text-foreground uppercase">
          Echte Ergebnisse.
        </h2>
        <p className="font-display font-light italic text-4xl md:text-5xl tracking-tighter leading-none gradient-text mt-1">
          Echte Menschen.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
      >
        <Marquee duration="40s">
          {reviews.map((review) => (
            <ReviewCard
              key={review.name}
              name={review.name}
              role={review.role}
              text={review.text}
              initials={review.initials}
            />
          ))}
        </Marquee>
      </motion.div>
    </section>
  )
}
