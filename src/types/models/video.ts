export type Video = {
  id: number;
  videoID: string;
  channelID: string;
  title: string;
  description: string;
  lengthSeconds: number;
  viewCount: number;
  averageRating: number;
  thumbnailURL: string;
  category: string;
  isPrivate: boolean;
  publishDate: string;
  uploadDate: string;
  liveStartedAt: string;
  liveEndedAt: string;
  createdAt: string;
  updatedAt: string;
};
