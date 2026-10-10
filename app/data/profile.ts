import type { TranslationKey } from "../i18n/translations"

/** Números exibidos no hero e usados como contexto pelo chat com IA. */
export const stats: { value: string; labelKey: TranslationKey }[] = [
  { value: "10+", labelKey: "statProjects" },
  { value: "6", labelKey: "statSites" },
  { value: "1", labelKey: "statApps" },
  { value: "13+", labelKey: "statTech" },
]

export const contact = {
  email: "feliperogai@hotmail.com",
  linkedin: "https://www.linkedin.com/in/feliperogai/",
  github: "https://github.com/feliperogai",
  instagram: "https://www.instagram.com/feliperogai/",
}
