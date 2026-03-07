import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { BooksHubProgress } from "../types/booksHub";

interface BooksHubContextType {
  progress: BooksHubProgress;
  markAsRead: (bookId: string) => void;
  unmarkAsRead: (bookId: string) => void;
  saveBook: (bookId: string) => void;
  unsaveBook: (bookId: string) => void;
  likeBook: (bookId: string) => void;
  unlikeBook: (bookId: string) => void;
  addToReadingList: (bookId: string) => void;
  removeFromReadingList: (bookId: string) => void;
  followAuthor: (authorId: string) => void;
  unfollowAuthor: (authorId: string) => void;
  completeSummary: (bookId: string) => void;
  exploreTopic: (topicId: string) => void;
  uploadBook: (bookId: string) => void;
  isRead: (bookId: string) => boolean;
  isSaved: (bookId: string) => boolean;
  isLiked: (bookId: string) => boolean;
  isInReadingList: (bookId: string) => boolean;
  isAuthorFollowed: (authorId: string) => boolean;
  getStats: () => {
    totalRead: number;
    totalSaved: number;
    totalLiked: number;
    readingListCount: number;
    followedAuthors: number;
    summariesCompleted: number;
    topicsExplored: number;
    booksUploaded: number;
  };
}

const defaultProgress: BooksHubProgress = {
  readBooks: [],
  savedBooks: [],
  likedBooks: [],
  uploadedBooks: [],
  followedAuthors: [],
  completedSummaries: [],
  exploredTopics: [],
  readingList: [],
  lastVisited: "",
};

const STORAGE_KEY = "books-hub-progress";

const BooksHubContext = createContext<BooksHubContextType | undefined>(undefined);

export const useBooksHubContext = () => {
  const ctx = useContext(BooksHubContext);
  if (!ctx) throw new Error("useBooksHubContext must be used within BooksHubProvider");
  return ctx;
};

export const BooksHubProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<BooksHubProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return { ...defaultProgress, ...JSON.parse(saved) };
    } catch {}
    return defaultProgress;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    setProgress((p) => ({ ...p, lastVisited: new Date().toISOString() }));
  }, []);

  const toggle = useCallback(
    (field: keyof BooksHubProgress, id: string, add: boolean) => {
      setProgress((prev) => {
        const arr = prev[field] as string[];
        if (add && !arr.includes(id)) return { ...prev, [field]: [...arr, id] };
        if (!add) return { ...prev, [field]: arr.filter((x) => x !== id) };
        return prev;
      });
    },
    []
  );

  const markAsRead = useCallback((id: string) => toggle("readBooks", id, true), [toggle]);
  const unmarkAsRead = useCallback((id: string) => toggle("readBooks", id, false), [toggle]);
  const saveBook = useCallback((id: string) => toggle("savedBooks", id, true), [toggle]);
  const unsaveBook = useCallback((id: string) => toggle("savedBooks", id, false), [toggle]);
  const likeBook = useCallback((id: string) => toggle("likedBooks", id, true), [toggle]);
  const unlikeBook = useCallback((id: string) => toggle("likedBooks", id, false), [toggle]);
  const addToReadingList = useCallback((id: string) => toggle("readingList", id, true), [toggle]);
  const removeFromReadingList = useCallback((id: string) => toggle("readingList", id, false), [toggle]);
  const followAuthor = useCallback((id: string) => toggle("followedAuthors", id, true), [toggle]);
  const unfollowAuthor = useCallback((id: string) => toggle("followedAuthors", id, false), [toggle]);
  const completeSummary = useCallback((id: string) => toggle("completedSummaries", id, true), [toggle]);
  const exploreTopic = useCallback((id: string) => toggle("exploredTopics", id, true), [toggle]);
  const uploadBook = useCallback((id: string) => toggle("uploadedBooks", id, true), [toggle]);

  const isRead = useCallback((id: string) => progress.readBooks.includes(id), [progress.readBooks]);
  const isSaved = useCallback((id: string) => progress.savedBooks.includes(id), [progress.savedBooks]);
  const isLiked = useCallback((id: string) => progress.likedBooks.includes(id), [progress.likedBooks]);
  const isInReadingList = useCallback((id: string) => progress.readingList.includes(id), [progress.readingList]);
  const isAuthorFollowed = useCallback((id: string) => progress.followedAuthors.includes(id), [progress.followedAuthors]);

  const getStats = useCallback(
    () => ({
      totalRead: progress.readBooks.length,
      totalSaved: progress.savedBooks.length,
      totalLiked: progress.likedBooks.length,
      readingListCount: progress.readingList.length,
      followedAuthors: progress.followedAuthors.length,
      summariesCompleted: progress.completedSummaries.length,
      topicsExplored: progress.exploredTopics.length,
      booksUploaded: progress.uploadedBooks.length,
    }),
    [progress]
  );

  return (
    <BooksHubContext.Provider
      value={{
        progress,
        markAsRead,
        unmarkAsRead,
        saveBook,
        unsaveBook,
        likeBook,
        unlikeBook,
        addToReadingList,
        removeFromReadingList,
        followAuthor,
        unfollowAuthor,
        completeSummary,
        exploreTopic,
        uploadBook,
        isRead,
        isSaved,
        isLiked,
        isInReadingList,
        isAuthorFollowed,
        getStats,
      }}
    >
      {children}
    </BooksHubContext.Provider>
  );
};
