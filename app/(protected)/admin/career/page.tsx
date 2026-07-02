import {
  BadgeCheck,
  BriefcaseBusiness,
  Clock3,
  MapPin,
  Search,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const applications = [
  {
    name: "Ananya Sharma",
    role: "Back Office Executive",
    location: "Pune",
    status: "New",
  },
  {
    name: "Rohit Mehta",
    role: "Technical Support Associate",
    location: "Ahmedabad",
    status: "Shortlisted",
  },
  {
    name: "Priya Nair",
    role: "Data Analyst Trainee",
    location: "Kochi",
    status: "In review",
  },
]

export default function CareerAdminPage() {
  return (
    <div className="space-y-6">
      <Card className="border-slate-200/80">
        <CardHeader className="pb-4">
          <CardTitle>Career applications</CardTitle>
          <CardDescription>
            Review incoming applicants and move them through the hiring flow.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          {applications.map((item) => (
            <div
              key={item.name}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  <p className="mt-1 text-sm text-slate-600">{item.role}</p>
                </div>
                <Badge variant="outline">{item.status}</Badge>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="size-3.5" />
                  {item.location}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock3 className="size-3.5" />
                  Today
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="border-slate-200/80">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Search className="size-4" />
              Screening
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-600">
            Filter by role, experience, or location before moving candidates forward.
          </CardContent>
        </Card>
        <Card className="border-slate-200/80">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BriefcaseBusiness className="size-4" />
              Interview stages
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-600">
            Keep each candidate in the right stage with a simple shortlist process.
          </CardContent>
        </Card>
        <Card className="border-slate-200/80">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BadgeCheck className="size-4" />
              Offer tracking
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-600">
            Mark selected applicants and maintain a clean record of final outcomes.
          </CardContent>
        </Card>
      </div>

      <Button className="rounded-2xl" size="lg">
        Export candidate list
      </Button>
    </div>
  )
}
