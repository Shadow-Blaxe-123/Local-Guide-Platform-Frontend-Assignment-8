"use client";

import { Button } from "@/components/ui/button";
import { getCookie } from "@/lib/tokenHandler";
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
      const accessToken = await getCookie("accessToken");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/tourist/${bookingId}`,
        {
          method: "PATCH",
          credentials: "include",
          body: JSON.stringify({ status: "COMPLETED" }),
          headers: {
            "Content-Type": "application/json",
            Authorization: ` ${accessToken}`,
          },
        }
      );
      const res = await response.json();
      if (res.success) {
        toast.success("Tour completed successfully");
        router.refresh();
      } else if (
        res.message ===
        "You cannot complete the tour before its scheduled date."
      ) {
        toast.error(res.message);
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
