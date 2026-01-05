"use server";

import { ApiResponse, User } from "@/types";

import { cookies } from "next/headers";

export default async function getAllUsers(): Promise<ApiResponse<User[]>> {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/all`,
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
