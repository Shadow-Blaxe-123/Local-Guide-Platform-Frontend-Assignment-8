import TourDetail from "@/components/modules/explore/TourDetails";
import { getSingleTour } from "@/services/public/getSingleTour";

async function TourPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getSingleTour(id);
  return (
    <div>
      <TourDetail tour={data.data} />
    </div>
  );
}

export default TourPage;
