export const dynamic = "force-dynamic";
import Footer from "@/components/modules/public/Footer";
import Navbar from "@/components/modules/public/Navbar";
import React from "react";

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Sticky Navbar */}
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default PublicLayout;
