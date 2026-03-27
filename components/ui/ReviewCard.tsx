interface ReviewCardProps {
  name: string
  role: string
  text: string
  initials: string
}

export default function ReviewCard({ name, role, text, initials }: ReviewCardProps) {
  return (
    <div
      className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 min-w-[280px] max-w-[320px] flex-shrink-0 transition-all duration-300 hover:border-[rgba(124,58,237,0.4)]"
      style={{ transition: "box-shadow 0.3s" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 24px rgba(124,58,237,0.2)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
    >
      <div className="gradient-text text-sm mb-3" aria-label="5 von 5 Sternen">
        &#9733;&#9733;&#9733;&#9733;&#9733;
      </div>

      <p className="font-body text-sm text-muted leading-relaxed mb-4">{text}</p>

      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#c026d3] text-white font-display font-bold text-xs flex items-center justify-center flex-shrink-0"
          aria-hidden="true"
        >
          {initials}
        </div>
        <div>
          <p className="font-body text-sm font-medium text-foreground leading-tight">{name}</p>
          <p className="font-body text-xs text-muted leading-tight">{role}</p>
        </div>
      </div>
    </div>
  )
}
