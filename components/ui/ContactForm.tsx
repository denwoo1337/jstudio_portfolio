"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "@phosphor-icons/react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Bitte gib deinen Namen ein.";
  if (!data.email.trim()) {
    errors.email = "Bitte gib deine E-Mail-Adresse ein.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Bitte gib eine gültige E-Mail-Adresse ein.";
  }
  if (!data.message.trim()) errors.message = "Bitte schreib uns eine Nachricht.";
  return errors;
}

const inputClass =
  "w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-3 font-body text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-[var(--accent-1)] focus:ring-1 focus:ring-[var(--accent-1)]/40 transition-colors duration-200";

const labelClass = "block font-body text-xs uppercase tracking-[3px] text-muted mb-2";

const errorClass = "mt-1.5 font-body text-xs text-red-500";

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setServerError(null);

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Fehler beim Senden.");
      }

      setSuccess(true);
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Etwas ist schiefgelaufen. Bitte versuche es erneut."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence mode="wait">
      {success ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="flex flex-col items-center justify-center text-center py-12 gap-4"
        >
          <CheckCircle size={48} weight="fill" className="gradient-text" />
          <h3 className="font-display font-extrabold text-2xl text-foreground tracking-tight">
            Nachricht angekommen!
          </h3>
          <p className="font-body text-sm text-muted max-w-xs">
            Ich melde mich innerhalb von 24 Stunden bei dir. Bis bald!
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit}
          noValidate
          className="space-y-5"
        >
          {/* Name */}
          <div>
            <label htmlFor="name" className={labelClass}>
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Dein Name"
              className={inputClass}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <p id="name-error" className={errorClass}>
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className={labelClass}>
              E-Mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="deine@email.de"
              className={inputClass}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className={errorClass}>
                {errors.email}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className={labelClass}>
              Nachricht
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Erzähl mir von deinem Betrieb..."
              rows={5}
              className={`${inputClass} resize-none`}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message && (
              <p id="message-error" className={errorClass}>
                {errors.message}
              </p>
            )}
          </div>

          {serverError && (
            <p className="font-body text-xs text-red-500">{serverError}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full relative overflow-hidden gradient-btn font-body text-sm px-6 py-3.5 rounded-full disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <motion.span
                  className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                />
                Wird gesendet...
              </span>
            ) : (
              "Nachricht senden"
            )}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
