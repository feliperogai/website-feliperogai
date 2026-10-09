/** Monograma "fr" com cursor de terminal, o mesmo desenho do favicon (app/icon.svg). */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="15" fill="hsl(var(--foreground))" />
      <g
        transform="translate(-1.5 0)"
        fill="none"
        stroke="hsl(var(--background))"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 47V24.5a7.5 7.5 0 0 1 7.5-7.5H29" />
        <path d="M13.5 29H26" />
        <path d="M34 29v18M34 37a8 8 0 0 1 8-8h1.5" />
      </g>
      <rect x="44.5" y="42" width="9" height="6" rx="1.5" fill="hsl(var(--primary))" className="animate-blink" />
    </svg>
  )
}
