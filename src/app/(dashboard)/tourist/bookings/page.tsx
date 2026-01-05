import AllBookingsCard from "@/components/modules/dashboard/AllBookingsCard";
import ReviewDialog from "@/components/modules/dashboard/ReviewPopup";
import getAllBookings from "@/services/dashboard/getAllBookings";
import { Booking } from "@/types/tour";

async function TouristBookingsPage() {
  const data = await getAllBookings();
  const bookings = data.data as Booking[];
  return (
    <div className="p-4">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
        <p className="text-muted-foreground mt-1">Overview of your bookings</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          <div key={booking.id} className="flex flex-col space-y-2">
            {/* Booking Card */}
            <AllBookingsCard booking={booking} />

            {/* Review Button */}
            <div className="self-end">
              <ReviewDialog
                bookingStatus={booking.status}
                tourId={booking.tourId || ""}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TouristBookingsPage;
