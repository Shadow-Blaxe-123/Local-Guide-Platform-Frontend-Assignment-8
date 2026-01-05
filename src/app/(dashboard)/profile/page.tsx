import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";
import getMe from "@/services/dashboard/getMe";
import getReviews from "@/services/dashboard/getReviews";

export default async function ProfilePage() {
  const res = await getMe();
  const user = res.data;
  const res2 = await getReviews();
  const reviews = res2.data;

  return (
    <div className="max-w-7xl md:w-full mx-auto space-y-8">
      {/* Header */}
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your information
        </p>
      </div>
      <Card>
        <CardContent className="flex flex-col md:flex-row items-center gap-6 p-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.pic || ""} />
            <AvatarFallback>{user.name?.[0]}</AvatarFallback>
          </Avatar>

          <div className="space-y-1 text-center md:text-left">
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
            <Badge variant="secondary" className="mt-2">
              {user.role}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Bio */}
      {user.bio && (
        <Card>
          <CardHeader>
            <CardTitle>Bio</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{user.bio}</p>
          </CardContent>
        </Card>
      )}

      {/* Languages */}
      {user.languagesSpoken && user.languagesSpoken.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Languages Spoken</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {user.languagesSpoken.map((lang) => (
              <Badge key={lang} variant="outline">
                {lang}
              </Badge>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Tourist Section */}
      {user.role === "TOURIST" && user.tourist && (
        <Card>
          <CardHeader>
            <CardTitle>Travel Preferences</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {user.tourist.travelPreferences?.map((pref) => (
              <Badge key={pref}>{pref}</Badge>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Guide Section */}
      {user.role === "GUIDE" && user.guide && (
        <Card>
          <CardHeader>
            <CardTitle>Expertise</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {user.guide.expertise?.map((exp) => (
              <Badge key={exp}>{exp}</Badge>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Reviews */}
      <Card>
        <CardHeader>
          <CardTitle>Reviews Written</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {reviews.length === 0 && (
            <p className="text-muted-foreground">No reviews yet.</p>
          )}

          {reviews.map((review) => (
            <div key={review.id} className="space-y-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: review.rating || 0 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {review.tour?.title && (
                <p className="text-sm font-medium">Tour: {review.tour.title}</p>
              )}

              <p className="text-muted-foreground">{review.comment}</p>

              <Separator />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
