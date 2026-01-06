"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { TourCategory, TourStatus } from "@/types/tour";
import z from "zod";
import { useRouter } from "next/navigation";
import { Tour } from "@/types";
import Image from "next/image";
import { Edit2 } from "lucide-react";
import { getCookie } from "@/lib/tokenHandler";

interface EditTourDialogProps {
  tour: Tour; // pass the tour object to edit
  onUpdate?: () => void; // optional callback after successful update
}

export default function EditTourDialog({
  tour,
  onUpdate,
}: EditTourDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(tour.title);
  const [description, setDescription] = useState(tour.description || "");
  const [itinerary, setItinerary] = useState(tour.itinerary || "");
  const [category, setCategory] = useState<TourCategory>(
    tour.category as TourCategory
  );
  const [price, setPrice] = useState<number | "">(tour.price as number);
  const [city, setCity] = useState(tour.city || "");
  const [country, setCountry] = useState(tour.country || "");
  const [meetingPoint, setMeetingPoint] = useState(tour.meetingPoint || "");
  const [duration, setDuration] = useState<number | "">(
    tour.duration as number
  );
  const [maxGroupSize, setMaxGroupSize] = useState<number | "">(
    tour.maxGroupSize || 1
  );
  const [status, setStatus] = useState<TourStatus>(tour.status as TourStatus);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const TourStatusEnum = z.enum(["ACTIVE", "INACTIVE"]);
  const TourCategoryEnum = z.enum([
    "ADVENTURE",
    "CULTURAL",
    "RELIGIOUS",
    "FOOD",
    "NATURE",
    "HISTORICAL",
    "OTHER",
  ]);

  const updateTourSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string(),
    itinerary: z.string(),
    category: TourCategoryEnum,
    price: z.number().positive("Price must be a positive integer"),
    city: z.string().min(2, "City is required"),
    country: z.string().min(2, "Country is required"),
    meetingPoint: z.string().min(3, "Meeting point is required"),
    duration: z.number().int().positive("Duration must be a positive integer"),
    maxGroupSize: z
      .number()
      .int()
      .positive("Max group size must be greater than 0")
      .default(1),
    status: TourStatusEnum.optional().default("ACTIVE"),
    deletedImages: z.array(z.string()).optional(),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewImages(Array.from(e.target.files));
    }
  };

  const handleRemoveExistingImage = (imgUrl: string) => {
    setDeletedImages((prev) => [...prev, imgUrl]);
  };

  const handleSubmit = async () => {
    const data = {
      title,
      description,
      itinerary,
      category,
      price: Number(price),
      city,
      country,
      meetingPoint,
      duration: Number(duration),
      maxGroupSize: Number(maxGroupSize) || 1,
      status,
      deletedImages,
    };

    // Validate input
    const parsed = updateTourSchema.safeParse(data);
    if (!parsed.success) {
      parsed.error.issues.forEach((issue) => toast.error(issue.message));
      return;
    }

    setLoading(true);

    // Prepare FormData for files
    const formData = new FormData();
    formData.append("data", JSON.stringify(parsed.data));
    newImages.forEach((file) => formData.append("files", file));

    try {
      const accessToken = await getCookie("accessToken");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/tour/${tour.id}`,
        {
          method: "PATCH",
          body: formData,
          credentials: "include",
          cache: "no-store",
          headers: {
            Authorization: ` ${accessToken}`,
          },
        }
      );
      const res = await response.json();
      console.log(res);
      if (res.success) {
        toast.success("Tour updated successfully!");
        router.refresh();
        setOpen(false);
        if (onUpdate) onUpdate();
      } else {
        toast.error("Failed to update tour");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update tour");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="w-fit ml-4">
          <Edit2 />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Tour</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Title & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={category}
                onValueChange={(val) => setCategory(val as TourCategory)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {TourCategoryEnum.options.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description & Itinerary */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="itinerary">Itinerary</Label>
            <Textarea
              id="itinerary"
              value={itinerary}
              onChange={(e) => setItinerary(e.target.value)}
            />
          </div>

          {/* Price & Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.valueAsNumber)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (hours)</Label>
              <Input
                id="duration"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.valueAsNumber)}
              />
            </div>
          </div>

          {/* City & Country */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
          </div>

          {/* Meeting Point & Max Group Size */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="meetingPoint">Meeting Point</Label>
              <Input
                id="meetingPoint"
                value={meetingPoint}
                onChange={(e) => setMeetingPoint(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxGroupSize">Max Group Size</Label>
              <Input
                id="maxGroupSize"
                type="number"
                value={maxGroupSize}
                onChange={(e) => setMaxGroupSize(e.target.valueAsNumber)}
              />
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={status}
              onValueChange={(val) => setStatus(val as TourStatus)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {TourStatusEnum.options.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Existing Images */}
          {tour.images && tour.images.length > 0 && (
            <div className="space-y-2">
              <Label>Existing Images</Label>
              <div className="flex flex-wrap gap-2">
                {tour.images
                  .filter((img) => !deletedImages.includes(img))
                  .map((img) => (
                    <div key={img} className="relative">
                      <Image
                        src={img}
                        alt="tour"
                        className="w-24 h-24 object-cover rounded"
                        width={96}
                        height={96}
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute top-0 right-0"
                        onClick={() => handleRemoveExistingImage(img)}
                      >
                        X
                      </Button>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* New Images */}
          <div className="space-y-2">
            <Label htmlFor="images">Add Images</Label>
            <Input
              id="images"
              type="file"
              multiple
              onChange={handleFileChange}
            />
            {newImages.length > 0 && (
              <p className="text-sm text-muted-foreground">
                {newImages.length} new image(s) selected
              </p>
            )}
          </div>

          <Button className="w-full" onClick={handleSubmit} disabled={loading}>
            {loading ? "Updating..." : "Update Tour"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
