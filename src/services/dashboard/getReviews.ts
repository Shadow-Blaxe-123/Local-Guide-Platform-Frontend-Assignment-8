"use server";

import { cookies } from "next/headers";
import { ApiResponse, Review } from "@/types";

export default async function getReviews(
  query?: string
): Promise<ApiResponse<Review[]>> {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/review/all${
      query ? `?${query}` : ""
    }`,
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
