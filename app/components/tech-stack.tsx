import { Card } from "@/components/ui/card"
import { Brain, Code, Database, Cloud, BarChart3 } from "lucide-react"

const technologies = [
  {
    category: "AI & Machine Learning",
    skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "OpenAI API", "Langchain"],
    icon: Brain,
    color: "from-purple-500 to-pink-500",
  },
  {
    category: "Frontend Development",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS"],
    icon: Code,
    color: "from-blue-500 to-cyan-500",
  },
  {
    category: "Backend & Database",
    skills: ["Node.js", "FastAPI", "PostgreSQL", "MySQL", "MongoDB", "Redis"],
    icon: Database,
    color: "from-green-500 to-emerald-500",
  },
  {
    category: "DevOps & Cloud",
    skills: ["AWS", "Docker", "Git", "CI/CD", "Linux", "Kubernetes"],
    icon: Cloud,
    color: "from-orange-500 to-red-500",
  },
  {
    category: "Data & Analytics",
    skills: ["Pandas", "NumPy", "Data Analysis", "API Integration", "ETL Processes"],
    icon: BarChart3,
    color: "from-indigo-500 to-purple-500",
  },
]

export default function TechStack() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {technologies.map((tech, index) => {
        const IconComponent = tech.icon
        return (
          <Card
            key={tech.category}
            className="group p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border/30 hover:border-primary/40 bg-card/50 backdrop-blur-sm"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="text-center mb-4">
              <div
                className={`inline-flex p-3 rounded-full bg-gradient-to-r ${tech.color} mb-3 group-hover:scale-105 transition-transform duration-300`}
              >
                <IconComponent className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-foreground">{tech.category}</h3>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {tech.skills.map((skill, skillIndex) => (
                <div
                  key={skill}
                  className="group/skill relative overflow-hidden rounded-md bg-muted/30 hover:bg-muted/50 transition-colors duration-200 border border-border/20"
                >
                  <div className="p-2 text-center">
                    <span className="text-xs font-medium text-foreground group-hover/skill:text-primary transition-colors duration-200">
                      {skill}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )
      })}
    </div>
  )
}
