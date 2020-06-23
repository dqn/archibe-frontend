export type Badge = {
  id: number;
  chatId: string;
  badgeType: 'moderator' | 'member' | 'owner' | 'verified';
  imageUrl: string;
  label: string;
  createdAt: string;
  updatedAt: string;
};
