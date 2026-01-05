/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import {
  registerGuideValidationSchema,
  registerTouristValidationSchema,
} from "@/types/schema/auth.zod";
import loginUser from "./loginUser";
import { parseArrayFields } from "@/lib/parseArrayFields";

export default async function registerUser(
  currentState: any,
  formData: FormData
): Promise<any> {
  try {
    const role = formData.get("role");

    if (role !== "tourist" && role !== "guide") {
      return {
        success: false,
        message: "Invalid role",
      };
    }

    const languagesSpoken: string[] = parseArrayFields(
      formData.get("languagesSpoken")
    );

    let validatedData: any;
    let endpoint = "";

    /* -------------------- TOURIST -------------------- */
    if (role === "tourist") {
      const travelPreferences = parseArrayFields(
        formData.get("travelPreferences")
      );

      const validationResult = registerTouristValidationSchema.safeParse({
        name: formData.get("name"),
        contactNumber: formData.get("contactNumber"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
        bio: formData.get("bio"),
        languagesSpoken,
        travelPreferences,
      });

      if (!validationResult.success) {
        return {
          success: false,
          errors: validationResult.error.issues.map((issue: any) => ({
            field: issue.path[0] ?? "_form",
            message: issue.message,
          })),
          values: Object.fromEntries(formData),
        };
      }

      validatedData = {
        ...validationResult.data,
        travelPreferences,
      };

      endpoint = "/user/create-tourist";
    }

    /* -------------------- GUIDE -------------------- */
    if (role === "guide") {
      const expertise = parseArrayFields(formData.get("expertise"));
      const dailyRate = Number(formData.get("dailyRate"));

      const validationResult = registerGuideValidationSchema.safeParse({
        name: formData.get("name"),
        contactNumber: formData.get("contactNumber"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
        bio: formData.get("bio"),
        languagesSpoken,
        expertise,
        dailyRate,
      });

      if (!validationResult.success) {
        return {
          success: false,
          errors: validationResult.error.issues.map((issue: any) => ({
            field: issue.path[0] ?? "_form",
            message: issue.message,
          })),
          values: Object.fromEntries(formData),
        };
      }

      validatedData = {
        ...validationResult.data,
        expertise,
        dailyRate,
      };

      endpoint = "/user/create-guide";
    }

    /* -------------------- BACKEND PAYLOAD -------------------- */

    const payload = {
      password: validatedData.password,
      name: validatedData.name,
      contactNumber: validatedData.contactNumber,
      email: validatedData.email,
      bio: validatedData.bio,
      languagesSpoken,
      ...(role === "tourist" && {
        travelPreferences: validatedData.travelPreferences,
      }),
      ...(role === "guide" && {
        expertise: validatedData.expertise,
        dailyRate: validatedData.dailyRate,
      }),
    };

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(payload));

    const file = formData.get("file");
    if (file instanceof File && file.size > 0) {
      newFormData.append("file", file);
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}`,
      {
        method: "POST",
        body: newFormData,
      }
    );

    const result = await res.json();

    if (result.success) {
      await loginUser(currentState, formData);
    }

    return result;
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
          : "Register failed, please try again later.",
    };
  }
}
