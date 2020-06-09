export type Video = {
  id: number;
  videoId: string;
  channelId: string;
  title: string;
  description: string;
  lengthSeconds: number;
  viewCount: number;
  averageRating: number;
  thumbnailUrl: string;
  category: string;
  isPrivate: boolean;
  publishDate: string;
  uploadDate: string;
  liveStartedAt: string;
  liveEndedAt: string;
  createdAt: string;
  updatedAt: string;
  totalPurchaseAmounts: TotalPurchaseAmount[];
};

export type TotalPurchaseAmount = {
  currencyUnit: string;
  totalPurchaseAmount: number;
};
