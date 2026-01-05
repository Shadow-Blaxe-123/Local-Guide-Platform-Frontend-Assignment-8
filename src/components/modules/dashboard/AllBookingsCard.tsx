import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Booking } from "@/types/tour";

export default function AllBookingsCard({
  bookings,
}: {
  bookings?: Booking[];
}) {
  if (!bookings) {
    throw new Error("Bookings data is required");
  }

  if (bookings.length === 0)
    return <p className="text-center mt-8">No bookings found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {bookings.map((booking) => {
        return (
          <Card
            key={booking.id}
            className="shadow-md hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <CardTitle>{booking.tour.title}</CardTitle>
              <CardDescription>
                {booking.tour.city}, {booking.tour.country} •{" "}
                {booking.tour.duration} day(s)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                <strong>Status:</strong> {booking.status}
              </p>
              <p>
                <strong>Scheduled At:</strong>{" "}
                {new Date(booking.scheduledAt).toLocaleString()}
              </p>
              <p>
                <strong>Price:</strong> ${booking.price}
              </p>
              <p>
                <strong>Payment:</strong> {booking.paymentStatus}
              </p>
              <p>
                <strong>Guide:</strong> {booking.guide.user?.name}{" "}
                {booking.guide.expertise?.length
                  ? `(${booking.guide.expertise.join(", ")})`
                  : ""}
              </p>
              <p>
                <strong>Tourist:</strong> {booking.tourist.user?.name}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
