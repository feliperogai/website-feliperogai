'use client'

import Image from "next/image"
import Link from "next/link"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { useLanguageContext } from "../contexts/LanguageContext"

const socials = [
  { label: "GitHub", href: "https://github.com/feliperogai" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/feliperogai/" },
  { label: "Instagram", href: "https://www.instagram.com/feliperogai/" },
]

const marquee = [
  "Next.js", "React", "TypeScript", "Python", "Node.js", "AI Agents", "LangChain", "OpenAI API",
  "PostgreSQL", "FastAPI", "Tailwind CSS", "AWS", "Docker", "Mobile", "SEO",
]

/** Selo giratório com o cargo escrito em círculo. */
function RotatingBadge({ text }: { text: string }) {
  return (
    <div className="relative h-28 w-28 sm:h-32 sm:w-32">
      <svg viewBox="0 0 100 100" className="h-full w-full animate-spin" style={{ animationDuration: "18s" }} aria-hidden="true">
        <defs>
          <path id="badge-circle" d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1-76 0" />
        </defs>
        <text className="fill-foreground font-mono uppercase" fontSize="8.4">
          <textPath href="#badge-circle" textLength="236" lengthAdjust="spacing">{text}</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 m-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <ArrowDownRight className="h-6 w-6" />
      </div>
    </div>
  )
}

export default function Hero() {
  const { t } = useLanguageContext()

  const stats = [
    { value: "10+", label: t("statProjects") },
    { value: "6", label: t("statSites") },
    { value: "1", label: t("statApps") },
    { value: "13+", label: t("statTech") },
  ]

  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-32">
      {/* fundo: grade + brilho laranja */}
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <div className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-primary/20 blur-[140px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8">
        <div className="lg:col-span-7">
          <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-xs text-muted-foreground backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {t("heroStatus")}
          </div>

          <h1 className="text-[2.75rem] font-semibold leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-7xl xl:text-[5.4rem]">
            {t("heroTitleA")}{" "}
            <span className="font-serif font-normal italic tracking-[-0.02em] text-primary">{t("heroTitleEmphasis")}</span>{" "}
            {t("heroTitleB")}
          </h1>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">{t("heroSubtitle")}</p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              {t("ctaProjects")}
              <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold transition-colors hover:border-foreground"
            >
              {t("ctaContact")}
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {socials.map((s) => (
              <Link key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1 transition-colors hover:text-foreground">
                {s.label}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>

        {/* Retrato */}
        <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-primary">
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/25 to-transparent" />
            <Image
              src="/felipe-rogai.webp"
              alt="Felipe Rogai"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover object-bottom"
            />
          </div>

          <div className="absolute -left-3 top-10 rounded-2xl border border-border bg-card/90 px-4 py-3 shadow-2xl backdrop-blur sm:-left-8">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{t("heroCardLabel")}</p>
            <p className="mt-1 text-sm font-semibold">{t("heroCardValue")}</p>
          </div>

          <div className="absolute -right-2 bottom-24 rounded-2xl border border-border bg-card/90 p-4 font-mono text-[11px] leading-relaxed shadow-2xl backdrop-blur sm:-right-6">
            <p className="text-muted-foreground">
              <span className="text-primary">$</span> felipe --build
            </p>
            <p className="text-emerald-400">✓ design</p>
            <p className="text-emerald-400">✓ code</p>
            <p className="text-emerald-400">
              ✓ ship<span className="ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 animate-blink bg-primary" />
            </p>
          </div>

          <div className="absolute -bottom-10 -left-4 hidden sm:block">
            <RotatingBadge text={t("heroBadge")} />
          </div>
        </div>
      </div>

      {/* Números */}
      <div className="relative mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 border-y border-border md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col-reverse px-2 py-8 sm:px-6 ${i % 2 === 1 ? "border-l" : ""} ${i >= 2 ? "border-t md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""} border-border`}
            >
              <dt className="mt-2 text-sm text-muted-foreground">{s.label}</dt>
              <dd className="text-4xl font-semibold tracking-tight sm:text-5xl">
                {s.value.replace("+", "")}
                {s.value.includes("+") && <span className="text-primary">+</span>}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Faixa de tecnologias */}
      <div className="relative mt-16 overflow-hidden py-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
          {[...marquee, ...marquee].map((item, i) => (
            <span key={i} className="flex items-center gap-12 text-2xl font-semibold tracking-tight text-muted-foreground/60 sm:text-3xl">
              {item}
              <span className="text-primary">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
