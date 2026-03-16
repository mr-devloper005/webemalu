export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
}

// Seed authors for existing articles - these are NOT login accounts
export const seedUsers: User[] = [
  {
    id: "1",
    name: "Sarah Chen",
    username: "sarahchen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    bio: "Staff writer at The Atlantic. Exploring technology, culture, and the human condition. Previously at Wired and The Verge.",
    followers: 24500,
    following: 342,
  },
  {
    id: "2",
    name: "James Morrison",
    username: "jamesmorrison",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    bio: "Software engineer turned writer. I write about building better products and the philosophy of technology.",
    followers: 18200,
    following: 156,
  },
  {
    id: "3",
    name: "Amara Okafor",
    username: "amaraokafor",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face",
    bio: "UX researcher & designer. Writing about human-centered design, accessibility, and digital ethics.",
    followers: 31800,
    following: 489,
  },
  {
    id: "4",
    name: "David Park",
    username: "davidpark",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    bio: "Founder & CEO. Writing about startups, venture capital, and what it takes to build something meaningful.",
    followers: 52100,
    following: 201,
  },
  {
    id: "5",
    name: "Elena Vasquez",
    username: "elenavasquez",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    bio: "Climate journalist. Covering the intersection of policy, science, and the future of our planet.",
    followers: 15700,
    following: 278,
  },
];

// Helper to get all users (seed + registered)
export function getAllUsers(): User[] {
  try {
    const registered: User[] = JSON.parse(localStorage.getItem("webemalu_registered_users") || "[]");
    return [...seedUsers, ...registered];
  } catch {
    return [...seedUsers];
  }
}

export function getUserById(id: string): User | undefined {
  return getAllUsers().find((u) => u.id === id);
}

export function saveRegisteredUser(user: User) {
  const registered: User[] = JSON.parse(localStorage.getItem("webemalu_registered_users") || "[]");
  const idx = registered.findIndex((u) => u.id === user.id);
  if (idx >= 0) registered[idx] = user;
  else registered.push(user);
  localStorage.setItem("webemalu_registered_users", JSON.stringify(registered));
}

export function updateUserInStorage(user: User) {
  // Check if it's a seed user - seed users can't be edited in storage
  // but registered users can
  const registered: User[] = JSON.parse(localStorage.getItem("webemalu_registered_users") || "[]");
  const idx = registered.findIndex((u) => u.id === user.id);
  if (idx >= 0) {
    registered[idx] = user;
    localStorage.setItem("webemalu_registered_users", JSON.stringify(registered));
  }
}
