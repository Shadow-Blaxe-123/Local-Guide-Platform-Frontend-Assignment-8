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
import loginUser from "@/services/auth/loginUser";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

const LoginForm = ({ redirect }: { redirect?: string }) => {
  const [state, formAction, ispending] = useActionState(loginUser, null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Demo dropdown state
  const [showDemoDropdown, setShowDemoDropdown] = useState(false);

  const getFieldError = (fieldName: string) => {
    if (state && state.errors) {
      const error = state.errors.find((err: any) => err.field === fieldName);
      return error?.message;
    }
    return null;
  };

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    } else if (state && state.success) {
      toast.success("Logged in successfully!");
    }
  }, [state]);

  // Demo login credentials from .env
  const demoCreds = [
    {
      label: "Admin",
      email: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
      password: process.env.NEXT_PUBLIC_DEMO_PASS,
    },
    {
      label: "Guide",
      email: process.env.NEXT_PUBLIC_GUIDE_EMAIL,
      password: process.env.NEXT_PUBLIC_DEMO_PASS,
    },
    {
      label: "Tourist",
      email: process.env.NEXT_PUBLIC_TOURIST_EMAIL,
      password: process.env.NEXT_PUBLIC_DEMO_PASS,
    },
  ];

  const handleDemoSelect = (user: { email?: string; password?: string }) => {
    if (!user.email || !user.password) return;
    setEmail(user.email);
    setPassword(user.password);
    setShowDemoDropdown(false);
  };

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {getFieldError("password") && (
              <FieldDescription className="text-red-600">
                {getFieldError("password")}
              </FieldDescription>
            )}
          </Field>
        </div>

        {/* Login Button */}
        <FieldGroup className="mt-4">
          <Field>
            <Button type="submit" disabled={ispending}>
              {ispending ? "Logging in..." : "Login"}
            </Button>

            {/* Demo Login Dropdown */}
            <div className="relative mt-3 text-center">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  setShowDemoDropdown((prev) => !prev);
                }}
              >
                Demo Login
              </Button>
              {showDemoDropdown && (
                <div className="absolute z-10 w-full mt-2 bg-white border rounded-md shadow-lg flex flex-col">
                  {demoCreds.map((user) => (
                    <button
                      key={user.label}
                      type="button"
                      className="px-4 py-2 text-left hover:bg-gray-100"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDemoSelect(user);
                      }}
                    >
                      {user.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Links */}
            <FieldDescription className="px-6 text-center flex flex-col mt-3">
              <span>
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-blue-600 hover:underline"
                >
                  Register
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
  );
};

export default LoginForm;
