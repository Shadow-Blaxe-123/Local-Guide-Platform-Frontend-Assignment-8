"use server";

import { ApiResponse, Tour } from "@/types";

export async function getAllTours(): Promise<ApiResponse<Tour[]>> {
  const response = await fetch(`${process.env.NEXT_BACKEND_URL}/tour/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const data = await response.json();
  console.log("Fetched tours:", data);
  return data;
}
