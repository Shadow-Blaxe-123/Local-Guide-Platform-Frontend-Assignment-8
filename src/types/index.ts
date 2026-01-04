export type UserRole = "TOURIST" | "GUIDE" | "ADMIN";

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data: T | T[];
}

export interface Review {
  id?: string;
  tourId?: string;
  touristId?: string;
  guideId?: string;
  rating?: number;
  comment?: string;
  createdAt?: string;
  updatedAt?: string;
  tour?: Tour;
  guide?: Guide;
  tourist?: Tourist;
}

export interface Tour {
  id?: string;
  guideId?: string;
  title?: string;
  description?: string;
  itinerary?: string;
  category?: string;
  price?: number;
  city?: string;
  country?: string;
  meetingPoint?: string;
  duration?: number;
  maxGroupSize?: number;
  images?: string[];
  status?: string;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Guide {
  id?: string;
  userId?: string;
  expertise?: string[];
  dailyRate?: number;
  earnings?: number;
  avgRating?: number;
  createdAt?: string;
  updatedAt: string;
}

export interface Tourist {
  id?: string;
  userId?: string;
  travelPreferences?: string[];
  refund?: number;
  createdAt?: string;
  updatedAt?: string;
  user?: User;
}

export interface User {
  id?: string;
  email?: string;
  password?: string;
  name?: string;
  pic?: string | null;
  bio?: string | null;
  languagesSpoken?: string[];
  contactNumber?: string | null;
  role?: UserRole;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
