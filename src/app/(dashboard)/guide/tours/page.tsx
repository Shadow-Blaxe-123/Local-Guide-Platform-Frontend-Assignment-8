import CreateTourDialog from "@/components/modules/dashboard/CreateTour";
import TourGrid from "@/components/modules/explore/TourGrid";
import { getAllTours } from "@/services/public/getAllTours";

async function ToursPage() {
  const data = await getAllTours("");
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        My Tours
      </h1>
      <CreateTourDialog />
      {/* Content */}
      <main>
        <TourGrid tours={data.data} role="GUIDE" />
      </main>
    </div>
  );
}

export default ToursPage;
