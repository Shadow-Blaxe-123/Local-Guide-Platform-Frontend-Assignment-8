import * as React from "react";
import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { getUserInfo } from "@/services/auth/getUserinfo";
import LogoutButton from "./modules/public/auth/LogoutButton";

interface NavItem {
  title: string;
  url: string;
}

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const navMain: NavItem[] = [];

  const user = await getUserInfo();

  if (user?.role === "TOURIST") {
    navMain.push(
      {
        title: "Dashboard",
        url: "/tourist/dashboard",
      },
      {
        title: "My Bookings",
        url: "/tourist/bookings",
      },
      {
        title: "Profile",
        url: "/profile",
      }
    );
  }
  if (user?.role === "GUIDE") {
    navMain.push(
      {
        title: "Dashboard",
        url: "/guide/dashboard",
      },
      {
        title: "My Bookings",
        url: "/guide/bookings",
      },
      {
        title: "My Tours",
        url: "/guide/tours",
      },
      {
        title: "Profile",
        url: "/profile",
      }
    );
  }
  if (user?.role === "ADMIN") {
    navMain.push(
      {
        title: "Dashboard",
        url: "/admin/dashboard",
      },
      {
        title: "Tours",
        url: "/admin/tours",
      },
      {
        title: "Manage Users",
        url: "/admin/users",
      },
      {
        title: "Manage Bookings",
        url: "/admin/booking",
      },
      {
        title: "Profile",
        url: "/profile",
      }
    );
  }
  console.log(user);
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/" className="flex items-center space-x-2">
                <Image src="/logo.png" alt="logo" width={32} height={32} />
                <span className="text-xl font-bold text-purple-400">
                  Guidely
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <LogoutButton />
      </SidebarFooter>
    </Sidebar>
  );
}
