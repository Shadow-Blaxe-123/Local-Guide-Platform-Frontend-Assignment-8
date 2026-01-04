"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, User2Icon } from "lucide-react";
import Image from "next/image";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  avatarUrl?: string;
}

const defaultReviews: Review[] = [
  {
    id: 1,
    name: "Alice Johnson",
    rating: 5,
    comment:
      "An amazing experience! Our guide knew all the hidden spots in the city.",
    avatarUrl: "/default-avatar.png",
  },
  {
    id: 2,
    name: "Michael Lee",
    rating: 4,
    comment: "Very knowledgeable guide and a fun tour. Highly recommend!",
    avatarUrl: "/default-avatar.png",
  },
  {
    id: 3,
    name: "Sophia Martinez",
    rating: 5,
    comment:
      "The tour exceeded our expectations. Friendly and professional guide.",
    avatarUrl: "/default-avatar.png",
  },
];

export default function TestimonialsSection() {
  // TODO: Fetch reviews from backend API
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews?minRating=4`
        );
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setReviews(
            data.slice(0, 3).map((review: Review) => ({
              ...review,
              avatarUrl: review.avatarUrl || "/default-avatar.png",
            }))
          );
        } else {
          setReviews(defaultReviews);
        }
      } catch (err) {
        console.error("Failed to fetch reviews", err);
        setReviews(defaultReviews);
      }
    }

    fetchReviews();
  }, []);

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
          {reviews.map((review) => (
            <Card key={review.id} className="rounded-2xl shadow-sm">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  {/* <Image
                    width={48}
                    height={48}
                    src={}
                    alt={review.name}
                    className="h-12 w-12 rounded-full object-cover"
                  /> */}
                  <User2Icon className="h-12 w-12 rounded-full bg-slate-200 p-2 text-slate-400" />
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < review.rating
                            ? "text-yellow-400"
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
                  - {review.name}
                </h4>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
