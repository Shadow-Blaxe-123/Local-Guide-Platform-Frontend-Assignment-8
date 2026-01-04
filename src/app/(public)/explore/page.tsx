import FilterBar from "@/components/modules/explore/FilterBar";
import TourGrid from "@/components/modules/explore/TourGrid";

export default function ExploreToursPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        Explore Tours
      </h1>
      <FilterBar />
      <TourGrid />
    </div>
  );
}
