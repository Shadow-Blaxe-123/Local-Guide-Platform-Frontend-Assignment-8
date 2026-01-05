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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import createReview from "@/services/dashboard/createReview";

interface ReviewDialogProps {
  tourId: string;
  bookingStatus: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  rating?: number;
  comment?: string;
}

export default function ReviewDialog({
  tourId,
  bookingStatus,
}: ReviewDialogProps) {
  const [open, setOpen] = useState(false);
  const [userRating, setUserRating] = useState<number>(0);
  const [userComment, setUserComment] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const canReview = bookingStatus === "COMPLETED";

  const handleSubmit = async () => {
    if (!canReview) {
      toast.error("You can only review after completing the tour.");
      return;
    }

    if (userRating < 1 || userRating > 5) {
      toast.error("Rating must be between 1 and 5.");
      return;
    }

    setLoading(true);

    console.log("Review payload:", {
      tourId,
      rating: userRating,
      comment: userComment,
    });
    const res = await createReview({
      tourId,
      rating: userRating,
      comment: userComment,
    });
    setLoading(false);
    if (res.success) {
      toast.success("Review submitted successfully.");
      setOpen(false);
    } else if (res.message === "You have already reviewed this tour.") {
      toast.error(res.message);
    } else {
      console.log("Review error:", res);
      toast.error("Failed to submit review.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={!canReview}
          variant="default"
          className="bg-lime-700 font-black outline-4"
        >
          {canReview ? "Write Review" : "Complete Tour to Review"}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Leave a Review</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rating">Rating (1–5)</Label>
            <Input
              id="rating"
              type="number"
              min={1}
              max={5}
              value={userRating}
              onChange={(e) =>
                setUserRating(Math.min(5, Math.max(1, Number(e.target.value))))
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Comment</Label>
            <Textarea
              id="comment"
              placeholder="Share your experience..."
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
            />
          </div>

          <Button className="w-full" onClick={handleSubmit} disabled={loading}>
            {loading ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
