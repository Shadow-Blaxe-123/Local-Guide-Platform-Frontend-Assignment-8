"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";
import { Review, User } from "@/types";
import updateUser from "@/services/dashboard/updateUser";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ProfileClient({
  user,
  reviews,
}: {
  user: User;
  reviews: Review[];
}) {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState({
    name: user.name ?? "",
    bio: user.bio ?? "",
    languagesSpoken: user.languagesSpoken?.join(", ") ?? "",
    travelPreferences: user.tourist?.travelPreferences?.join(", ") ?? "",
    expertise: user.guide?.expertise?.join(", ") ?? "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("bio", form.bio);
    formData.append("languagesSpoken", form.languagesSpoken);

    if (user.role === "TOURIST") {
      formData.append("travelPreferences", form.travelPreferences);
    }

    if (user.role === "GUIDE") {
      formData.append("expertise", form.expertise);
    }

    const res = await updateUser(null, formData, user);
    console.log(res);

    if (res?.success) {
      setIsEditing(false);
      toast.success("Profile updated successfully.");
      router.refresh();
    }
  };

  return (
    <div className="w-full px-10 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">
            Manage your personal information
          </p>
        </div>

        <Button
          variant={isEditing ? "secondary" : "default"}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      {/* Basic Info */}
      <Card>
        <CardContent className="flex flex-col md:flex-row items-center gap-6 p-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.pic || ""} />
            <AvatarFallback>{user.name?.[0]}</AvatarFallback>
          </Avatar>

          <div className="space-y-2 w-full">
            {isEditing ? (
              <Input name="name" value={form.name} onChange={handleChange} />
            ) : (
              <h1 className="text-3xl font-bold">{user.name}</h1>
            )}

            <p className="text-muted-foreground">{user.email}</p>

            <Badge variant="secondary">{user.role}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Bio */}
      <Card>
        <CardHeader>
          <CardTitle>Bio</CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself"
            />
          ) : (
            <p className="text-muted-foreground">
              {user.bio || "No bio provided"}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Languages */}
      <Card>
        <CardHeader>
          <CardTitle>Languages Spoken</CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Input
              name="languagesSpoken"
              value={form.languagesSpoken}
              onChange={handleChange}
              placeholder="English, Spanish, French"
            />
          ) : (
            <div className="flex flex-wrap gap-2">
              {user.languagesSpoken?.map((lang: string) => (
                <Badge key={lang} variant="outline">
                  {lang}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tourist */}
      {user.role === "TOURIST" && (
        <Card>
          <CardHeader>
            <CardTitle>Travel Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Input
                name="travelPreferences"
                value={form.travelPreferences}
                onChange={handleChange}
                placeholder="Beaches, Mountains, Food"
              />
            ) : (
              <div className="flex gap-2 flex-wrap">
                {user.tourist?.travelPreferences?.map((p: string) => (
                  <Badge key={p}>{p}</Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Guide */}
      {user.role === "GUIDE" && (
        <Card>
          <CardHeader>
            <CardTitle>Expertise</CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Input
                name="expertise"
                value={form.expertise}
                onChange={handleChange}
                placeholder="Adventure, Hiking, History"
              />
            ) : (
              <div className="flex gap-2 flex-wrap">
                {user.guide?.expertise?.map((e: string) => (
                  <Badge key={e}>{e}</Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Save */}
      {isEditing && (
        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
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
              <div className="flex gap-1">
                {Array.from({ length: review.rating || 0 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-sm font-medium">Tour: {review.tour?.title}</p>
              <p className="text-muted-foreground">{review.comment}</p>
              <Separator />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
