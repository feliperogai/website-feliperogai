import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useLanguageContext } from "../contexts/LanguageContext"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  link: string
  tags: string[]
}

export default function ProjectCard({ title, description, image, link, tags }: ProjectCardProps) {
  const { t } = useLanguageContext()
  
  return (
    <Card className="project-card overflow-hidden">
      <div className="relative aspect-video">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="project-card-content p-4">
        <h3 className="font-semibold text-xl mb-3 line-clamp-2 min-h-[3.5rem]">{title}</h3>
        <p className="project-card-description text-sm text-muted-foreground line-clamp-3 min-h-[4.5rem]">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="project-card-footer p-4 pt-0">
        <Link href={link} target="_blank" className="inline-flex items-center gap-2 text-sm hover:underline w-full justify-center py-2 px-4 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors">
          <Github className="h-4 w-4" />
          {t("viewOnGithub")}
        </Link>
      </CardFooter>
    </Card>
  )
}
