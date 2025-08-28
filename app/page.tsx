'use client'

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Instagram, Menu, X } from "lucide-react"
import Link from "next/link"
import ContactForm from "./components/contact-form"
import ProjectCard from "./components/project-card"
import TechStack from "./components/tech-stack"
import ProfilePhoto from "./components/profile-photo"
import { useLanguageContext } from "./contexts/LanguageContext"
import { useState } from "react"

export default function Page() {
  const { t } = useLanguageContext()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          {/* Botão Menu Mobile - À esquerda */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Menu Desktop - Centralizado */}
          <nav className="hidden md:flex items-center justify-center flex-1 space-x-4 lg:space-x-8 text-sm font-medium">
            {[
              { href: "#about", label: t("about") },
              { href: "#skills", label: t("skills") },
              { href: "#projects", label: t("projects") },
              { href: "#contact", label: t("contact") }
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 lg:px-6 py-3 rounded-xl transition-all duration-300 hover:text-foreground hover:scale-105 group font-semibold"
              >
                <span className="relative z-10 text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {item.label}
                </span>
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 transform -translate-x-1/2"></div>
              </Link>
            ))}
          </nav>

          {/* Espaço vazio à direita para balancear o menu mobile */}
          <div className="md:hidden w-10"></div>
        </div>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur">
            <nav className="container px-4 py-4 space-y-2">
              {[
                { href: "#about", label: t("about") },
                { href: "#skills", label: t("skills") },
                { href: "#projects", label: t("projects") },
                { href: "#contact", label: t("contact") }
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-3 rounded-lg hover:bg-muted/50 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="container px-4 md:px-6">
        <section id="about" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <div className="space-y-6">
                <div className="relative">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-foreground animate-bounce-gentle">
                    {t("heroTitle").includes("Felipe Rogai") ? (
                      <>
                        {t("heroTitle").split("Felipe Rogai")[0]}
                        <span className="text-primary font-bold">Felipe Rogai</span>
                        {t("heroTitle").split("Felipe Rogai")[1]}
                      </>
                    ) : (
                      t("heroTitle")
                    )}
                  </h1>
                </div>
                <p className="mx-auto max-w-[800px] text-foreground md:text-xl animate-float leading-relaxed">
                  {t("heroSubtitle")}
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
                {[
                  { href: "https://github.com/feliperogai", icon: Github, label: t("github"), bgColor: "bg-gray-800", hoverBgColor: "hover:bg-gray-700", borderColor: "border-gray-600" },
                  { href: "https://www.linkedin.com/in/feliperogai/", icon: Linkedin, label: t("linkedin"), bgColor: "bg-blue-600", hoverBgColor: "hover:bg-blue-500", borderColor: "border-blue-500" },
                  { href: "https://www.instagram.com/feliperogai/", icon: Instagram, label: t("instagram"), bgColor: "bg-pink-600", hoverBgColor: "hover:bg-pink-500", borderColor: "border-pink-500" },
                  { href: "mailto:feliperogai@hotmail.com", icon: Mail, label: t("email"), bgColor: "bg-emerald-600", hoverBgColor: "hover:bg-emerald-500", borderColor: "border-emerald-500" }
                ].map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <Link key={item.href} href={item.href} target="_blank">
                      <Button
                        variant="outline"
                        size="lg"
                        className={`group relative overflow-hidden ${item.bgColor} ${item.hoverBgColor} text-white ${item.borderColor} hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-xl w-full h-16`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <IconComponent className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
                        <span className="relative z-10 text-sm font-medium mt-1">{item.label}</span>
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

                <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-br from-background via-muted/20 to-background">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-6xl">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6 text-primary animate-bounce-gentle">
                  {t("aboutTitle")}
                </h2>
                <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto text-lg">
                  {t("aboutSubtitle")}
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
                {/* Foto e informações pessoais */}
                <div className="order-2 lg:order-1 animate-slide-in-left">
                  <div className="relative group hover-lift">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                    <div className="relative bg-gradient-to-br from-card to-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 lg:p-8 shadow-2xl animate-pulse-glow-soft">
                      <div className="text-center space-y-4">
                        {/* Componente de foto de perfil */}
                        <div className="flex justify-center">
                          <ProfilePhoto
                            size="lg"
                            src="/feliperogai.jpeg"
                            showPlaceholder={false}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <h3 className="text-xl lg:text-2xl font-bold text-foreground">Felipe Rogai</h3>
                          <p className="text-accent font-semibold text-sm lg:text-base">{t("aiDevelopmentIntern")}</p>
                          <p className="text-sm text-muted-foreground">{t("computerEngineeringStudent")}</p>
                        </div>
                        
                        {/* Estatísticas */}
                        <div className="grid grid-cols-3 gap-3 lg:gap-4">
                          <div className="text-center">
                            <div className="text-xl lg:text-2xl font-bold text-primary">2+</div>
                            <div className="text-xs text-muted-foreground font-medium leading-tight">{t("yearsExperience")}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xl lg:text-2xl font-bold text-secondary">15+</div>
                            <div className="text-xs text-muted-foreground font-medium leading-tight">{t("projectsCompleted")}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xl lg:text-2xl font-bold text-accent">5+</div>
                            <div className="text-xs text-muted-foreground font-medium leading-tight">{t("technologies")}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Descrição e habilidades */}
                <div className="order-1 lg:order-2 space-y-6 lg:space-y-8 animate-slide-in-right">
                  {/* Introdução */}
                  <div className="space-y-4 lg:space-y-6">
                    <h3 className="text-xl lg:text-2xl font-bold text-foreground flex items-center gap-3">
                      <span className="w-2 h-6 lg:h-8 bg-gradient-to-b from-primary to-secondary rounded-full"></span>
                      {t("getToKnowMe")}
                    </h3>
                    
                    <div className="space-y-4 text-foreground leading-relaxed">
                      <p className="text-base lg:text-lg font-medium">
                        {t("aboutText1")}
                      </p>
                      
                      <p className="text-foreground font-medium text-sm lg:text-base">
                        {t("aboutText2")}
                      </p>
                      
                      <p className="text-foreground font-medium text-sm lg:text-base">
                        {t("aboutText3")}
                      </p>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="py-12 md:py-24 lg:py-32 bg-gradient-to-br from-muted/10 via-background to-muted/10">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6 text-primary animate-bounce-gentle">
                {t("projectsTitle")}
              </h2>
              <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto text-lg">
                {t("projectsSubtitle")}
              </p>
            </div>
            <div className="project-grid">
              <ProjectCard
                title={t("project1Title")}
                description={t("project1Description")}
                image="/ai-automation-dashboard.png"
                link="https://github.com"
                tags={["Python", "AI", "Machine Learning", "Process Automation"]}
              />
              <ProjectCard
                title={t("project2Title")}
                description={t("project2Description")}
                image="/workflow-optimizer.png"
                link="https://github.com"
                tags={["Python", "TensorFlow", "Data Analysis", "API Integration"]}
              />
              <ProjectCard
                title={t("project3Title")}
                description={t("project3Description")}
                image="/colorful-pokemon-pokedex.png"
                link="https://github.com"
                tags={["JavaScript", "React", "AI", "PokéAPI"]}
              />
            </div>
          </div>
        </section>

        <section id="skills" className="py-12 md:py-24 lg:py-32 bg-gradient-to-br from-background via-muted/20 to-background">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6 text-primary animate-bounce-gentle">
                {t("skillsTitle")}
              </h2>
              <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto text-lg">
                {t("skillsSubtitle")}
              </p>
            </div>
            <TechStack />
          </div>
        </section>

        <section id="contact" className="py-12 md:py-24 lg:py-32 bg-gradient-to-br from-muted/10 via-background to-muted/10">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6 text-primary animate-bounce-gentle">
                  {t("contactTitle")}
                </h2>
                <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto text-lg">
                  {t("contactSubtitle")}
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/50 bg-muted/20">
        <div className="container px-4 md:px-6 py-12">
          {/* Seção principal do footer */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Informações pessoais */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                <h3 className="text-xl font-bold text-foreground">Felipe Rogai</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t("footerDescription")}
              </p>
              <div className="flex gap-3">
                <Link href="https://github.com/feliperogai" target="_blank" className="p-2 bg-muted/50 hover:bg-muted rounded-lg transition-colors duration-300 group">
                  <Github className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                </Link>
                <Link href="https://www.linkedin.com/in/feliperogai/" target="_blank" className="p-2 bg-muted/50 hover:bg-muted rounded-lg transition-colors duration-300 group">
                  <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                </Link>
                <Link href="mailto:feliperogai@hotmail.com" className="p-2 bg-muted/50 hover:bg-muted rounded-lg transition-colors duration-300 group">
                  <Mail className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                </Link>
              </div>
            </div>

            {/* Links rápidos */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">{t("quickLinks")}</h4>
              <nav className="space-y-2">
                <Link href="#about" className="block w-fit text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                  {t("aboutMe")}
                </Link>
                <Link href="#skills" className="block w-fit text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                  {t("skills")}
                </Link>
                <Link href="#projects" className="block w-fit text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                  {t("projects")}
                </Link>
                <Link href="#contact" className="block w-fit text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                  {t("contact")}
                </Link>
              </nav>
            </div>

            {/* Tecnologias principais */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">{t("techStack")}</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "python", label: t("python") },
                  { key: "react", label: t("react") },
                  { key: "aiMl", label: t("aiMl") },
                  { key: "nodejs", label: t("nodejs") },
                  { key: "postgresql", label: t("postgresql") },
                  { key: "aws", label: t("aws") }
                ].map((tech) => (
                  <span key={tech.key} className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20">
                    {tech.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Linha divisória */}
          <div className="border-t border-border/30 mb-6"></div>

          {/* Copyright e links legais */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
              <p className="text-sm text-muted-foreground">{t("allRightsReserved")}</p>
            </div>
            <nav className="flex gap-4 sm:gap-6">
              <Link className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 hover:underline underline-offset-4" href="/terms">
                {t("termsOfService")}
              </Link>
              <Link className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 hover:underline underline-offset-4" href="/privacy">
                {t("privacyPolicy")}
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
