import { ApiResponse } from "@/types";
import { Booking } from "@/types/tour";
import { cookies } from "next/headers";

export default async function requestBookingTour(
  tourId: string,
  scheduledAt: string
): Promise<ApiResponse<Booking>> {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/booking`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      body: JSON.stringify({ tourId, scheduledAt }),
      credentials: "include",
    }
  );
  const data = await response.json();
  console.log("Booking response:", data);
  return data;
}
