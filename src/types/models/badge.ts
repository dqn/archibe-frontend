export type Badge = {
  id: number;
  chatId: string;
  badgeType: 'moderator' | 'member';
  imageUrl: string;
  label: string;
  createdAt: string;
  updatedAt: string;
};
