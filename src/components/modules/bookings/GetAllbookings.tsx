"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { toast } from "sonner";

interface Booking {
  id: string;
  status: string;
  scheduledAt: string;
  price: number;
  paymentStatus: string;
  guide: {
    user: { name: string; pic?: string | null; role: string };
    expertise?: string[];
  };
  tourist: {
    user: { name: string; pic?: string | null; role: string };
  };
  tour: {
    title: string;
    description: string;
    city: string;
    country: string;
    duration: number;
  };
}

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/all`,
          {
            method: "GET",
            credentials: "include",
          }
        ); // replace with your real API
        const data = await res.json();
        if (data.success) {
          setBookings(data.data);
        } else {
          toast.error("Failed to fetch bookings.");
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong while fetching bookings.");
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, []);

  if (loading) return <p className="text-center mt-8">Loading bookings...</p>;
  if (!bookings.length)
    return <p className="text-center mt-8">No bookings found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {bookings.map((booking) => {
        return (
          <Card
            key={booking.id}
            className="shadow-md hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <CardTitle>{booking.tour.title}</CardTitle>
              <CardDescription>
                {booking.tour.city}, {booking.tour.country} •{" "}
                {booking.tour.duration} day(s)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                <strong>Status:</strong> {booking.status}
              </p>
              <p>
                <strong>Scheduled At:</strong>{" "}
                {new Date(booking.scheduledAt).toLocaleString()}
              </p>
              <p>
                <strong>Price:</strong> ${booking.price}
              </p>
              <p>
                <strong>Payment:</strong> {booking.paymentStatus}
              </p>
              <p>
                <strong>Guide:</strong> {booking.guide.user.name}{" "}
                {booking.guide.expertise?.length
                  ? `(${booking.guide.expertise.join(", ")})`
                  : ""}
              </p>
              <p>
                <strong>Tourist:</strong> {booking.tourist.user.name}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
