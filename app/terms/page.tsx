'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useLanguageContext } from "../contexts/LanguageContext"
import { LogoMark } from "../components/logo"

export default function TermsPage() {
  const { t, language } = useLanguageContext()
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <LogoMark className="h-8 w-8" />
            <span className="text-base font-semibold tracking-tight sm:text-lg">Felipe Rogai</span>
          </Link>
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2 h-9 sm:h-10 px-3 sm:px-4">
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">{t("backToPortfolio")}</span>
              <span className="sm:hidden">Voltar</span>
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-24">
        <div className="mx-auto max-w-4xl">
          {/* Page Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-4 sm:mb-6 text-primary leading-tight">
              {t("termsOfServiceTitle")}
            </h1>
            <p className="text-center text-muted-foreground mb-8 sm:mb-12 max-w-3xl mx-auto text-sm sm:text-base lg:text-lg px-4">
              {t("termsOfServiceSubtitle")}
            </p>
          </div>

          {/* Content */}
          <div className="space-y-6 sm:space-y-8">
            {/* Section 1 */}
            <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4 flex items-center gap-3">
                <span className="w-1 h-4 sm:h-6 bg-gradient-to-b from-primary to-secondary rounded-full"></span>
                {t("acceptanceOfTerms")}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                {t("acceptanceOfTermsText1")}
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                {t("acceptanceOfTermsText2")}
              </p>
            </div>

            {/* Section 2 */}
            <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4 flex items-center gap-3">
                <span className="w-1 h-4 sm:h-6 bg-gradient-to-b from-primary to-secondary rounded-full"></span>
                {t("useLicense")}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                {t("useLicenseText1")}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                {t("useLicenseText2")}
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1.5 sm:space-y-2 ml-4 text-sm sm:text-base">
                <li>{t("useLicenseList1")}</li>
                <li>{t("useLicenseList2")}</li>
                <li>{t("useLicenseList3")}</li>
                <li>{t("useLicenseList4")}</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4 flex items-center gap-3">
                <span className="w-1 h-4 sm:h-6 bg-gradient-to-b from-primary to-secondary rounded-full"></span>
                {t("disclaimer")}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                {t("disclaimerText")}
              </p>
            </div>

            {/* Section 4 */}
            <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4 flex items-center gap-3">
                <span className="w-1 h-4 sm:h-6 bg-gradient-to-b from-primary to-secondary rounded-full"></span>
                {t("limitations")}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                {t("limitationsText")}
              </p>
            </div>

            {/* Section 5 */}
            <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4 flex items-center gap-3">
                <span className="w-1 h-4 sm:h-6 bg-gradient-to-b from-primary to-secondary rounded-full"></span>
                {t("contactInformation")}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                {t("contactInformationText")}
              </p>
              <div className="flex justify-center">
                <Link href="/#contact">
                  <Button className="bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90 h-10 sm:h-11 px-4 sm:px-6 text-sm sm:text-base">
                    {t("contactMe")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-border/30">
            <p className="text-xs sm:text-sm text-muted-foreground">
              {t("lastUpdated")} {new Date().toLocaleDateString(
                language === 'pt' ? 'pt-BR' :
                language === 'es' ? 'es-ES' : 'en-US',
                { year: 'numeric', month: 'long', day: 'numeric' }
              )}
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
