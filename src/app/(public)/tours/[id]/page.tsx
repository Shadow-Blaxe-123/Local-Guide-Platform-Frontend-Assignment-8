import TourDetail from "@/components/modules/explore/TourDetails";
import { getUserInfo } from "@/services/auth/getUserinfo";
import { getSingleTour } from "@/services/public/getSingleTour";

async function TourPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getSingleTour(id);
  const user = await getUserInfo();
  return (
    <div>
      <TourDetail tour={data.data} user={user} />
    </div>
  );
}

export default TourPage;
