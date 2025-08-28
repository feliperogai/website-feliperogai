"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useLanguageContext } from "../contexts/LanguageContext"
import { CheckCircle, Send } from "lucide-react"

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
      <Card className="p-8 sm:p-12 lg:p-16 text-center">
        <div className="animate-zoom-in">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6 animate-bounce" />
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
      </Card>
    )
  }

  return (
    <Card className="p-4 sm:p-6 lg:p-8">
      <form action={handleSubmit} className="space-y-3 sm:space-y-4 lg:space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1.5 sm:mb-2">
            {t("name")}
          </label>
          <Input 
            id="name" 
            name="name" 
            placeholder={t("enterYourName")} 
            required 
            className="h-10 sm:h-11 lg:h-12 text-sm sm:text-base"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1.5 sm:mb-2">
            {t("email")}
          </label>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            placeholder={t("enterYourEmail")} 
            required 
            className="h-10 sm:h-11 lg:h-12 text-sm sm:text-base"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1.5 sm:mb-2">
            {t("message")}
          </label>
          <Textarea 
            id="message" 
            name="message" 
            placeholder={t("enterYourMessage")} 
            required 
            className="min-h-[80px] sm:min-h-[100px] lg:min-h-[120px] text-sm sm:text-base resize-none"
          />
        </div>
        <Button 
          type="submit" 
          className="w-full h-10 sm:h-11 lg:h-12 text-sm sm:text-base font-medium group transition-all duration-300 hover:scale-105" 
          disabled={pending}
        >
          {pending ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"></div>
              {t("sending")}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              {t("sendMessage")}
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
    </Card>
  )
}
