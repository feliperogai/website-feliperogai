import fs from "fs"
import path from "path"
import { projects } from "../../data/projects"
import { technologies } from "../../data/stack"
import { contact, stats } from "../../data/profile"
import { translations, type Language, type TranslationKey } from "../../i18n/translations"

// Fatos complementares editáveis à mão (ex.: experiências do LinkedIn), fora dos dados do site
const extraKnowledge = (() => {
  try {
    return fs.readFileSync(path.join(process.cwd(), "prompts", "knowledge-extra.md"), "utf-8")
  } catch {
    return ""
  }
})()

const languageNames: Record<Language, string> = { pt: "português", en: "inglês", es: "espanhol" }
const categoryNames = { web: "Web", mobile: "Mobile", ai: "IA" } as const

/**
 * Monta a base de conhecimento do chat a partir dos mesmos dados exibidos no site,
 * para que a IA esteja sempre em sincronia com o portfólio.
 */
export function buildKnowledge(language: Language): string {
  const pt = translations.pt
  const t = (key: TranslationKey) => pt[key]

  const projectLines = projects.map((p) => {
    const parts = [
      `- ${p.title}: ${t(p.descriptionKey)}`,
      `  Categorias: ${p.categories.map((c) => categoryNames[c]).join(", ")}. Tags: ${p.tags.join(", ")}.`,
    ]
    if (p.liveUrl) parts.push(`  Link: ${p.liveUrl}`)
    if (p.githubUrl) parts.push(`  Código: ${p.githubUrl}`)
    return parts.join("\n")
  })

  const services = ([1, 2, 3, 4] as const).map(
    (n) => `- ${t(`service${n}Title` as TranslationKey)}: ${t(`service${n}Text` as TranslationKey)}`,
  )
  const steps = ([1, 2, 3, 4] as const).map(
    (n) => `${n}. ${t(`step${n}Title` as TranslationKey)}: ${t(`step${n}Text` as TranslationKey)}`,
  )
  const principles = ([1, 2, 3, 4] as const).map((n) => t(`principle${n}` as TranslationKey))

  return `# Base de conhecimento

Idioma do site que o visitante está usando: ${languageNames[language]}.

## Sobre mim
${t("aboutLead")}
${t("aboutText1")}
${t("aboutText2")}
Cargo: ${t("roleTitle")}. Formação: ${t("degree")} (formado).
Princípios: ${principles.join("; ")}.
Status: ${t("heroStatus")}.

## Números
${stats.map((s) => `- ${s.value} ${t(s.labelKey).toLowerCase()}`).join("\n")}

## Projetos (na ordem do portfólio)
${projectLines.join("\n")}

Observações sobre os projetos:
- O Buggo foi o meu projeto de conclusão de curso (TCC). Só mencione isso se perguntarem sobre TCC ou faculdade.
- Os sites de empresas (Caspheon, Noon Café Lounge, Cedro Madeiras, H4 Digital, VF Elevadores, Top Calçados) foram feitos para clientes. Não precisa rotular como "freela" a menos que perguntem.
- O site da Top Calçados tem recursos de inteligência artificial.

## Serviços
${services.join("\n")}

## Como eu trabalho
${steps.join("\n")}

## Stack
${technologies.map((g) => `- ${g.category}: ${g.skills.join(", ")}`).join("\n")}

## Contato
- E-mail: ${contact.email}
- Formulário de contato no próprio site (seção Contato)
- LinkedIn: ${contact.linkedin}
- GitHub: ${contact.github}
- Instagram: ${contact.instagram}

${extraKnowledge}`
}
