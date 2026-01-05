"use server";

import { ApiResponse, Tour } from "@/types";

export async function getAllTours(query: string): Promise<ApiResponse<Tour[]>> {
  console.log(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tour/all?${query}`);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/tour/all?${query}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );
  const data = await response.json();
  console.log("Fetched tours:", data);
  return data;
}
