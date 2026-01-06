"use server";

import { cookies } from "next/headers";

export default async function updateBookingStatus(id: string, status: string) {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/guide/${id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
        body: JSON.stringify({ status }),
        credentials: "include",
      }
    );

    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}
