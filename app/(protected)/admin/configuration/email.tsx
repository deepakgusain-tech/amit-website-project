"use client"

import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Save } from "lucide-react"
import { saveEmailSettings } from "@/lib/actions/settings-action"

export default function EmailComponent() {
  const [pending, startTransition] = useTransition()

  return (
    <Card className="border-slate-200/80 shadow-sm">
      <CardHeader className="border-b border-slate-200/70 py-4">
        <CardTitle className="text-base font-semibold">Email settings</CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        <form
          action={(formData) => {
            startTransition(() => {
              void saveEmailSettings(formData)
            })
          }}
          className="space-y-5"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="SMTP host" id="smtpHost" defaultValue="smtp.gmail.com" />
            <Field label="SMTP port" id="smtpPort" type="number" defaultValue="587" />
            <Field label="SMTP username" id="smtpUsername" defaultValue="info@asservices.com" />
            <Field label="From email" id="fromEmail" type="email" defaultValue="noreply@asservices.com" />
            <Field label="From name" id="fromName" defaultValue="AS Services" />
            <Field label="Reply-to email" id="replyToEmail" type="email" defaultValue="info@asservices.com" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
              <Checkbox id="enableNotifications" name="enableNotifications" defaultChecked />
              <span className="text-sm text-slate-700">Send enquiry notifications</span>
            </label>
            <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
              <Checkbox id="storeDrafts" name="storeDrafts" />
              <span className="text-sm text-slate-700">Store email drafts</span>
            </label>
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="rounded-full px-5" disabled={pending}>
              {pending ? <Loader2 className="mr-2 size-4 animate-spin" /> : <Save className="mr-2 size-4" />}
              Save
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

function Field({
  label,
  id,
  type = "text",
  defaultValue,
}: {
  label: string
  id: string
  type?: string
  defaultValue?: string
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={id} type={type} defaultValue={defaultValue} className="h-10 rounded-xl" />
    </div>
  )
}
