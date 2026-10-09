import type { TranslationKey } from "../i18n/translations"
import screenshots from "./screenshots.json"

export type ProjectCategory = "web" | "mobile" | "ai"

export interface Project {
  readonly slug: string
  readonly title: string
  readonly descriptionKey: TranslationKey
  readonly categories: ProjectCategory[]
  readonly tags: string[]
  readonly liveUrl?: string
  readonly githubUrl?: string
  readonly image?: string
  /** Logo exibido no mockup de celular (projetos mobile). */
  readonly logo?: string
  readonly featured?: boolean
}

// Screenshots locais gerados por `npm run screenshots` (scripts/capture-screenshots.mjs).
const localScreenshots = new Set<string>(screenshots as string[])

// Usa o screenshot local quando existir; senão gera um preview ao vivo do site
// pelo serviço público mShots do WordPress.
function sitePreview(slug: string, url: string): string {
  if (localScreenshots.has(slug)) return `/projects/${slug}.jpg`
  return `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=1280&h=800`
}

function site(slug: string, title: string, url: string, descriptionKey: TranslationKey, tags: string[]): Project {
  return { slug, title, descriptionKey, categories: ["web"], tags, liveUrl: url, image: sitePreview(slug, url) }
}

export const projects: Project[] = [
  {
    slug: "buggo",
    title: "Buggo",
    descriptionKey: "buggoDescription",
    categories: ["mobile"],
    tags: ["Android", "Mobile", "Google Play"],
    liveUrl: "https://play.google.com/store/apps/details?id=com.buggo.app",
    logo: "https://play-lh.googleusercontent.com/LCiXfeXcQIU6hU9ftrOpNDKEzAgFATuAzRvZO3odeO1ev0f91bIDSO6F1UISTLl2ndTvZ7XWjL4eLBhqMzlh3g=w240-h480-rw",
    featured: true,
  },
  {
    slug: "onsmart",
    title: "OnSmart.AI",
    descriptionKey: "onsmartDescription",
    categories: ["web", "ai"],
    tags: ["React", "AI Agent", "CMS", "YouTube API"],
    liveUrl: "https://onsmart.ai/",
    image: sitePreview("onsmart", "https://onsmart.ai/"),
    featured: true,
  },
  site("caspheon", "Caspheon", "https://caspheon.com", "caspheonDescription", ["Web Design", "UI/UX", "SEO"]),
  site("nooncafelounge", "Noon Café Lounge", "https://nooncafelounge.com.br", "noonDescription", ["Web Design", "Responsivo", "SEO"]),
  site("cedromadeiras", "Cedro Madeiras", "https://cedromadeiras.com.br", "cedroDescription", ["Web Design", "Catálogo", "SEO"]),
  site("h4digital", "H4 Digital", "https://h4digital.com.br", "h4Description", ["Web Design", "Conversão", "SEO"]),
  site("vfelevadores", "VF Elevadores", "https://vfelevadores.com.br", "vfDescription", ["Web Design", "Responsivo", "SEO"]),
  site("topcalcados", "Top Calçados", "https://topcalcadosdistribuidora.com.br", "topCalcadosDescription", ["Web Design", "Catálogo", "Responsivo"]),
  {
    slug: "pokedex",
    title: "Pokédex",
    descriptionKey: "pokedexDescription",
    categories: ["web"],
    tags: ["JavaScript", "PokéAPI", "CSS"],
    liveUrl: "https://feliperogai.github.io/pokedex/",
    githubUrl: "https://github.com/feliperogai/pokedex",
    image: sitePreview("pokedex", "https://feliperogai.github.io/pokedex/"),
  },
]
