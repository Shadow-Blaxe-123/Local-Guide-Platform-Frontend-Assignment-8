export interface TouristMetaData {
  bookingCount: number;
  completedCount: number;
  cancelledCount: number;
  refundedAmount: {
    refund: number;
  };
  reviewCount: number;
}
export interface GuideMetaData {
  tourCount: number;
  bookingCount: number;
  reviewCount: number;
  earnings: {
    earnings: number;
  };
}
export interface AdminMetaData {
  guideCount: number;
  touristCount: number;
  tourCount: number;
  bookingCount: number;
  reviewCount: number;
  totalRevenue: number;
}
