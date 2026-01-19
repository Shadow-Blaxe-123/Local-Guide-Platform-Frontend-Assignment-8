import ProfileClient from "@/components/modules/dashboard/ProfileClient";
import getMe from "@/services/dashboard/getMe";
import getReviews from "@/services/dashboard/getReviews";

export default async function ProfilePage() {
  const res = await getMe();
  const user = res.data;
  const res2 = await getReviews();
  const reviews = res2.data;

  return <ProfileClient user={user} reviews={reviews} />;
}
