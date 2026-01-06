"use client";
export const dynamic = "force-dynamic";
import AllBookingsCard from "@/components/modules/dashboard/AllBookingsCard";
import { Booking, BookingStatus } from "@/types/tour";
import getAllBookings from "@/services/dashboard/getAllBookings";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import updateBookingStatus from "@/services/dashboard/updateBooking";

export default function GuideBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const data = await getAllBookings();
      setBookings(data.data);
    };
    fetchBookings();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    const data = await updateBookingStatus(id, status);
    if (data.success) {
      toast.success(`Booking ${status.toLowerCase()} successfully`);
    } else {
      toast.error(data.message || "Failed to update booking");
      return null;
    }
    const updated = data.data;
    if (updated) {
      setBookings((prev) =>
        prev.map((b) =>
          b.id === id ? { ...b, status: status as BookingStatus } : b
        )
      );
    }
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">All Bookings</h1>
        <p className="text-muted-foreground mt-1">Overview of all bookings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="flex flex-col space-y-2">
            {/* Booking Card */}
            <AllBookingsCard booking={booking} />

            {/* Accept / Cancel buttons only for pending bookings */}
            {booking.status === "PENDING" && (
              <div className="flex gap-2 self-end">
                <Button
                  variant="default"
                  onClick={() => handleStatusChange(booking.id!, "CONFIRMED")}
                >
                  Accept
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleStatusChange(booking.id!, "CANCELLED")}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
