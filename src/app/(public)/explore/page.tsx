import FilterBar from "@/components/modules/explore/FilterBar";
import Pagination from "@/components/modules/explore/Pagination";
import TourGrid from "@/components/modules/explore/TourGrid";
import { getAllTours } from "@/services/public/getAllTours";
import { Suspense } from "react";

export default async function ExploreToursPage({
  searchParams,
}: {
  searchParams: Promise<{
    city?: string;
    category?: string;
    maxPrice?: string;
    minPrice?: string;
    sort?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;

  const qs = new URLSearchParams();

  if (params.city) qs.set("city", params.city);
  if (params.category) qs.set("category", params.category);
  if (params.minPrice) qs.set("minPrice", params.minPrice);
  if (params.maxPrice) qs.set("maxPrice", params.maxPrice);
  if (params.sort) {
    qs.set("sortBy", "price");
    qs.set("sort", params.sort);
  }

  const page = parseInt(params.page ?? "1", 10);
  qs.set("page", page.toString());
  console.log("Final query string:", qs.toString());

  const data = await getAllTours(qs.toString());
  if (!data.meta) {
    throw new Error("No Meta");
  }
  const totalPages = Math.ceil(data.meta.total / data.meta.limit);
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        Explore Tours
      </h1>
      <div className="grid grid-cols-1 gap-8">
        <FilterBar />

        {/* Content */}
        <main>
          <Suspense
            fallback={<TourGrid tours={[]} role="TOURIST" loading={true} />}
          >
            <TourGrid tours={data.data} role={"TOURIST"} loading={false} />
          </Suspense>
          <Pagination currentPage={data.meta.page} totalPages={totalPages} />
        </main>
      </div>
    </div>
  );
}
