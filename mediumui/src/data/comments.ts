export interface Comment {
  id: string;
  articleId: string;
  userId: string;
  content: string;
  createdAt: string;
  claps: number;
  parentId?: string;
}

export const comments: Comment[] = [
  { id: "1", articleId: "1", userId: "2", content: "This really resonated with me. I've been practicing slow productivity for six months and the difference in my work quality is remarkable.", createdAt: "2026-03-02", claps: 45 },
  { id: "2", articleId: "1", userId: "3", content: "The principle about working at a natural pace is so important. We've lost touch with our natural rhythms.", createdAt: "2026-03-01", claps: 23 },
  { id: "3", articleId: "1", userId: "4", content: "As a founder, I struggle with this constantly. But you're right — the best decisions come from reflection, not reaction.", createdAt: "2026-03-03", claps: 67 },
  { id: "4", articleId: "2", userId: "1", content: "Brilliant piece. Systems thinking changed how I approach everything in my career.", createdAt: "2026-03-01", claps: 34 },
  { id: "5", articleId: "2", userId: "5", content: "The feedback loop concept applies to climate systems too. Everything is connected.", createdAt: "2026-02-28", claps: 19 },
  { id: "6", articleId: "3", userId: "4", content: "We built our entire product strategy around emotional design principles. Game changer.", createdAt: "2026-02-26", claps: 52 },
  { id: "7", articleId: "4", userId: "1", content: "Finally, someone covering the actual innovations happening beyond the headlines.", createdAt: "2026-02-23", claps: 41 },
  { id: "8", articleId: "5", userId: "3", content: "The honesty here is refreshing. Most founder stories skip the painful parts.", createdAt: "2026-02-21", claps: 78 },
];
