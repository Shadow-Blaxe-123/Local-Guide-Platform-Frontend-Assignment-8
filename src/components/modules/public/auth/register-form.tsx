/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import registerUser from "@/services/auth/registerUser";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const RegisterForm = ({ role }: { role: "tourist" | "guide" }) => {
  const [state, formAction, ispending] = useActionState(registerUser, null);
  console.log("state:", state, "ispending: ", ispending);
  const getFieldError = (fieldName: string) => {
    if (state && state.errors) {
      const error = state.errors.find(
        (err: any) => err.field === fieldName || err.field === "_form"
      );
      if (error) {
        return error.message;
      } else {
        return null;
      }
    } else {
      return null;
    }
  };
  //Error check
  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);
  return (
    <>
      <form action={formAction}>
        <FieldGroup>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="hidden" name="role" value={role} />
            {/* Name */}
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                defaultValue={state?.values?.name}
              />
              {getFieldError("name") && (
                <FieldDescription className="text-red-600">
                  {getFieldError("name")}
                </FieldDescription>
              )}
            </Field>
            {/* Contact */}
            <Field>
              <FieldLabel htmlFor="contactNumber">Contact Number</FieldLabel>
              <Input
                id="contactNumber"
                name="contactNumber"
                type="text"
                placeholder="123 Main St"
                defaultValue={state?.values?.address}
              />
              {getFieldError("contactNumber") && (
                <FieldDescription className="text-red-600">
                  {getFieldError("contactNumber")}
                </FieldDescription>
              )}
            </Field>
            {/* Email */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john.doe@me.com"
                defaultValue={state?.values?.email}
              />
              {getFieldError("email") && (
                <FieldDescription className="text-red-600">
                  {getFieldError("email")}
                </FieldDescription>
              )}
            </Field>
            {/* Password */}
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" name="password" type="password" />
              {getFieldError("password") && (
                <FieldDescription className="text-red-600">
                  {getFieldError("password")}
                </FieldDescription>
              )}
            </Field>
            {/* Confirm Password */}
            <Field className="md:col-span-2">
              <FieldLabel htmlFor="confirmPassword">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
              />
              {getFieldError("confirmPassword") && (
                <FieldDescription className="text-red-600">
                  {getFieldError("confirmPassword")}
                </FieldDescription>
              )}
            </Field>
            {/* Bio */}
            <Field className="md:col-span-2">
              <FieldLabel htmlFor="bio">Bio</FieldLabel>
              <Input
                id="bio"
                name="bio"
                type="text"
                placeholder="I am wanderer..."
                defaultValue={state?.values?.bio}
              />
              {getFieldError("bio") && (
                <FieldDescription className="text-red-600">
                  {getFieldError("bio")}
                </FieldDescription>
              )}
            </Field>

            {/* Languages Spoken */}
            <Field className="md:col-span-2">
              <FieldLabel htmlFor="languagesSpoken">
                Languages Spoken
              </FieldLabel>
              <Input
                id="languagesSpoken"
                name="languagesSpoken"
                type="text"
                placeholder="English, Bangla"
                defaultValue={state?.values?.languagesSpoken}
              />
              {getFieldError("languagesSpoken") && (
                <FieldDescription className="text-red-600">
                  {getFieldError("languagesSpoken")}
                </FieldDescription>
              )}
            </Field>
            {/* Travel Preferences */}
            {role === "tourist" && (
              <Field className="md:col-span-2">
                <FieldLabel htmlFor="travelPreferences">
                  Travel Preferences
                </FieldLabel>
                <Input
                  id="travelPreferences"
                  name="travelPreferences"
                  type="text"
                  placeholder="Food, Cities"
                  defaultValue={state?.values?.travelPreferences}
                />
                {getFieldError("travelPreferences") && (
                  <FieldDescription className="text-red-600">
                    {getFieldError("travelPreferences")}
                  </FieldDescription>
                )}
              </Field>
            )}
            {/* Guide Fields */}
            {role === "guide" && (
              <>
                <Field>
                  <FieldLabel htmlFor="dailyRate">Daily Rate</FieldLabel>
                  <Input
                    id="dailyRate"
                    name="dailyRate"
                    type="number"
                    step="0.01"
                    placeholder="150.00"
                    defaultValue={state?.values?.dailyRate}
                  />
                  {getFieldError("dailyRate") && (
                    <FieldDescription className="text-red-600">
                      {getFieldError("dailyRate")}
                    </FieldDescription>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="expertise">Expertise</FieldLabel>
                  <Input
                    id="expertise"
                    name="expertise"
                    type="text"
                    placeholder="History, Nature, Adventure"
                    defaultValue={state?.values?.expertise}
                  />
                  {getFieldError("expertise") && (
                    <FieldDescription className="text-red-600">
                      {getFieldError("expertise")}
                    </FieldDescription>
                  )}
                </Field>
              </>
            )}

            {/* pic */}
            <Field className="md:col-span-2">
              <FieldLabel htmlFor="file">Pic </FieldLabel>
              <Input id="file" name="file" type="file" accept="image/*" />
            </Field>
          </div>
          <FieldGroup className="mt-4">
            <Field>
              <Button type="submit" disabled={ispending}>
                {ispending ? "Registering..." : "Register"}
              </Button>
              <FieldDescription className="px-6 text-center grid">
                <span>
                  Already have an account?{" "}
                  <Link href="/login" className="text-blue-600 hover:underline">
                    Sign in
                  </Link>
                </span>
                <span>
                  Or go back to{" "}
                  <Link href="/" className="text-blue-600 hover:underline">
                    Home
                  </Link>
                </span>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldGroup>
      </form>
    </>
  );
};

export default RegisterForm;
