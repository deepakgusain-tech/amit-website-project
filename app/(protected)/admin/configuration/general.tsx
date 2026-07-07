"use client"

import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Save } from "lucide-react"
import { saveGeneralSettings } from "@/lib/actions/settings-action"

export default function GeneralComponent() {
  const [pending, startTransition] = useTransition()

  return (
    <Card className="border-slate-200/80 shadow-sm">
      <CardHeader className="border-b border-slate-200/70 py-4">
        <CardTitle className="text-base font-semibold">General settings</CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        <form
          action={(formData) => {
            startTransition(() => {
              void saveGeneralSettings(formData)
            })
          }}
          className="space-y-5"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Site name" id="siteName" defaultValue="AS Services" />
            <Field label="Primary email" id="primaryEmail" type="email" defaultValue="info@asservices.com" />
            <Field label="Primary phone" id="primaryPhone" type="tel" defaultValue="+91 92121 74507" />
            <Field label="Website URL" id="websiteUrl" defaultValue="https://asservices.com" />
          </div>

          <Field label="Tagline" id="tagline" defaultValue="Reliable business support delivered with clarity and care" />

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              className="min-h-[96px] rounded-xl"
              defaultValue="We help teams scale with back-office operations, analytics, technical support, and recovery services."
            />
          </div>

          <Separator />

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Office address" id="officeAddress" defaultValue="New Delhi, India" />
            <Field label="Office hours" id="officeHours" defaultValue="Mon - Sat, 9:00 AM - 6:00 PM" />
            <Field label="Logo path" id="logoPath" defaultValue="/images/AS-Services-Logo.jpg" />
            <Field label="Favicon path" id="faviconPath" defaultValue="/favicon.ico" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
              <Checkbox id="showPhone" name="showPhone" defaultChecked />
              <span className="text-sm text-slate-700">Show phone in header</span>
            </label>
            <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
              <Checkbox id="showEmail" name="showEmail" defaultChecked />
              <span className="text-sm text-slate-700">Show email in footer</span>
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
