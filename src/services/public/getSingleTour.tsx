"use server";

import { ApiResponse, Tour } from "@/types";
import { cookies } from "next/headers";

export async function getSingleTour(id: string): Promise<ApiResponse<Tour>> {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/tour/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      cache: "no-store",
      credentials: "include",
    }
  );
  const data = await response.json();
  console.log(data);
  return data;
}
