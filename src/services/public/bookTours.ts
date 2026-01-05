import { ApiResponse } from "@/types";
import { Booking } from "@/types/tour";

export default async function requestBookingTour(
  tourId: string,
  scheduledAt: string
): Promise<ApiResponse<Booking>> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/booking`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tourId, scheduledAt }),
      credentials: "include",
    }
  );
  const data = await response.json();
  console.log("Booking response:", data);
  return data;
}
