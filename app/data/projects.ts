import type { TranslationKey } from "../i18n/translations"
import screenshots from "./screenshots.json"

export interface Project {
  readonly slug: string
  readonly title: string
  readonly descriptionKey: TranslationKey
  readonly tags: string[]
  readonly liveUrl?: string
  readonly githubUrl?: string
  readonly image?: string
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
  return { slug, title, descriptionKey, tags, liveUrl: url, image: sitePreview(slug, url) }
}

export const tccApp: Project = {
  slug: "buggo",
  title: "Buggo",
  descriptionKey: "buggoDescription",
  tags: ["Mobile", "Android", "Google Play"],
  liveUrl: "https://play.google.com/store/apps/details?id=com.buggo.app",
  image: localScreenshots.has("buggo") ? "/projects/buggo.jpg" : undefined,
}

export const freelanceProjects: Project[] = [
  site("caspheon", "Caspheon", "https://caspheon.com", "caspheonDescription", ["Site institucional", "Responsivo", "SEO"]),
  site("nooncafelounge", "Noon Café Lounge", "https://nooncafelounge.com.br", "noonDescription", ["Gastronomia", "Responsivo", "SEO"]),
  site("cedrmadeiras", "CEDR Madeiras", "https://cedrmadeiras.com.br", "cedrDescription", ["Site institucional", "Catálogo", "SEO"]),
  site("h4digital", "H4 Digital", "https://h4digital.com.br", "h4Description", ["Agência", "Responsivo", "SEO"]),
  site("vfelevadores", "VF Elevadores", "https://vfelevadores.com.br", "vfDescription", ["Site institucional", "Serviços", "SEO"]),
  site("topcalcados", "Top Calçados Distribuidora", "https://topcalcadosdistribuidora.com.br", "topCalcadosDescription", ["Distribuidora", "Catálogo", "Responsivo"]),
]

export const personalProjects: Project[] = [
  {
    slug: "onsmart",
    title: "OnSmart.AI",
    descriptionKey: "project2Description",
    tags: ["React", "CMS", "Excel API", "YouTube API", "AI Agent"],
    liveUrl: "https://onsmart.ai/",
    image: "/onsmart.png",
  },
  {
    slug: "pokedex",
    title: "Pokédex",
    descriptionKey: "project3Description",
    tags: ["HTML", "CSS", "JavaScript", "PokéAPI"],
    liveUrl: "https://feliperogai.github.io/pokedex/",
    githubUrl: "https://github.com/feliperogai/pokedex",
    image: "/pokédex.png",
  },
]
