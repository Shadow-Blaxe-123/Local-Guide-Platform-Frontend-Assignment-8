import StatCard from "@/components/modules/dashboard/StatCard";
import getMetaData from "@/services/dashboard/getMetaData";
import { GuideMetaData } from "@/types/MetaData";

async function GuideDashboardLayout() {
  const res = await getMetaData();
  const data = res.data as GuideMetaData;
  console.log(res);
  const { bookingCount, earnings, reviewCount, tourCount } = data;
  const cardData = [
    { title: "Total Bookings", value: bookingCount },
    { title: "Total Earnings", value: earnings.earnings },

    { title: "Total Tours", value: tourCount },
    { title: "Total Reviews", value: reviewCount },
  ];
  return (
    <div className="space-y-8 m-4">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Guide Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your bookings, earnings, and activity
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

export default GuideDashboardLayout;
