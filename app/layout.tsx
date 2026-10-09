import { ThemeProvider } from "./components/theme-provider"
import { LanguageProvider } from "./contexts/LanguageContext"
import type { Metadata, Viewport } from "next"
import "@fontsource-variable/inter"
import "@fontsource-variable/jetbrains-mono"
import "@fontsource/instrument-serif/400.css"
import "@fontsource/instrument-serif/400-italic.css"
import "./globals.css"
import type React from "react"
import ChatWidget from "./components/chat-widget"

const title = "Felipe Rogai — Engenheiro de Software, IA & Web"
const description =
  "Engenheiro da computação e desenvolvedor full stack. Crio sites, aplicativos e agentes de IA do design ao deploy."

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000",
  ),
  title,
  description,
  keywords: ["Felipe Rogai", "Desenvolvedor Full Stack", "Engenheiro de Software", "Agentes de IA", "Next.js", "React", "Python", "Portfólio"],
  authors: [{ name: "Felipe Rogai" }],
  creator: "Felipe Rogai",
  manifest: "/manifest.json",
  openGraph: { title, description, type: "website", locale: "pt_BR" },
  twitter: { card: "summary_large_image", title, description },
}

export const viewport: Viewport = {
  themeColor: "#0B0B0E",
  colorScheme: "dark",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <body suppressHydrationWarning className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" forcedTheme="dark" defaultTheme="dark" disableTransitionOnChange>
          <LanguageProvider>
            {children}
            <ChatWidget />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
