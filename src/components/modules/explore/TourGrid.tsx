"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tour, UserRole } from "@/types";
import Image from "next/image";
import Link from "next/link";
import DeleteButton from "../dashboard/DeleteButton";
import EditTourDialog from "../dashboard/EditTours";
import CardSkeleton from "./CardSkeleton";

function TourGrid({
  tours,
  role,
  loading,
}: {
  tours: Tour[];
  role: UserRole;
  loading: boolean;
}) {
  const defaultImage = "/no-photo.jpg";
  const canDelete = role === "GUIDE" || role === "ADMIN";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4  gap-8">
      {loading ? (
        Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
      ) : tours.length > 0 ? (
        tours.map((tour) => {
          const images =
            tour.images && tour.images.length > 0
              ? tour.images
              : [defaultImage];

          const avgRating =
            tour.reviews && tour.reviews.length > 0
              ? (
                  tour.reviews.reduce(
                    (acc, r) => acc + (r.rating as number),
                    0
                  ) / tour.reviews.length
                ).toFixed(1)
              : "0.0";

          return (
            <Card
              key={tour.id}
              className="rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              {role === "GUIDE" && <EditTourDialog tour={tour} />}
              {/* Image Carousel */}
              <div className="relative">
                <Carousel className="w-full">
                  <CarouselContent>
                    {images.map((img, idx) => (
                      <CarouselItem key={idx}>
                        <div className="relative h-96 w-full">
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

              {/* Content */}
              <CardContent className="space-y-2 p-4">
                <h3 className="text-lg font-semibold line-clamp-1">
                  {tour.title}
                </h3>

                <p className="text-sm text-muted-foreground line-clamp-3">
                  {tour.description}
                </p>

                <div className="flex justify-between items-center text-sm">
                  <p>
                    {tour.city}, {tour.country}
                  </p>
                  <p>{tour.duration} day(s)</p>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-2 text-yellow-500">
                    <span>⭐ {avgRating}</span>
                    <span className="text-gray-500 text-xs">
                      ({tour.reviews?.length || 0} reviews)
                    </span>
                  </div>
                  <p className="text-green-600 font-bold">${tour.price}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Link href={`/tours/${tour.id}`}>
                    <Button size="sm" className="w-full  bg-blue-800">
                      View Details
                    </Button>
                  </Link>

                  {canDelete && <DeleteButton route={`/tour/${tour.id}`} />}
                </div>
              </CardContent>
            </Card>
          );
        })
      ) : (
        <p className="col-span-3 text-center text-muted-foreground">
          No tours found.
        </p>
      )}
    </div>
  );
}

export default TourGrid;
