// ─── Art Hub Types ───────────────────────────────────────────────────

export type ArtCategory = "stories" | "poems" | "drawings" | "digital-art" | "experimental";

export interface ArtistProfile {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  styles: string[];
  followers: number;
  following: number;
  socialLinks: { platform: string; url: string; icon: string }[];
  joinedDate: string;
  location: string;
  featured: boolean;
}

export interface Artwork {
  id: string;
  title: string;
  description: string;
  category: ArtCategory;
  imageUrl: string;
  content?: string; // For stories/poems
  artistId: string;
  artistName: string;
  artistAvatar: string;
  likes: number;
  comments: ArtComment[];
  tags: string[];
  createdAt: string;
  featured: boolean;
  galleryApproved: boolean;
}

export interface ArtComment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  createdAt: string;
  likes: number;
}

export interface ArtTutorial {
  id: string;
  title: string;
  description: string;
  category: ArtCategory | "general";
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: string;
  lessons: string[];
  icon: string;
  color: string;
}

export interface ArtChallenge {
  id: string;
  title: string;
  theme: string;
  description: string;
  type: "weekly" | "monthly";
  startDate: string;
  endDate: string;
  participants: number;
  submissions: number;
  icon: string;
  color: string;
  prompts: string[];
  active: boolean;
}

export interface CollaborationProject {
  id: string;
  title: string;
  description: string;
  type: "writer-illustrator" | "poet-artist" | "group" | "open";
  members: { name: string; role: string; avatar: string }[];
  status: "open" | "in-progress" | "completed";
  tags: string[];
  icon: string;
}

export interface CreativeResource {
  id: string;
  name: string;
  description: string;
  type: "color-palette" | "writing-prompt" | "story-idea" | "reference" | "template" | "tool";
  icon: string;
  url?: string;
  content?: string;
}

export interface AIArtTool {
  id: string;
  name: string;
  description: string;
  useCase: string;
  url: string;
  icon: string;
  category: "generation" | "storytelling" | "style" | "prompt" | "trend";
  trending: boolean;
}

export interface ArtNewsArticle {
  id: string;
  title: string;
  summary: string;
  category: "global" | "exhibition" | "digital" | "ai" | "interview";
  date: string;
  source: string;
  url: string;
  icon: string;
}

export interface LeaderboardEntry {
  rank: number;
  artistId: string;
  artistName: string;
  artistAvatar: string;
  score: number;
  totalLikes: number;
  totalWorks: number;
  badge: string;
}

export interface InspirationItem {
  id: string;
  type: "artwork" | "quote" | "featured-artist" | "trending";
  content: string;
  author?: string;
  imageUrl?: string;
  icon: string;
}

export interface ArtHubProgress {
  likedArtworks: string[];
  bookmarkedArtworks: string[];
  completedTutorials: string[];
  challengesJoined: string[];
  submittedWorks: string[];
  gallerySubmissions: string[];
  collaborationsJoined: string[];
  lastVisited: string;
}
