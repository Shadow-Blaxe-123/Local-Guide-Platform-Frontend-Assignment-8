"use client";

import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Search, UserCheck, Briefcase } from "lucide-react";

export default function HowItWorksSection() {
  return (
    <section className="w-full py-20 bg-muted/40">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Whether you are traveling or guiding, getting started is simple,
            transparent, and secure.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Tourists Flow */}
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-6">For Travelers</h3>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <MapPin className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Choose Your Destination</h4>
                    <p className="text-sm text-muted-foreground">
                      Enter your destination and travel preferences to explore
                      available local guides.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Search className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Browse & Compare Guides</h4>
                    <p className="text-sm text-muted-foreground">
                      View guide profiles, expertise, languages, ratings, and
                      pricing before deciding.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <UserCheck className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Book with Confidence</h4>
                    <p className="text-sm text-muted-foreground">
                      Connect securely with verified guides and enjoy an
                      authentic local experience.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Guides Flow */}
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-6">For Guides</h3>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <UserCheck className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Create Your Profile</h4>
                    <p className="text-sm text-muted-foreground">
                      Sign up, showcase your expertise, languages, and local
                      knowledge.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Briefcase className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Set Your Rates</h4>
                    <p className="text-sm text-muted-foreground">
                      Define your availability, pricing, and the experiences you
                      want to offer.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MapPin className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Start Guiding</h4>
                    <p className="text-sm text-muted-foreground">
                      Get booked by travelers and earn by providing memorable,
                      high-quality experiences.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
