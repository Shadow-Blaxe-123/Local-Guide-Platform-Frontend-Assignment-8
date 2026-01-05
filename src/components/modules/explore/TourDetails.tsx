"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Globe } from "lucide-react";
import { Review, Tour } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

// This component expects `tour` to be passed from the page (server component)
export default function TourDetail({ tour }: { tour: Tour }) {
  console.log(tour);
  const defaultImage = "/no-photo.jpg";
  const images =
    tour.images && tour.images.length > 0 ? tour.images : [defaultImage];
  return (
    <div className="container mx-auto px-4 py-16 space-y-12">
      {/* HERO */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <Badge className="w-fit">{tour.category}</Badge>
          <h1 className="text-3xl md:text-5xl font-bold">{tour.title}</h1>
          <p className="text-muted-foreground text-lg">{tour.description}</p>

          <div className="flex flex-wrap gap-6 pt-4">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4" />
              {tour.city}, {tour.country}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4" />
              {tour.duration} Day
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4" />
              Max {tour.maxGroupSize} People
            </div>
          </div>

          <div className="pt-6 flex items-center gap-6">
            <span className="text-3xl font-bold">${tour.price}</span>
            <Link
              href={`/booking?${new URLSearchParams({ tourId: tour.id! })}`}
            >
              <Button size="lg">Book This Tour</Button>
            </Link>
          </div>
        </div>

        {/* Image Carousel */}
        <div className="relative">
          <Carousel className="w-full">
            <CarouselContent>
              {images.map((img, idx) => (
                <CarouselItem key={idx}>
                  <div className="relative h-100 w-full">
                    <Image
                      src={img}
                      alt={tour.title as string}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {images.length > 1 && (
              <>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </>
            )}
          </Carousel>

          <span className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-md text-xs z-10">
            {tour.category}
          </span>
        </div>
      </section>

      {/* DETAILS GRID */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* MAIN */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">Itinerary</h2>
              <p className="text-muted-foreground leading-relaxed">
                {tour.itinerary}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">Meeting Point</h2>
              <p className="text-muted-foreground">{tour.meetingPoint}</p>
            </CardContent>
          </Card>
        </div>

        {/* SIDEBAR */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold">Tour Guide</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">Local Expert</p>
                  <p className="text-xs text-muted-foreground">
                    Verified Guide
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold">Quick Facts</h3>
              <ul className="text-sm space-y-2">
                <li>City: {tour.city}</li>
                <li>Category: {tour.category}</li>
                <li>Duration: {tour.duration} Day</li>
                <li>Status: {tour.status}</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
      {/* REVIEWS SECTION */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Reviews</h2>

        {tour.reviews && tour.reviews.length > 0 ? (
          <div className="space-y-4">
            {tour.reviews.map((review: Review) => (
              <Card key={review.id}>
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">
                      {review.tourist?.user?.name ?? "Anonymous Tourist"}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {review.rating} / 5
                    </div>
                  </div>

                  {review.comment && (
                    <p className="text-muted-foreground leading-relaxed">
                      {review.comment}
                    </p>
                  )}

                  {review.createdAt && (
                    <p className="text-xs text-muted-foreground">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-muted-foreground">
              No reviews yet. Be the first to review this tour.
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}
