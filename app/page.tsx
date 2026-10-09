'use client'

import Link from "next/link"
import { ArrowUp, ArrowUpRight, Bot, Check, Copy, Globe, Layers, Smartphone } from "lucide-react"
import { useState } from "react"
import SiteHeader from "./components/site-header"
import Hero from "./components/hero"
import Projects from "./components/projects"
import TechStack from "./components/tech-stack"
import ContactForm from "./components/contact-form"
import Reveal from "./components/reveal"
import { LogoMark } from "./components/logo"
import { useLanguageContext } from "./contexts/LanguageContext"
import type { TranslationKey } from "./i18n/translations"

const EMAIL = "feliperogai@hotmail.com"

function SectionHeading({ index, label, title, emphasis }: { index: string; label: string; title: string; emphasis: string }) {
  return (
    <Reveal>
      <p className="eyebrow">
        {index} — {label}
      </p>
      <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1] tracking-[-0.035em] sm:text-6xl">
        {title} <span className="font-serif font-normal italic text-primary">{emphasis}</span>
      </h2>
    </Reveal>
  )
}

function About() {
  const { t } = useLanguageContext()
  const principles: TranslationKey[] = ["principle1", "principle2", "principle3", "principle4"]

  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading index="01" label={t("about")} title={t("aboutHeading")} emphasis={t("aboutHeadingEmphasis")} />
            <Reveal delay={100} className="mt-10 rounded-3xl border border-border bg-card p-6">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{t("nowLabel")}</p>
              <p className="mt-3 text-lg font-semibold">{t("aiDevelopmentIntern")}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t("computerEngineeringStudent")}</p>
            </Reveal>
          </div>
        </div>

        <div className="space-y-8 lg:col-span-6 lg:col-start-7">
          <Reveal>
            <p className="text-2xl font-medium leading-snug tracking-tight sm:text-3xl">{t("aboutLead")}</p>
          </Reveal>
          <Reveal delay={80}>
            <p className="leading-relaxed text-muted-foreground sm:text-lg">{t("aboutText1")}</p>
          </Reveal>
          <Reveal delay={120}>
            <p className="leading-relaxed text-muted-foreground sm:text-lg">{t("aboutText2")}</p>
          </Reveal>
          <Reveal delay={160}>
            <ul className="grid gap-3 pt-4 sm:grid-cols-2">
              {principles.map((key) => (
                <li key={key} className="flex items-center gap-3 rounded-2xl border border-border px-4 py-3.5 text-sm">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {t(key)}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Services() {
  const { t } = useLanguageContext()
  const services = [
    { icon: Globe, title: "service1Title", text: "service1Text" },
    { icon: Smartphone, title: "service2Title", text: "service2Text" },
    { icon: Bot, title: "service3Title", text: "service3Text" },
    { icon: Layers, title: "service4Title", text: "service4Text" },
  ] as const

  return (
    <section id="services" className="border-y border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <SectionHeading index="03" label={t("services")} title={t("servicesTitle")} emphasis={t("servicesTitleEmphasis")} />
        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 80} className="h-full">
              <div className="group flex h-full flex-col bg-background p-7 transition-colors duration-300 hover:bg-primary hover:text-primary-foreground">
                <div className="flex items-center justify-between">
                  <Icon className="h-7 w-7 text-primary transition-colors group-hover:text-primary-foreground" />
                  <span className="font-mono text-xs text-muted-foreground transition-colors group-hover:text-primary-foreground/70">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-14 text-xl font-semibold tracking-tight">{t(title)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-primary-foreground/80">
                  {t(text)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Process() {
  const { t } = useLanguageContext()
  const steps = [
    { title: "step1Title", text: "step1Text" },
    { title: "step2Title", text: "step2Text" },
    { title: "step3Title", text: "step3Text" },
    { title: "step4Title", text: "step4Text" },
  ] as const

  return (
    <section id="process" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <SectionHeading index="04" label={t("processLabel")} title={t("processTitle")} emphasis={t("processTitleEmphasis")} />
      <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
        <div className="absolute left-0 right-0 top-5 hidden h-px bg-gradient-to-r from-primary via-border to-border md:block" />
        {steps.map(({ title, text }, i) => (
          <Reveal as="li" key={title} delay={i * 100} className="relative">
            <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background font-mono text-xs text-primary">
              0{i + 1}
            </span>
            <h3 className="mt-6 text-xl font-semibold tracking-tight">{t(title)}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(text)}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}

function Stack() {
  const { t } = useLanguageContext()
  return (
    <section id="stack" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 sm:pb-32 lg:px-8">
      <SectionHeading index="05" label={t("skills")} title={t("stackTitle")} emphasis={t("stackTitleEmphasis")} />
      <div className="mt-14">
        <TechStack />
      </div>
    </section>
  )
}

function Contact() {
  const { t } = useLanguageContext()
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${EMAIL}`
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden border-t border-border">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 py-24 sm:px-6 sm:py-32 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow">06 — {t("contact")}</p>
            <h2 className="mt-5 text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-7xl">
              {t("contactTitle")}
              <br />
              <span className="font-serif font-normal italic text-primary">{t("contactTitleEmphasis")}</span>
            </h2>
            <p className="mt-6 max-w-md text-muted-foreground sm:text-lg">{t("contactSubtitle")}</p>
          </Reveal>

          <Reveal delay={100} className="mt-10">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{t("email")}</p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <Link href={`mailto:${EMAIL}`} className="text-xl font-semibold tracking-tight underline decoration-primary decoration-2 underline-offset-8 transition-colors hover:text-primary sm:text-2xl">
                {EMAIL}
              </Link>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? t("copied") : t("copy")}
              </button>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { label: "LinkedIn", href: "https://www.linkedin.com/in/feliperogai/" },
                { label: "GitHub", href: "https://github.com/feliperogai" },
                { label: "Instagram", href: "https://www.instagram.com/feliperogai/" },
              ].map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm transition-colors hover:border-foreground"
                >
                  {s.label}
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </Link>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={150} className="lg:col-span-6">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  const { t } = useLanguageContext()
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="select-none bg-gradient-to-b from-foreground/[0.09] to-transparent bg-clip-text text-transparent whitespace-nowrap py-10 text-center text-[17vw] font-semibold leading-none tracking-[-0.06em] lg:text-[13.5rem]">
          Felipe Rogai
        </p>
        <div className="flex flex-col items-center justify-between gap-6 border-t border-border py-8 sm:flex-row">
          <div className="flex items-center gap-3">
            <LogoMark className="h-8 w-8" />
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Felipe Rogai. {t("allRightsReserved")}</p>
          </div>
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/terms" className="transition-colors hover:text-foreground">
              {t("termsOfService")}
            </Link>
            <Link href="/privacy" className="transition-colors hover:text-foreground">
              {t("privacyPolicy")}
            </Link>
            <Link href="#top" aria-label={t("backToTop")} className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground">
              <ArrowUp className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default function Page() {
  return (
    <div className="grain min-h-screen overflow-x-clip">
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Projects />
        <Services />
        <Process />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
