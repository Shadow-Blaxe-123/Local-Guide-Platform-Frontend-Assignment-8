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
import { getCookie } from "@/lib/tokenHandler";

interface CreateTourDialogProps {
  onCreate?: () => void; // optional callback after tour creation
}

export default function CreateTourDialog({ onCreate }: CreateTourDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [itinerary, setItinerary] = useState("");
  const [category, setCategory] = useState<TourCategory>("ADVENTURE");
  const [price, setPrice] = useState<number | "">("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [meetingPoint, setMeetingPoint] = useState("");
  const [duration, setDuration] = useState<number | "">("");
  const [maxGroupSize, setMaxGroupSize] = useState<number | "">("");
  const [status, setStatus] = useState<TourStatus>("ACTIVE");
  const [images, setImages] = useState<File[]>([]);
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

  const createTourSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string(),
    itinerary: z.string(),
    category: z.enum([
      "ADVENTURE",
      "CULTURAL",
      "RELIGIOUS",
      "FOOD",
      "NATURE",
      "HISTORICAL",
      "OTHER",
    ]),
    price: z
      .number("Price must be a number")
      .positive("Price must be a positive integer"),
    city: z.string().min(2, "City is required"),
    country: z.string().min(2, "Country is required"),
    meetingPoint: z.string().min(3, "Meeting point is required"),
    duration: z.number().int().positive("Duration must be a positive integer"),
    maxGroupSize: z
      .number()
      .int()
      .positive("Max group size must be greater than 0")
      .default(1),
    status: z.enum(["ACTIVE", "INACTIVE"]).optional().default("ACTIVE"),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
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
    };

    // Validate input
    const parsed = createTourSchema.safeParse(data);
    if (!parsed.success) {
      // parsed.error.issues is the correct property
      parsed.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    setLoading(true);

    // Prepare FormData
    const formData = new FormData();
    formData.append("data", JSON.stringify(parsed.data));
    images.forEach((file) => formData.append("files", file));

    try {
      console.log("Tour payload (FormData):", formData);
      const accessToken = await getCookie("accessToken");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/tour/create`,
        {
          method: "POST",
          headers: {
            Authorization: `${accessToken}`,
          },
          body: formData,
          credentials: "include",
          cache: "no-store",
        }
      );
      const res = await response.json();
      console.log(res);

      toast.success("Tour created successfully!");
      router.refresh();
      setOpen(false);

      // Reset form
      setTitle("");
      setDescription("");
      setItinerary("");
      setPrice("");
      setCity("");
      setCountry("");
      setMeetingPoint("");
      setDuration("");
      setMaxGroupSize("");
      setImages([]);

      if (onCreate) onCreate();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create tour");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Create New Tour</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create a New Tour</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
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

          <div className="space-y-2">
            <Label htmlFor="images">Images</Label>
            <Input
              id="images"
              type="file"
              multiple
              onChange={handleFileChange}
            />
            {images.length > 0 && (
              <p className="text-sm text-muted-foreground">
                {images.length} image(s) selected
              </p>
            )}
          </div>

          <Button className="w-full" onClick={handleSubmit} disabled={loading}>
            {loading ? "Creating..." : "Create Tour"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
