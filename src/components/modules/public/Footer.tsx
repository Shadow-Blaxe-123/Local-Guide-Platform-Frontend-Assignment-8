import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-4 md:px-8">
        {/* Branding / Message */}
        <div className="space-y-1">
          <div className="w-full flex justify-center md:justify-start">
            <Link
              href={"/"}
              className="w-16 grid grid-cols-1 place-items-center"
            >
              <Image src="/logo.png" alt="logo" width={64} height={64} />
              <p className="text-sm font-semibold tracking-tight">Guidely</p>
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">
            Your trusted companion for navigating the world with ease.
          </p>
        </div>

        <Separator className="my-2 bg-gray-400" />

        {/* Footer bottom text */}
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Guidely. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
