'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useLanguageContext } from "../contexts/LanguageContext"

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto text-lg">
              This Privacy Policy describes how your personal information is collected, used, and shared when you visit this portfolio website.
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Section 1 */}
            <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full"></span>
                1. Information We Collect
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When you visit this portfolio website, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Additionally, as you browse the site, we collect information about the individual web pages that you view, what websites or search terms referred you to the site, and information about how you interact with the site.
              </p>
            </div>

            {/* Section 2 */}
            <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full"></span>
                2. How We Use Your Information
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use the information that we collect to help us screen for potential risk and fraud, and more generally to improve and optimize our site (for example, by generating analytics about how our customers browse and interact with the site).
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The information collected is used solely for improving the user experience and website functionality.
              </p>
            </div>

            {/* Section 3 */}
            <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full"></span>
                3. Information Sharing
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We do not share, sell, or otherwise disclose your personal information for purposes other than those outlined in this Privacy Policy. However, we may disclose your personal information to a third party for a limited purpose in specific circumstances.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We may also disclose your personal information if required to do so by law or in response to valid requests by public authorities.
              </p>
            </div>

            {/* Section 4 */}
            <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full"></span>
                4. Data Security
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
              </p>
            </div>

            {/* Section 5 */}
            <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full"></span>
                5. Your Rights
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You have the right to access, correct, or delete your personal information. If you would like to exercise these rights, please contact us through the contact form on the main portfolio page.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You also have the right to withdraw consent at any time where we relied on your consent to process your personal information.
              </p>
              <div className="flex justify-center">
                <Link href="/#contact">
                  <Button className="bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90">
                    Contact Me
                  </Button>
                </Link>
              </div>
            </div>

            {/* Section 6 */}
            <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full"></span>
                6. Changes to This Policy
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
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
