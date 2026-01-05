import { Guide, Tour, Tourist } from ".";

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
  tour: Tour;
  touristId: string;
  tourist: Tourist;
  guideId: string;
  guide: Guide;
  status: BookingStatus;
  scheduledAt: string;
  price: number;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt: string;
  paymentUrl: string;
}
