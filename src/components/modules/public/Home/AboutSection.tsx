import { Card, CardContent } from "@/components/ui/card";
import { Users, Map, ShieldCheck, HeartHandshake } from "lucide-react";

export default function AboutUsSection() {
  return (
    <section className="w-full bg-white" id="about">
      <div className="mx-auto max-w-7xl px-4 py-20">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight text-purple-700 sm:text-4xl">
            About Guidely
          </h2>
          <p className="text-lg text-slate-600">
            We believe the best way to explore a city is through the people who
            live there. Our platform connects travelers with passionate locals
            who turn everyday places into unforgettable experiences.
          </p>
        </div>

        {/* Content Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-none shadow-sm">
            <CardContent className="p-6 space-y-4">
              <Users className="h-8 w-8 text-slate-900" />
              <h3 className="text-lg font-semibold text-slate-900">
                Community-Driven
              </h3>
              <p className="text-slate-600 text-sm">
                Our guides are locals who know their cities inside out — from
                hidden cafes to untold stories you won’t find in guidebooks.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardContent className="p-6 space-y-4">
              <Map className="h-8 w-8 text-slate-900" />
              <h3 className="text-lg font-semibold text-slate-900">
                Authentic Experiences
              </h3>
              <p className="text-slate-600 text-sm">
                Skip generic tours. Discover experiences designed around your
                interests, pace, and curiosity.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardContent className="p-6 space-y-4">
              <ShieldCheck className="h-8 w-8 text-slate-900" />
              <h3 className="text-lg font-semibold text-slate-900">
                Trust & Safety
              </h3>
              <p className="text-slate-600 text-sm">
                Verified profiles, transparent reviews, and secure bookings
                ensure peace of mind for both travelers and guides.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardContent className="p-6 space-y-4">
              <HeartHandshake className="h-8 w-8 text-slate-900" />
              <h3 className="text-lg font-semibold text-slate-900">
                Empowering Locals
              </h3>
              <p className="text-slate-600 text-sm">
                We help locals monetize their knowledge while travelers enjoy
                richer, more meaningful journeys.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
