'use client'

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, ExternalLink, Github, Plus, Smartphone } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useLanguageContext } from "../contexts/LanguageContext"
import type { Project } from "../data/projects"

function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return url
  }
}

/** Imagem do projeto com fallback em gradiente caso não carregue. */
export function ProjectImage({ src, title, className = "" }: { src?: string; title: string; className?: string }) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30 ${className}`}>
        <span className="px-6 text-center text-2xl font-bold tracking-tight text-foreground/80 md:text-3xl">{title}</span>
      </div>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={title}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105 ${className}`}
    />
  )
}

export default function ProjectCard({ project }: { project: Project }) {
  const { t } = useLanguageContext()

  return (
    <Card className="group flex h-full flex-col overflow-hidden border-border/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Moldura de navegador */}
      <div className="flex items-center gap-2 border-b border-border/60 bg-muted/60 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        {project.liveUrl && (
          <span className="ml-2 truncate rounded bg-background/70 px-2 py-0.5 text-xs text-muted-foreground">
            {hostname(project.liveUrl)}
          </span>
        )}
      </div>
      <Link
        href={project.liveUrl ?? project.githubUrl ?? "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block aspect-[16/10] overflow-hidden bg-muted"
        aria-label={`${t("visitSite")}: ${project.title}`}
      >
        <ProjectImage src={project.image} title={project.title} />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 text-xl font-semibold leading-tight">{project.title}</h3>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">{t(project.descriptionKey)}</p>
        <div className="mb-5 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-md bg-muted px-2 py-1 text-xs font-medium">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              <ExternalLink className="h-4 w-4" />
              {t("visitSite")}
            </Link>
          )}
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/20"
            >
              <Github className="h-4 w-4" />
              GitHub
            </Link>
          )}
        </div>
      </div>
    </Card>
  )
}

/** Destaque do app do TCC, com mockup de celular. */
export function FeaturedAppCard({ project }: { project: Project }) {
  const { t } = useLanguageContext()

  return (
    <Card className="group overflow-hidden border-border/60">
      <div className="grid items-center gap-8 p-6 md:p-10 lg:grid-cols-2">
        <div className="relative flex justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30 blur-3xl" />
          <div className="relative h-[420px] w-[210px] rounded-[2.5rem] border-[10px] border-foreground/90 bg-background shadow-2xl">
            <div className="absolute left-1/2 top-2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-foreground/90" />
            <div className="h-full w-full overflow-hidden rounded-[1.8rem]">
              {project.image ? (
                <ProjectImage src={project.image} title={project.title} />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-primary via-secondary to-accent text-white">
                  <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/20 backdrop-blur">
                    <Smartphone className="h-10 w-10" />
                  </div>
                  <span className="text-3xl font-bold tracking-tight">{project.title}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            {t("tccBadge")}
          </span>
          <h3 className="text-3xl font-bold tracking-tight md:text-4xl">{project.title}</h3>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">{t(project.descriptionKey)}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-background transition-transform hover:scale-105"
            >
              <Smartphone className="h-5 w-5" />
              {t("getOnGooglePlay")}
            </Link>
          )}
        </div>
      </div>
    </Card>
  )
}

/** Espaço reservado para próximos projetos. */
export function NextProjectCard() {
  const { t } = useLanguageContext()

  return (
    <Link
      href="#contact"
      className="group flex h-full min-h-[320px] flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-border p-8 text-center transition-colors hover:border-primary hover:bg-primary/5"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110">
        <Plus className="h-7 w-7" />
      </div>
      <h3 className="text-xl font-semibold">{t("nextProjectTitle")}</h3>
      <p className="max-w-xs text-sm text-muted-foreground">{t("nextProjectDescription")}</p>
      <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
        {t("nextProjectCta")} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  )
}
