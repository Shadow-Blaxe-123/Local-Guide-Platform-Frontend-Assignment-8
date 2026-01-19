"use server";

import { ApiResponse, Tour } from "@/types";
import { cookies } from "next/headers";

export async function getAllTours(query: string): Promise<ApiResponse<Tour[]>> {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
  console.log(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tour/all?${query}`);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/tour/all?${query}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader, // ✅ THIS is what fixes auth
      },
      cache: "no-store",
      credentials: "include",
    },
  );
  const data = await response.json();
  console.log("Fetched tours:", data);
  return data;
}
