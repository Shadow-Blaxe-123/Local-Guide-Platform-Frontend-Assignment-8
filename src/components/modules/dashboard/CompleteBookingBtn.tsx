"use client";

import { Button } from "@/components/ui/button";
import { BookingStatus } from "@/types/tour";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CompleteBookingButtonProps {
  status: BookingStatus;
  bookingId: string;
}

export default function CompleteBookingButton({
  status,
  bookingId,
}: CompleteBookingButtonProps) {
  const router = useRouter();
  if (status !== "CONFIRMED") return null;
  const handleComplete = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/tourist/${bookingId}`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );
      if (response.ok) {
        toast.success("Tour completed successfully");
        router.refresh();
      }
    } catch (error) {
      console.error("Error completing tour:", error);
    }
  };

  return (
    <Button
      size="sm"
      variant="default"
      className="bg-lime-600"
      onClick={handleComplete}
    >
      Complete
    </Button>
  );
}
