'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useLanguageContext } from "../contexts/LanguageContext"

export default function PrivacyPage() {
  const { t, language } = useLanguageContext()
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
            <span className="text-base sm:text-lg font-bold text-foreground">Felipe Rogai</span>
          </div>
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
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-4 sm:mb-6 text-primary animate-bounce-gentle leading-tight">
              {t("privacyPolicyTitle")}
            </h1>
            <p className="text-center text-muted-foreground mb-8 sm:mb-12 max-w-3xl mx-auto text-sm sm:text-base lg:text-lg px-4">
              {t("privacyPolicySubtitle")}
            </p>
          </div>

          {/* Content */}
          <div className="space-y-6 sm:space-y-8">
            {/* Section 1 */}
            <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4 flex items-center gap-3">
                <span className="w-1 h-4 sm:h-6 bg-gradient-to-b from-primary to-secondary rounded-full"></span>
                {t("informationWeCollect")}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                {t("informationWeCollectText1")}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                {t("informationWeCollectText2")}
              </p>
            </div>

            {/* Section 2 */}
            <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4 flex items-center gap-3">
                <span className="w-1 h-4 sm:h-6 bg-gradient-to-b from-primary to-secondary rounded-full"></span>
                {t("howWeUseYourInformation")}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                {t("howWeUseYourInformationText1")}
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                {t("howWeUseYourInformationText2")}
              </p>
            </div>

            {/* Section 3 */}
            <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4 flex items-center gap-3">
                <span className="w-1 h-4 sm:h-6 bg-gradient-to-b from-primary to-secondary rounded-full"></span>
                {t("informationSharing")}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                {t("informationSharingText1")}
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                {t("informationSharingText2")}
              </p>
            </div>

            {/* Section 4 */}
            <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4 flex items-center gap-3">
                <span className="w-1 h-4 sm:h-6 bg-gradient-to-b from-primary to-secondary rounded-full"></span>
                {t("dataSecurity")}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                {t("dataSecurityText1")}
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                {t("dataSecurityText2")}
              </p>
            </div>

            {/* Section 5 */}
            <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4 flex items-center gap-3">
                <span className="w-1 h-4 sm:h-6 bg-gradient-to-b from-primary to-secondary rounded-full"></span>
                {t("yourRights")}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                {t("yourRightsText1")}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                {t("yourRightsText2")}
              </p>
              <div className="flex justify-center">
                <Link href="/#contact">
                  <Button className="bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90 h-10 sm:h-11 px-4 sm:px-6 text-sm sm:text-base">
                    {t("contactMe")}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Section 6 */}
            <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4 flex items-center gap-3">
                <span className="w-1 h-4 sm:h-6 bg-gradient-to-b from-primary to-secondary rounded-full"></span>
                {t("changesToThisPolicy")}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                {t("changesToThisPolicyText1")}
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                {t("changesToThisPolicyText2")}
              </p>
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
