"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Search } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  const [destination, setDestination] = useState("");
  const [category, setCategory] = useState("");

  const handleSearch = () => {
    // TODO: Implement search functionality here
    console.log("Search payload:", {
      destination,
      category,
    });
  };

  return (
    <section className="relative w-full h-full bg-linear-to-b from-violet-400 to-white flex items-center justify-center">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Explore Cities Through the Eyes of a Local
            </h1>
            <p className="text-lg text-slate-600 max-w-xl">
              Discover authentic, personalized experiences hosted by verified
              local guides — from hidden food spots to immersive cultural tours.
            </p>

            {/* Search Card */}
            <Card className="shadow-lg">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      className="pl-9"
                      placeholder="Where are you going?"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                    />
                  </div>

                  <Input
                    placeholder="Category (Food, History…)"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />

                  <Button onClick={handleSearch} className="w-full col-span-2">
                    <Search className="mr-2 h-4 w-4" />
                    Explore Tours
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 text-sm text-slate-500">
              <span>✔ Verified Local Guides</span>
              <span>✔ Secure Bookings</span>
              <span>✔ Rated by Travelers</span>
            </div>
          </div>

          {/* Right Visual Placeholder */}
          <div className="hidden lg:flex justify-center">
            <div className="relative w-105 h-105 rounded-2xl bg-slate-100 shadow-inner flex items-center justify-center text-slate-400">
              <Image
                src={"/HeroSection.jpg"}
                alt="Image"
                width={420}
                height={420}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
