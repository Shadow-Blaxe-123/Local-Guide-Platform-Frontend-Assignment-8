"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, User2Icon } from "lucide-react";
import { Review } from "@/types";

const defaultReviews: Review[] = [
  {
    id: "1",

    tourist: { user: { name: "Alice Johnson" } },
    rating: 4,
    comment:
      "An amazing experience! Our guide knew all the hidden spots in the city.",
  },
  {
    id: "2",

    tourist: { user: { name: "Michael Lee" } },
    rating: 5,
    comment: "Very knowledgeable guide and a fun tour. Highly recommend!",
  },
  {
    id: "3",

    tourist: { user: { name: "Sophia Martinez" } },
    rating: 5,

    comment:
      "The tour exceeded our expectations. Friendly and professional guide.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            What Travelers Are Saying
          </h2>
          <p className="text-muted-foreground text-lg mt-2">
            Hear from travelers who enjoyed authentic experiences with our local
            guides.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {defaultReviews.map((review) => (
            <Card key={review.id} className="rounded-2xl shadow-sm">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <User2Icon className="h-12 w-12 rounded-full bg-slate-200 p-2 text-slate-400" />
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < (review.rating as number)
                            ? "text-yellow-400 fill-amber-300"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  &quot;{review.comment}&quot;
                </p>
                <h4 className="text-sm font-medium text-slate-900">
                  - {review.tourist?.user?.name}
                </h4>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
