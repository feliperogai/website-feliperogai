'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useLanguageContext } from "../contexts/LanguageContext"

export default function TermsPage() {
  const { t } = useLanguageContext()
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
            <span className="text-lg font-bold text-foreground">Felipe Rogai</span>
          </div>
          <Link href="/">
                          <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                {t("backToPortfolio")}
              </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 md:px-6 py-12 md:py-24">
        <div className="mx-auto max-w-4xl">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6 text-primary animate-bounce-gentle">
              Terms of Service
            </h1>
            <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto text-lg">
              Please read these terms and conditions carefully before using this portfolio website.
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Section 1 */}
            <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full"></span>
                1. Acceptance of Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                By accessing and using this portfolio website, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            {/* Section 2 */}
            <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full"></span>
                2. Use License
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Permission is granted to temporarily download one copy of the materials (information or software) on Felipe Rogai's portfolio website for personal, non-commercial transitory viewing only.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full"></span>
                3. Disclaimer
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The materials on Felipe Rogai's portfolio website are provided on an 'as is' basis. Felipe Rogai makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </div>

            {/* Section 4 */}
            <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full"></span>
                4. Limitations
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                In no event shall Felipe Rogai or his suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the portfolio website.
              </p>
            </div>

            {/* Section 5 */}
            <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full"></span>
                5. Contact Information
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact me through the contact form on the main portfolio page.
              </p>
              <div className="flex justify-center">
                <Link href="/#contact">
                  <Button className="bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90">
                    Contact Me
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-16 pt-8 border-t border-border/30">
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
