export type UserStatus = "ACTIVE" | "INACTIVE" | "DELETED";

export type TourStatus = "ACTIVE" | "INACTIVE";

export type TourCategory =
  | "ADVENTURE"
  | "CULTURAL"
  | "RELIGIOUS"
  | "FOOD"
  | "NATURE"
  | "HISTORICAL"
  | "OTHER";

export type BookingStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";

export type PaymentStatus = "PENDING" | "COMPLETED" | "CANCELLED" | "REFUNDED";
export interface Booking {
  id: string;
  tourId: string;
  touristId: string;
  guideId: string;
  status: BookingStatus;
  scheduledAt: string;
  price: number;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt: string;
  paymentUrl: string;
}
