"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useLanguageContext } from "../contexts/LanguageContext"
import { ArrowUpRight, CheckCircle } from "lucide-react"

export default function ContactForm() {
  const { t } = useLanguageContext()
  const [pending, setPending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(formData: FormData) {
    setPending(true)
    setError("")
    
    try {
      const response = await fetch("https://formspree.io/f/xblalayv", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })

      if (response.ok) {
        setSuccess(true)
        // Reset form
        const form = document.querySelector('form') as HTMLFormElement
        if (form) form.reset()
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setSuccess(false)
        }, 5000)
      } else {
        setError(t("somethingWentWrong"))
      }
    } catch (error) {
      setError(t("somethingWentWrong"))
    } finally {
      setPending(false)
    }
  }

  if (success) {
    return (
      <div className="rounded-3xl border border-border bg-card p-8 text-center sm:p-12">
        <div className="animate-zoom-in">
          <CheckCircle className="mx-auto mb-6 h-14 w-14 text-primary" />
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-4">
            {t("messageSent")}
          </h3>
          <p className="text-muted-foreground mb-6 text-sm sm:text-base">
            {t("thankYouMessage")}
          </p>
          <Button 
            onClick={() => setSuccess(false)}
            variant="outline"
            className="animate-slide-in-from-bottom"
          >
            {t("sendNewMessage")}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
      <form action={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {t("name")}
          </label>
          <Input 
            id="name" 
            name="name" 
            placeholder={t("enterYourName")} 
            required 
            className="h-12 rounded-xl bg-background text-base focus-visible:ring-primary"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {t("email")}
          </label>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            placeholder={t("enterYourEmail")} 
            required 
            className="h-12 rounded-xl bg-background text-base focus-visible:ring-primary"
          />
        </div>
        <div>
          <label htmlFor="message" className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {t("message")}
          </label>
          <Textarea 
            id="message" 
            name="message" 
            placeholder={t("enterYourMessage")} 
            required 
            className="min-h-[140px] resize-none rounded-xl bg-background text-base focus-visible:ring-primary"
          />
        </div>
        <Button 
          type="submit" 
          className="group h-12 w-full rounded-full text-base font-semibold" 
          disabled={pending}
        >
          {pending ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"></div>
              {t("sending")}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {t("sendMessage")}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          )}
        </Button>
        {error && (
          <div className="animate-slide-in-from-top">
            <p className="text-sm text-center mt-3 sm:mt-4 text-red-500 px-2 bg-red-50 dark:bg-red-950/20 py-2 rounded-lg border border-red-200 dark:border-red-800">
              {error}
            </p>
          </div>
        )}
      </form>
    </div>
  )
}
