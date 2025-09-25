import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useLanguageContext } from "../contexts/LanguageContext"

interface ProjectCardProps {
  readonly title: string
  readonly description: string
  readonly image: string
  readonly link: string
  readonly tags: string[]
  readonly showPlayButton?: boolean
  readonly playLink?: string
  readonly playButtonText?: string
}

export default function ProjectCard({ title, description, image, link, tags, showPlayButton = false, playLink, playButtonText = "Jogar Agora" }: ProjectCardProps) {
  const { t } = useLanguageContext()
  
  return (
    <Card className="project-card overflow-hidden h-full">
      <div className="relative aspect-video sm:aspect-[16/10] group">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
        {showPlayButton && playLink && (
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Link href={playLink} target="_blank">
              <Button
                size="sm"
                className="bg-white/90 hover:bg-white text-gray-900 hover:text-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                {playButtonText}
              </Button>
            </Link>
          </div>
        )}
      </div>
      <CardContent className="project-card-content p-3 sm:p-4 lg:p-6">
        <h3 className="font-semibold text-lg sm:text-xl lg:text-2xl mb-2 sm:mb-3 line-clamp-2 min-h-[3rem] sm:min-h-[3.5rem] lg:min-h-[4rem] leading-tight">{title}</h3>
        <p className="project-card-description text-xs sm:text-sm lg:text-base text-muted-foreground line-clamp-3 min-h-[3.5rem] sm:min-h-[4.5rem] lg:min-h-[5rem] leading-relaxed mb-3 sm:mb-4">{description}</p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
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
      <CardFooter className="project-card-footer p-3 sm:p-4 lg:p-6 pt-0">
        <Link href={link} target="_blank" className="inline-flex items-center gap-2 text-xs sm:text-sm lg:text-base hover:underline w-full justify-center py-2 px-3 sm:px-4 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors">
          <Github className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
          <span className="hidden sm:inline">{t("viewOnGithub")}</span>
          <span className="sm:hidden">GitHub</span>
        </Link>
      </CardFooter>
    </Card>
  )
}
