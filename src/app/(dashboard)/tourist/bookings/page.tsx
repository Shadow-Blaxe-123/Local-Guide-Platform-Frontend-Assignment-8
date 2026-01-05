import MyBookings from "@/components/modules/bookings/GetAllbookings";
import getAllBookings from "@/services/dashboard/getAllBookings";
import React from "react";

async function TouristBookingsPage() {
  const data = await getAllBookings();
  return (
    <div>
      <MyBookings bookings={data.data} />
    </div>
  );
}

export default TouristBookingsPage;
