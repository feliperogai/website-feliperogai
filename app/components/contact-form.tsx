"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { submitContactForm } from "../actions"
import { useLanguageContext } from "../contexts/LanguageContext"

export default function ContactForm() {
  const { t } = useLanguageContext()
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState("")

  async function handleSubmit(formData: FormData) {
    setPending(true)
    try {
      const response = await submitContactForm(formData)
      setMessage(response.message)
    } catch (error) {
      setMessage(t("somethingWentWrong"))
    } finally {
      setPending(false)
    }
  }

  return (
    <Card className="p-6">
      <form action={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            {t("name")}
          </label>
          <Input id="name" name="name" placeholder={t("enterYourName")} required />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            {t("email")}
          </label>
          <Input id="email" name="email" type="email" placeholder={t("enterYourEmail")} required />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            {t("message")}
          </label>
          <Textarea id="message" name="message" placeholder={t("enterYourMessage")} required />
        </div>
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? t("sending") : t("sendMessage")}
        </Button>
        {message && <p className="text-sm text-center mt-4 text-muted-foreground">{message}</p>}
      </form>
    </Card>
  )
}
