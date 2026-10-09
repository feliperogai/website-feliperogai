'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { LogoMark } from "./logo"
import { useLanguageContext } from "../contexts/LanguageContext"
import type { Language } from "../i18n/translations"

const languages: Language[] = ["pt", "en", "es"]

export default function SiteHeader() {
  const { t, language, changeLanguage } = useLanguageContext()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const nav = [
    { href: "#about", label: t("about") },
    { href: "#work", label: t("projects") },
    { href: "#services", label: t("services") },
    { href: "#stack", label: t("skills") },
  ]

  const languageSwitch = (
    <div className="flex items-center rounded-full border border-border p-0.5 font-mono text-[11px] uppercase">
      {languages.map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => changeLanguage(lang)}
          aria-pressed={language === lang}
          className={`rounded-full px-2.5 py-1 transition-colors ${
            language === lang ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  )

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "border-b border-border/60 bg-background/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="#top" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <LogoMark className="h-9 w-9 transition-transform duration-300 group-hover:-rotate-6" />
          <span className="hidden font-semibold tracking-tight sm:inline">Felipe Rogai</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {languageSwitch}
          <Link
            href="#contact"
            className="group inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-primary"
          >
            {t("ctaContact")}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <button
          type="button"
          className="rounded-full p-2 transition-colors hover:bg-muted md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 px-4 pb-6 pt-2 md:hidden">
          <nav className="flex flex-col">
            {[...nav, { href: "#contact", label: t("contact") }].map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 border-b border-border/60 py-4 text-2xl font-semibold tracking-tight"
              >
                <span className="font-mono text-xs text-primary">0{i + 1}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6">{languageSwitch}</div>
        </div>
      )}
    </header>
  )
}
