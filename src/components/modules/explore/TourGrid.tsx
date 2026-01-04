"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tour } from "@/types";
import Image from "next/image";

function TourGrid() {
  const [tours, setTours] = useState<Tour[]>([]);
  const defaultImage =
    "https://res.cloudinary.com/dxkf3opd2/image/upload/v1765042371/uploads/images/image_1765042368854.jpg";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {tours.length > 0 ? (
        tours.map((tour) => (
          <Card
            key={tour.id}
            className="rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
              <Image
                height={192}
                width={384}
                src={tour.images?.[0] || defaultImage}
                alt={tour.title as string}
                className="object-cover w-full h-full"
              />
              <span className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-md text-xs">
                {tour.category}
              </span>
            </div>

            <CardContent className="space-y-2 p-4">
              <h3 className="text-lg font-semibold">{tour.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {tour.description}
              </p>

              <div className="flex justify-between items-center text-sm">
                <p>
                  {tour.city}, {tour.country}
                </p>
                <p>Duration: {tour.duration} day(s)</p>
              </div>

              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center gap-2 text-yellow-500">
                  <span>
                    ⭐{" "}
                    {tour.reviews && tour.reviews?.length > 0
                      ? (
                          tour.reviews.reduce(
                            (acc, r) => acc + (r.rating as number),
                            0
                          ) / tour.reviews.length
                        ).toFixed(1)
                      : "0.0"}
                  </span>
                  <span className="text-gray-500 text-xs">
                    ({tour.reviews?.length || 0} reviews)
                  </span>
                </div>
                <p className="text-green-600 font-bold">${tour.price}</p>
              </div>

              <Button size="sm" className="w-full mt-2">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="col-span-3 text-center text-muted-foreground">
          No tours found.
        </p>
      )}
    </div>
  );
}

export default TourGrid;
