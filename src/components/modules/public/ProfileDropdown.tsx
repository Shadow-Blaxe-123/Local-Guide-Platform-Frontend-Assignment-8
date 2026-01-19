"use client";

import Link from "next/link";
import { Settings, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import LogoutButton from "./auth/LogoutButton";
import { UserRole } from "@/types";

export default function ProfileDropdown({
  name,
  pic,
  role,
}: {
  name: string;
  pic: string;
  role: UserRole;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={pic || ""} />
            <AvatarFallback>{name?.[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">John Doe</p>
            <p className="text-xs text-muted-foreground">john@example.com</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href={`/${role.toLowerCase()}/dashboard`}
            className="flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="flex items-center gap-2 text-red-600 focus:text-red-600">
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
