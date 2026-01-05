"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

function BookingToast() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("payment") === "success") {
      toast.success("You have booked the tour successfully.");

      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("payment");
      router.replace(newUrl.toString());
    } else if (searchParams.get("payment") === "cancelled") {
      toast.error("You have cancelled the payment.");

      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("payment");
      router.replace(newUrl.toString());
    }
  }, [searchParams, router]);
  return null;
}
export default BookingToast;
