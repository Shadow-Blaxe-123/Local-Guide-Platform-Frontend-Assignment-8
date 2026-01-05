import Link from "next/link";

import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getCookie } from "@/lib/tokenHandler";
import LogoutButton from "./auth/LogoutButton";
import { getUserInfo } from "@/services/auth/getUserinfo";

const Navbar = async () => {
  const accessToken = await getCookie("accessToken");

  const user = await getUserInfo();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "#about", label: "About Us" },
  ];

  if (user?.role === "TOURIST") {
    navItems.push(
      { href: "/explore", label: "Explore Tours" },
      { href: "/tourist/dashboard/bookings", label: "My Bookings" },
      { href: "/tourist/dashboard", label: "Dashboard" },

      { href: "/profile", label: "Profile" }
    );
  } else if (user?.role === "GUIDE") {
    navItems.push(
      { href: "/guide/dashboard", label: "Dashboard" },
      { href: "/profile", label: "Profile" }
    );
  } else if (user?.role === "ADMIN") {
    navItems.push(
      { href: "/admin/dashboard", label: "Dashboard" },
      { href: "/admin/users", label: "Manage Users" },
      { href: "/admin/tours", label: "Manage Listings" },
      { href: "/profile", label: "Profile" }
    );
  } else {
    navItems.push(
      { href: "/explore", label: "Explore Tours" },
      { href: "#becomeAGuide", label: "Become a Guide" }
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 shadow-lg bg-background/95 backdrop-blur  dark:bg-background/95 ">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <span className="text-xl font-bold text-purple-400">Guidely</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-foreground hover:text-blue-400 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-2">
          {accessToken ? (
            <LogoutButton />
          ) : (
            <>
              <Link href="/login" className="text-lg font-medium">
                <Button>Login</Button>
              </Link>
              <Link
                href="/register?role=tourist"
                className="text-lg font-medium"
              >
                <Button>Register</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                {" "}
                <Menu />{" "}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-75 sm:w-100 p-4">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-lg font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-t pt-4 flex flex-col space-y-4">
                  <div className="flex justify-center"></div>
                  <Link href="/login" className="text-lg font-medium">
                    <Button>Login</Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
