"use server";

import { cookies } from "next/headers";
import { ApiResponse } from "@/types";
import { Booking } from "@/types/tour";

export default async function getAllBookings(): Promise<
  ApiResponse<Booking[]>
> {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/all`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader, // ✅ THIS is what fixes auth
      },
      cache: "no-store",
    }
  );

  const data = await response.json();
  return data;
}
