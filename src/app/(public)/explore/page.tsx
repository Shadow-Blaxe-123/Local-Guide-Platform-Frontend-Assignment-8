import FilterBar from "@/components/modules/explore/FilterBar";
import TourGrid from "@/components/modules/explore/TourGrid";
import { getAllTours } from "@/services/public/getAllTours";

export default async function ExploreToursPage() {
  const data = await getAllTours();
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        Explore Tours
      </h1>
      <FilterBar />
      <TourGrid tours={data.data} />
    </div>
  );
}
