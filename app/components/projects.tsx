'use client'

import { useState, type MouseEvent, type ReactNode } from "react"
import Link from "next/link"
import { ArrowUpRight, Github, Plus } from "lucide-react"
import Reveal from "./reveal"
import { useLanguageContext } from "../contexts/LanguageContext"
import { projects, type Project, type ProjectCategory } from "../data/projects"
import type { TranslationKey } from "../i18n/translations"

type Filter = "all" | ProjectCategory

const filters: { id: Filter; label: TranslationKey }[] = [
  { id: "all", label: "filterAll" },
  { id: "web", label: "filterWeb" },
  { id: "mobile", label: "filterMobile" },
  { id: "ai", label: "filterAi" },
]

function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return url
  }
}

/** Atualiza a posição do brilho do card (.spotlight) conforme o mouse. */
function trackSpotlight(e: MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`)
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`)
}

/** Imagem remota com fallback elegante caso não carregue. */
function SafeImage({ src, alt, className, fallback }: { src?: string; alt: string; className: string; fallback: ReactNode }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) return <>{fallback}</>
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={className} />
}

function BrowserMedia({ project }: { project: Project }) {
  return (
    <div className="relative h-full overflow-hidden rounded-2xl border border-border bg-muted">
      <div className="flex items-center gap-1.5 border-b border-border bg-background/70 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-foreground/20" />
        <span className="h-2 w-2 rounded-full bg-foreground/20" />
        <span className="h-2 w-2 rounded-full bg-foreground/20" />
        {project.liveUrl && (
          <span className="ml-2 truncate font-mono text-[10px] text-muted-foreground">{hostname(project.liveUrl)}</span>
        )}
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        <SafeImage
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          fallback={
            <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/25 via-card to-card">
              <div className="bg-grid absolute inset-0" />
              <span className="relative px-6 text-center text-3xl font-semibold tracking-tight">{project.title}</span>
            </div>
          }
        />
      </div>
    </div>
  )
}

/** Card de app: mostra o logo inteiro sobre a cor de fundo do próprio logo. */
function AppMedia({ project }: { project: Project }) {
  return (
    <div className="relative h-full overflow-hidden rounded-2xl border border-border bg-muted">
      <div className="flex items-center gap-1.5 border-b border-border bg-background/70 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-foreground/20" />
        <span className="h-2 w-2 rounded-full bg-foreground/20" />
        <span className="h-2 w-2 rounded-full bg-foreground/20" />
        <span className="ml-2 truncate font-mono text-[10px] text-muted-foreground">Google Play</span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden" style={{ backgroundColor: project.logoBackground }}>
        <SafeImage
          src={project.logo}
          alt={`${project.title} logo`}
          className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          fallback={
            <div className="flex h-full w-full items-center justify-center bg-primary text-6xl font-bold text-primary-foreground">
              {project.title[0]}
            </div>
          }
        />
      </div>
    </div>
  )
}

function ProjectTile({ project, index }: { project: Project; index: number }) {
  const { t } = useLanguageContext()
  const href = project.liveUrl ?? project.githubUrl ?? "#"
  const isMobile = project.categories.includes("mobile")

  return (
    <article
      onMouseMove={trackSpotlight}
      className="spotlight group flex h-full flex-col rounded-3xl border border-border bg-card p-3 transition-colors duration-300 hover:border-foreground/25"
    >
      <Link href={href} target="_blank" rel="noopener noreferrer" className="block flex-1" aria-label={project.title}>
        {isMobile ? <AppMedia project={project} /> : <BrowserMedia project={project} />}
      </Link>

      <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="font-mono text-xs text-primary">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="mt-1 text-2xl font-semibold tracking-tight">{project.title}</h3>
          </div>
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t("visitProject")}: ${project.title}`}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border transition-all duration-300 group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground"
          >
            <ArrowUpRight className="h-5 w-5" />
          </Link>
        </div>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{t(project.descriptionKey)}</p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {tag}
            </span>
          ))}
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground hover:text-foreground"
            >
              <Github className="h-3.5 w-3.5" /> Code
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}

/** Espaço reservado para os próximos projetos. */
function NextProjectTile() {
  const { t } = useLanguageContext()
  return (
    <Link
      href="#contact"
      className="group relative flex h-full min-h-[280px] flex-col justify-between overflow-hidden rounded-3xl border border-dashed border-border p-8 transition-colors hover:border-primary"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border transition-all duration-300 group-hover:rotate-90 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
        <Plus className="h-5 w-5" />
      </div>
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-primary">{t("nextProjectLabel")}</p>
        <h3 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          {t("nextProjectTitle")} <span className="text-primary">{t("nextProjectEmphasis")}</span>
        </h3>
        <p className="mt-3 max-w-md text-sm text-muted-foreground">{t("nextProjectDescription")}</p>
      </div>
    </Link>
  )
}

export default function Projects() {
  const { t } = useLanguageContext()
  const [filter, setFilter] = useState<Filter>("all")

  const visible = filter === "all" ? projects : projects.filter((p) => p.categories.includes(filter))

  return (
    <section id="work" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <Reveal>
          <p className="eyebrow">02 — {t("projects")}</p>
          <h2 className="mt-5 max-w-2xl text-4xl font-semibold leading-[1] tracking-[-0.035em] sm:text-6xl">
            {t("workTitle")} <span className="text-primary">{t("workTitleEmphasis")}</span>
          </h2>
          <p className="mt-5 max-w-xl text-muted-foreground">{t("workSubtitle")}</p>
        </Reveal>

        <Reveal delay={100}>
          <div className="flex flex-wrap gap-2" role="tablist">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  filter === f.id
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                }`}
              >
                {t(f.label)}
                <span className="ml-1.5 font-mono text-[10px] opacity-60">
                  {f.id === "all" ? projects.length : projects.filter((p) => p.categories.includes(f.id as ProjectCategory)).length}
                </span>
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {visible.map((project, i) => (
          <Reveal key={project.slug} delay={(i % 3) * 80} className="h-full">
            <ProjectTile project={project} index={projects.indexOf(project)} />
          </Reveal>
        ))}
        <Reveal className="h-full">
          <NextProjectTile />
        </Reveal>
      </div>
    </section>
  )
}
