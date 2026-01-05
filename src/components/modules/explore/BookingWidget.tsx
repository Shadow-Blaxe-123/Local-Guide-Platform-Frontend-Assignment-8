"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { UserInfo } from "@/types";
import { redirect } from "next/navigation";
import requestBookingTour from "@/services/public/bookTours";

interface BookingRequestDialogProps {
  tourId: string;
  user: UserInfo | null;
}

export default function BookingWidget({
  tourId,
  user,
}: BookingRequestDialogProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const checkUserLoggedIn = () => {
    if (!user) {
      redirect("/login?redirect=/tours/" + tourId);
    }
  };
  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select both date and time for the tour");
      return;
    }

    const [hours, minutes] = selectedTime.split(":").map(Number);
    const scheduledAt = new Date(selectedDate);
    scheduledAt.setHours(hours, minutes);

    setLoading(true);

    try {
      console.log("Booking request payload:", {
        tourId,
        scheduledAt: scheduledAt.toISOString(),
      });

      const res = await requestBookingTour(tourId, scheduledAt.toISOString());
      if (res.success) {
        toast.success("Booking request sent successfully");
        if (res.data.paymentUrl) {
          window.location.replace(res.data.paymentUrl);
        }
      }
    } catch (error) {
      toast.error("Failed to send booking request");
      console.log("Booking request error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" onClick={checkUserLoggedIn}>
          Request Booking
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request Booking</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Select tour date</Label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date()}
            />
          </div>

          <div className="space-y-2">
            <Label>Select time</Label>
            <input
              type="time"
              className="w-full border rounded-md p-2"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            />
          </div>

          <Button className="w-full" onClick={handleSubmit} disabled={loading}>
            {loading ? "Submitting..." : "Confirm Booking Request"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
