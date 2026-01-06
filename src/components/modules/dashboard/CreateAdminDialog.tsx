"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ApiResponse, User } from "@/types";
import { useRouter } from "next/navigation";
import { getCookie } from "@/lib/tokenHandler";

async function createAdmin(payload: {
  name: string;
  email: string;
  password: string;
}): Promise<ApiResponse<User>> {
  console.log("Creating admin:", payload);
  // Replace with real API call
  const accessToken = await getCookie("accessToken");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/create-admin`,
    {
      body: JSON.stringify(payload),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: ` ${accessToken}`,
      },
      credentials: "include",
    }
  );
  return await response.json();
}

export default function CreateAdminDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!name || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    const res = await createAdmin({ name, email, password });
    setLoading(false);

    if (res.success) {
      toast.success(res.message);
      setOpen(false);
      setName("");
      setEmail("");
      setPassword("");
      router.refresh();
    } else {
      toast.error(res.message || "Failed to create admin");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create New Admin</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Admin</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button className="w-full" onClick={handleSubmit} disabled={loading}>
            {loading ? "Creating..." : "Create Admin"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
