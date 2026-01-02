"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import loginUser from "@/services/auth/loginUser";
import Link from "next/link";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const LoginForm = ({ redirect }: { redirect?: string }) => {
  const [state, formAction, ispending] = useActionState(loginUser, null);

  const getFieldError = (fieldName: string) => {
    if (state && state.errors) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const error = state.errors.find((err: any) => err.field === fieldName);
      return error.message;
    } else {
      return null;
    }
  };
  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    } else if (state && state.success) {
      toast.success("Logged in successfully!");
    }
  }, [state]);

  return (
    <form action={formAction}>
      <input type="hidden" name="redirect" value={redirect} />
      <FieldGroup>
        <div className="grid grid-cols-1 gap-4">
          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
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
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
            />
            {getFieldError("password") && (
              <FieldDescription className="text-red-600">
                {getFieldError("password")}
              </FieldDescription>
            )}
          </Field>
        </div>
        <FieldGroup className="mt-4">
          <Field>
            <Button type="submit" disabled={ispending}>
              {ispending ? "Logging in..." : "Login"}
            </Button>

            <FieldDescription className="px-6 text-center flex flex-col">
              <p>
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-blue-600 hover:underline"
                >
                  Register
                </Link>
              </p>
              <p>
                Or go back to{" "}
                <Link href="/" className="text-blue-600 hover:underline">
                  Home
                </Link>
              </p>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default LoginForm;
