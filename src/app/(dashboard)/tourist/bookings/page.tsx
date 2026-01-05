import AllBookingsCard from "@/components/modules/dashboard/AllBookingsCard";
import getAllBookings from "@/services/dashboard/getAllBookings";

async function TouristBookingsPage() {
  const data = await getAllBookings();
  return (
    <div>
      <AllBookingsCard bookings={data.data} />
    </div>
  );
}

export default TouristBookingsPage;
