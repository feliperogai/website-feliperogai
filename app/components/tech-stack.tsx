'use client'

import { Brain, Code, Database, Cloud, BarChart3 } from "lucide-react"
import Reveal from "./reveal"

const technologies = [
  { category: "AI & Machine Learning", skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "OpenAI API", "LangChain"], icon: Brain },
  { category: "Frontend", skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS"], icon: Code },
  { category: "Backend & Database", skills: ["Node.js", "FastAPI", "PostgreSQL", "MySQL", "MongoDB", "Redis"], icon: Database },
  { category: "DevOps & Cloud", skills: ["AWS", "Docker", "Git", "CI/CD", "Linux", "Kubernetes"], icon: Cloud },
  { category: "Data & Analytics", skills: ["Pandas", "NumPy", "Data Analysis", "API Integration", "ETL"], icon: BarChart3 },
]

export default function TechStack() {
  return (
    <div className="divide-y divide-border border-y border-border">
      {technologies.map((tech, i) => {
        const Icon = tech.icon
        return (
          <Reveal key={tech.category} delay={i * 60}>
            <div className="group grid gap-5 py-7 md:grid-cols-12 md:items-center">
              <div className="flex items-center gap-4 md:col-span-4">
                <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                <Icon className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-1">{tech.category}</h3>
              </div>
              <ul className="flex flex-wrap gap-2 md:col-span-8">
                {tech.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )
      })}
    </div>
  )
}
