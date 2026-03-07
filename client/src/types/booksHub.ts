// ─── Books Hub Types ─────────────────────────────────────────────────

export type BookCategory =
  | "philosophy"
  | "science"
  | "history"
  | "culture"
  | "self-development"
  | "literature"
  | "short-stories"
  | "poetry"
  | "educational"
  | "research"
  | "tamil";

export type BookLanguage =
  | "english"
  | "tamil"
  | "sanskrit"
  | "french"
  | "german"
  | "arabic"
  | "japanese"
  | "chinese"
  | "spanish"
  | "russian"
  | "latin"
  | "other";

export type BookSource =
  | "public-domain"
  | "independent-author"
  | "free-shared"
  | "research"
  | "rare-collection"
  | "user-upload";

export interface BookAuthor {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  nationality: string;
  era: string;
  notableWorks: string[];
  languages: BookLanguage[];
  specialization: string[];
  isIndependent: boolean;
  booksCount: number;
  followersCount: number;
  culturalImpact: string;
}

export interface Book {
  id: string;
  title: string;
  description: string;
  category: BookCategory;
  language: BookLanguage;
  source: BookSource;
  authorId: string;
  authorName: string;
  coverUrl: string;
  publishedYear: number;
  pages: number;
  rating: number;
  ratingsCount: number;
  tags: string[];
  isTamil: boolean;
  isFree: boolean;
  downloadUrl?: string;
  previewText: string;
  aiSummary?: string;
  keyIdeas?: string[];
  chapterSummaries?: { chapter: string; summary: string }[];
  translations?: { language: BookLanguage; available: boolean }[];
  featured: boolean;
}

export interface BookReview {
  id: string;
  bookId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  text: string;
  createdAt: string;
  helpful: number;
}

export interface TamilBook {
  id: string;
  title: string;
  tamilTitle: string;
  description: string;
  category: "literature" | "poetry" | "philosophy" | "history" | "rare";
  authorName: string;
  era: string;
  significance: string;
  coverUrl: string;
  pages: number;
  language: "tamil";
  englishSummary: string;
  keyThemes: string[];
  culturalImportance: string;
  featured: boolean;
}

export interface AIBookSummary {
  bookId: string;
  summary: string;
  mainIdeas: string[];
  keyLessons: string[];
  targetAudience: string;
  readingTime: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

export interface BookUpload {
  title: string;
  description: string;
  category: BookCategory;
  language: BookLanguage;
  authorName: string;
  content: string;
  isOriginal: boolean;
  tags: string[];
}

export interface IndependentWriter {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  genre: string[];
  publishedBooks: number;
  shortWritings: number;
  followers: number;
  joinedDate: string;
  featured: boolean;
  location: string;
  languages: BookLanguage[];
}

export interface BookNewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: "technology" | "ai-publishing" | "global-trends" | "digital-reading" | "indie-publishing";
  sourceUrl: string;
  sourceName: string;
  imageUrl: string;
  publishedAt: string;
  featured: boolean;
}

export interface AIBookTool {
  id: string;
  name: string;
  description: string;
  category: "reader" | "writer" | "translator" | "narrator";
  features: string[];
  url: string;
  icon: string;
  isFree: boolean;
  rating: number;
}

export interface KnowledgeTopic {
  id: string;
  name: string;
  icon: string;
  description: string;
  bookCount: number;
  subtopics: string[];
  featured: boolean;
}

export interface ReadingInsight {
  totalBooks: number;
  totalLanguages: number;
  activeWriters: number;
  totalCategories: number;
  mostReadCategory: string;
  tamilBooksCount: number;
  freeBooks: number;
  rareBooks: number;
}

export interface BooksHubProgress {
  readBooks: string[];
  savedBooks: string[];
  likedBooks: string[];
  uploadedBooks: string[];
  followedAuthors: string[];
  completedSummaries: string[];
  exploredTopics: string[];
  readingList: string[];
  lastVisited: string;
}
