import StatCard from "@/components/modules/dashboard/StatCard";
import getMetaData from "@/services/dashboard/getMetaData";
import { TouristMetaData } from "@/types/MetaData";

async function TouristDashboardPage() {
  const res = await getMetaData();
  const data = res.data as TouristMetaData;
  const {
    bookingCount,
    cancelledCount,
    completedCount,
    refundedAmount,
    reviewCount,
  } = data;
  const cardData = [
    { title: "Total Bookings", value: bookingCount },
    { title: "Cancelled Bookings", value: cancelledCount },
    { title: "Completed Bookings", value: completedCount },
    { title: "Refunded Amount", value: refundedAmount.refund },
    { title: "Reviews", value: reviewCount },
  ];

  return (
    <div className="space-y-8 m-4">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tourist Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your bookings, refunds, and activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cardData.map((card, index) => (
          <StatCard key={index} title={card.title} value={card.value} />
        ))}
      </div>
    </div>
  );
}

export default TouristDashboardPage;
