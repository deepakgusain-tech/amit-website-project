"use client"

import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Save } from "lucide-react"
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa"
import { saveSocialSettings } from "@/lib/actions/settings-action"

const socialLinks = [
  { label: "Facebook", name: "facebookUrl", icon: FaFacebookF },
  { label: "Instagram", name: "instagramUrl", icon: FaInstagram },
  { label: "LinkedIn", name: "linkedinUrl", icon: FaLinkedinIn },
  { label: "YouTube", name: "youtubeUrl", icon: FaYoutube },
]

export default function SocialComponent() {
  const [pending, startTransition] = useTransition()

  return (
    <Card className="border-slate-200/80 shadow-sm">
      <CardHeader className="border-b border-slate-200/70 py-4">
        <CardTitle className="text-base font-semibold">Social media settings</CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        <form
          action={(formData) => {
            startTransition(() => {
              void saveSocialSettings(formData)
            })
          }}
          className="space-y-5"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {socialLinks.map(({ label, name, icon: Icon }) => (
              <div key={name} className="space-y-2">
                <Label htmlFor={name} className="flex items-center gap-2">
                  <Icon className="size-4 text-cyan-700" />
                  {label}
                </Label>
                <Input id={name} name={name} className="h-10 rounded-xl" />
              </div>
            ))}
            <Field label="WhatsApp" id="whatsappUrl" />
            <Field label="Messenger" id="messengerUrl" />
          </div>

          <Field label="Social bio" id="socialBio" defaultValue="Business support services from India" />

          <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
            <Checkbox id="showSocialIcons" name="showSocialIcons" defaultChecked />
            <span className="text-sm text-slate-700">Show social icons in footer</span>
          </label>

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
  defaultValue,
}: {
  label: string
  id: string
  defaultValue?: string
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={id} defaultValue={defaultValue} className="h-10 rounded-xl" />
    </div>
  )
}
