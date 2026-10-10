'use client'

import { Brain, Code, Database, Cloud, BarChart3 } from "lucide-react"
import Reveal from "./reveal"
import { technologies } from "../data/stack"

const icons = [Brain, Code, Database, Cloud, BarChart3]

export default function TechStack() {
  return (
    <div className="divide-y divide-border border-y border-border">
      {technologies.map((tech, i) => {
        const Icon = icons[i]
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
