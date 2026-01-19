/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { parseArrayFields } from "@/lib/parseArrayFields";
import { User } from "@/types";
import { cookies } from "next/headers";

export default async function updateUser(
  currentState: any,
  formData: FormData,
  user: User,
): Promise<any> {
  try {
    if (!user.role) {
      return {
        success: false,
        message: "Role is required",
      };
    }

    /* -------------------- COMMON FIELDS -------------------- */
    const languagesSpoken = parseArrayFields(formData.get("languagesSpoken"));

    const payload: any = {
      name: formData.get("name"),
      contactNumber: formData.get("contactNumber"),
      bio: formData.get("bio"),
      languagesSpoken,
    };

    /* -------------------- ROLE-SPECIFIC FIELDS -------------------- */
    if (user.role === "TOURIST") {
      payload.travelPreferences = parseArrayFields(
        formData.get("travelPreferences"),
      );
    }

    if (user.role === "GUIDE") {
      payload.expertise = parseArrayFields(formData.get("expertise"));
      payload.dailyRate = Number(formData.get("dailyRate"));
    }

    /* -------------------- FORM DATA -------------------- */
    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(payload));

    const file = formData.get("file");
    if (file instanceof File && file.size > 0) {
      newFormData.append("file", file);
    }

    /* -------------------- AUTH COOKIE -------------------- */
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    /* -------------------- REQUEST -------------------- */
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${user.id}`,
      {
        method: "PATCH",
        body: newFormData,
        credentials: "include",
        headers: {
          Cookie: cookieHeader,
        },
      },
    );

    return await res.json();
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    console.error(error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Profile update failed. Please try again later.",
    };
  }
}
