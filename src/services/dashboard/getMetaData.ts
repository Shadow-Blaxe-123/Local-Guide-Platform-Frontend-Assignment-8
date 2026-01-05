"use server";

import { ApiResponse } from "@/types";
import {
  AdminMetaData,
  GuideMetaData,
  TouristMetaData,
} from "@/types/MetaData";
import { cookies } from "next/headers";

export default async function getMetaData(): Promise<
  ApiResponse<TouristMetaData | AdminMetaData | GuideMetaData>
> {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/meta`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader, // ✅ THIS is what fixes auth
    },
    cache: "no-store",
  });

  const data = await response.json();
  return data;
}
