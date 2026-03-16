export interface NotificationItem {
  id: string;
  actorId: string;
  articleId?: string;
  message: string;
  createdAt: string;
  bucket: "for-you" | "featured";
  unread?: boolean;
}

export const notifications: NotificationItem[] = [
  {
    id: "n1",
    actorId: "3",
    articleId: "4",
    message: "published a new story",
    createdAt: "2025-11-07T10:15:00Z",
    bucket: "for-you",
    unread: true,
  },
  {
    id: "n2",
    actorId: "1",
    articleId: "2",
    message: "recommended a story for you",
    createdAt: "2025-10-21T08:30:00Z",
    bucket: "for-you",
    unread: true,
  },
  {
    id: "n3",
    actorId: "4",
    articleId: "6",
    message: "highlighted this read",
    createdAt: "2025-09-15T14:05:00Z",
    bucket: "featured",
  },
  {
    id: "n4",
    actorId: "2",
    articleId: "3",
    message: "shared a story you might like",
    createdAt: "2025-08-30T19:40:00Z",
    bucket: "for-you",
  },
  {
    id: "n5",
    actorId: "5",
    articleId: "1",
    message: "published a featured story",
    createdAt: "2025-08-12T11:10:00Z",
    bucket: "featured",
  },
  {
    id: "n6",
    actorId: "1",
    articleId: "5",
    message: "posted a new collection",
    createdAt: "2025-07-02T07:55:00Z",
    bucket: "featured",
  },
];
