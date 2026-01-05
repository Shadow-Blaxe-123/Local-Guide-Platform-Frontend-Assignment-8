"use server";

import { cookies } from "next/headers";
import { ApiResponse, User } from "@/types";

export default async function getMe(): Promise<ApiResponse<User>> {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`,
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
