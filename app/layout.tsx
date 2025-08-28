import { ThemeProvider } from "./components/theme-provider"
import { LanguageProvider } from "./contexts/LanguageContext"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Felipe Rogai - Portfolio",
  description: "Portfolio de desenvolvedor full stack mostrando projetos e habilidades em Python, React, AI/ML e desenvolvimento web",
  keywords: ["Felipe Rogai", "Desenvolvedor Full Stack", "Python", "React", "AI", "Machine Learning", "Portfolio"],
  authors: [{ name: "Felipe Rogai" }],
  creator: "Felipe Rogai",
  manifest: "/manifest.json",
  openGraph: {
    title: "Felipe Rogai - Portfolio",
    description: "Portfolio de desenvolvedor full stack mostrando projetos e habilidades em Python, React, AI/ML e desenvolvimento web",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Felipe Rogai - Portfolio",
    description: "Portfolio de desenvolvedor full stack mostrando projetos e habilidades em Python, React, AI/ML e desenvolvimento web",
  },
  icons: {
    icon: [
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/rogai.jpg', sizes: 'any', type: 'image/jpeg' }
    ],
    shortcut: '/icon.png',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
