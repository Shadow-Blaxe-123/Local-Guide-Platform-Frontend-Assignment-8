"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Search } from "lucide-react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const [city, setcity] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    console.log("Search payload:", {
      city,
      category,
    });
    router.push(`/explore?city=${city}&category=${category}`);
  };

  return (
    <section
      className="
  relative w-full h-full
  bg-linear-to-b
  from-violet-700 to-violet-100
  dark:from-violet-950 dark:to-slate-900
  flex items-center justify-center
"
    >
      <div className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight text-violet-100 dark:text-violet-200 sm:text-5xl">
              Explore Cities Through the Eyes of a Local
            </h1>

            <p className="text-lg text-violet-100/90 dark:text-slate-300 max-w-xl">
              Discover authentic, personalized experiences hosted by verified
              local guides — from hidden food spots to immersive cultural tours.
            </p>

            {/* Search Card */}
            <Card className="shadow-lg bg-white dark:bg-slate-900 dark:shadow-none">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                    <Input
                      className="pl-9 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100"
                      placeholder="Which city are you going?"
                      value={city}
                      onChange={(e) => setcity(e.target.value)}
                    />
                  </div>

                  <div>
                    <Select
                      onValueChange={(value) => setCategory(value)}
                      defaultValue=""
                    >
                      <SelectTrigger className="w-full bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-slate-900 dark:text-slate-100">
                        <SelectItem value="CULTURAL">Cultural</SelectItem>
                        <SelectItem value="FOOD">Food</SelectItem>
                        <SelectItem value="ADVENTURE">Adventure</SelectItem>
                        <SelectItem value="RELIGIOUS">Religious</SelectItem>
                        <SelectItem value="NATURE">Nature</SelectItem>
                        <SelectItem value="HISTORICAL">Historical</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={handleSearch} className="w-full col-span-2">
                    <Search className="mr-2 h-4 w-4" />
                    Explore Tours
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 text-sm text-violet-100/80 dark:text-slate-400">
              <span>✔ Verified Local Guides</span>
              <span>✔ Secure Bookings</span>
              <span>✔ Rated by Travelers</span>
            </div>
          </div>

          {/* Right Visual */}
          <div className="hidden lg:flex justify-center">
            <div
              className="
          relative w-105 h-full rounded-2xl
          bg-violet-200 dark:bg-violet-900
          flex items-center justify-center
          shadow-lg dark:shadow-none
          transform duration-500
          hover:translate-x-5 hover:-translate-y-5
          pointer-events-none
        "
            >
              <Image
                src="/HeroSection.jpg"
                alt="Image"
                width={420}
                height={420}
                className="
              rounded-2xl shadow-lg dark:shadow-none
              transform duration-500
              hover:-translate-x-10 hover:translate-y-10
              pointer-events-auto
            "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
