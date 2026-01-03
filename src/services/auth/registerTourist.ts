/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import z from "zod";
import loginUser from "./loginUser";

const registerValidationSchema = z
  .object({
    name: z.string().min(1, { error: "Name is required" }),
    contactNumber: z.string(),
    email: z.email({ error: "Invalid email address" }),
    bio: z.string().optional(),
    languagesSpoken: z.array(z.string()).optional(),
    travelPreferences: z.array(z.string()).optional(),
    password: z
      .string()
      .min(6, { error: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { error: "Password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default async function registerTourist(
  currentState: any,
  formData: FormData
): Promise<any> {
  try {
    const rawLanguages = formData.get("languagesSpoken");
    const languagesSpoken =
      typeof rawLanguages === "string" && rawLanguages.trim() !== ""
        ? rawLanguages
            .split(",")
            .map((lang) => lang.trim())
            .filter(Boolean)
        : [];
    const rawTravelPreferences = formData.get("travelPreferences");
    const travelPreferences =
      typeof rawTravelPreferences === "string" &&
      rawTravelPreferences.trim() !== ""
        ? rawTravelPreferences
            .split(",")
            .map((lang) => lang.trim())
            .filter(Boolean)
        : [];

    const validationData = {
      name: formData.get("name"),
      contactNumber: formData.get("contactNumber"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
      bio: formData.get("bio"),
      languagesSpoken,
      travelPreferences,
    };
    const validatedFields = registerValidationSchema.safeParse(validationData);

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.issues.map((issue: any) => {
          return {
            field: issue.path[0] ?? "_form",
            message: issue.message,
          };
        }),
        values: Object.fromEntries(formData),
      };
    }
    const registerData = {
      data: {
        password: formData.get("password"),
        name: formData.get("name"),
        contactNumber: formData.get("contactNumber"),
        email: formData.get("email"),
        bio: formData.get("bio"),
        languagesSpoken,
        travelPreferences,
      },
    };
    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(registerData.data));
    const file = formData.get("file");
    if (file instanceof File && file.size > 0) {
      newFormData.append("file", file);
    }

    const res = await fetch(
      `${process.env.NEXT_BACKEND_URL}/user/create-tourist`,
      {
        method: "POST",
        body: newFormData,
      }
    );
    const result = await res.json();
    console.log("res:", res);

    if (result.success) {
      await loginUser(currentState, formData);
    }

    return result;
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Register failed, please try again later."
      }`,
    };
  }
}
