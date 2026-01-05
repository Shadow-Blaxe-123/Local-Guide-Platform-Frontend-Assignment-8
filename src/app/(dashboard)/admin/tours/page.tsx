import TourGrid from "@/components/modules/explore/TourGrid";
import { getAllTours } from "@/services/public/getAllTours";
import React from "react";

async function AdminTourPage() {
  const data = await getAllTours("");
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        Manage Tours
      </h1>

      <main>
        <TourGrid tours={data.data} role="ADMIN" />
      </main>
    </div>
  );
}

export default AdminTourPage;
