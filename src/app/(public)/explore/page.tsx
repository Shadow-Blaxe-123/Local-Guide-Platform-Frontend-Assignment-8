import FilterBar from "@/components/modules/explore/FilterBar";
import TourGrid from "@/components/modules/explore/TourGrid";
import { getAllTours } from "@/services/public/getAllTours";

export default async function ExploreToursPage({
  searchParams,
}: {
  searchParams: Promise<{
    city?: string;
    category?: string;
    maxPrice?: string;
    minPrice?: string;
  }>;
}) {
  const params = await searchParams;

  const qs = new URLSearchParams();

  if (params.city) qs.set("city", params.city);
  if (params.category) qs.set("category", params.category);
  if (params.minPrice) qs.set("minPrice", params.minPrice);
  if (params.maxPrice) qs.set("maxPrice", params.maxPrice);

  console.log("Final query string:", qs.toString());

  const data = await getAllTours(qs.toString());
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        Explore Tours
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="md:sticky md:top-24 h-fit">
          <FilterBar />
        </aside>

        {/* Content */}
        <main>
          <TourGrid tours={data.data} role={"TOURIST"} />
        </main>
      </div>
    </div>
  );
}
