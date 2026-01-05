"use server";

import { ApiResponse, Tour } from "@/types";

export async function getSingleTour(id: string): Promise<ApiResponse<Tour>> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/tour/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      credentials: "include",
    }
  );
  const data = await response.json();
  console.log(data);
  return data;
}
