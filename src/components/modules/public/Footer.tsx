import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-gray-200 dark:bg-slate-950 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-4 md:px-8">
        {/* Branding / Message */}
        <div className="space-y-1">
          <div className="w-full flex justify-center md:justify-start">
            <Link href="/" className="w-16 grid grid-cols-1 place-items-center">
              <Image src="/logo.png" alt="logo" width={64} height={64} />
              <p className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                Guidely
              </p>
            </Link>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-400">
            Your trusted companion for navigating the world with ease.
          </p>
        </div>

        <Separator className="my-2 bg-gray-400 dark:bg-slate-800" />

        {/* Footer bottom text */}
        <p className="text-center text-xs text-slate-600 dark:text-slate-500">
          © {new Date().getFullYear()} Guidely. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
