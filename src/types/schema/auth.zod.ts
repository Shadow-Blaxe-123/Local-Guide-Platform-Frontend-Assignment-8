import z from "zod";

export const registerTouristValidationSchema = z
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
export const registerGuideValidationSchema = z
  .object({
    name: z.string().min(1, { error: "Name is required" }),
    contactNumber: z.string(),
    email: z.email({ error: "Invalid email address" }),
    bio: z.string().optional(),
    languagesSpoken: z.array(z.string()).optional(),
    expertise: z.array(z.string()).default([]), // ["History", "Food", ...]
    dailyRate: z.number().min(0).optional(),
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
