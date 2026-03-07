import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { ArtHubProgress } from "../types/artHub";

interface ArtHubContextType {
  progress: ArtHubProgress;
  likeArtwork: (artworkId: string) => void;
  unlikeArtwork: (artworkId: string) => void;
  bookmarkArtwork: (artworkId: string) => void;
  unbookmarkArtwork: (artworkId: string) => void;
  completeTutorial: (tutorialId: string) => void;
  joinChallenge: (challengeId: string) => void;
  submitWork: (workId: string) => void;
  submitToGallery: (artworkId: string) => void;
  joinCollaboration: (collabId: string) => void;
  isLiked: (artworkId: string) => boolean;
  isBookmarked: (artworkId: string) => boolean;
  isTutorialCompleted: (tutorialId: string) => boolean;
  isChallengeJoined: (challengeId: string) => boolean;
  getStats: () => {
    totalLikes: number;
    totalBookmarks: number;
    tutorialsCompleted: number;
    challengesJoined: number;
    worksSubmitted: number;
    collaborations: number;
  };
}

const defaultProgress: ArtHubProgress = {
  likedArtworks: [],
  bookmarkedArtworks: [],
  completedTutorials: [],
  challengesJoined: [],
  submittedWorks: [],
  gallerySubmissions: [],
  collaborationsJoined: [],
  lastVisited: "",
};

const STORAGE_KEY = "art-hub-progress";

const ArtHubContext = createContext<ArtHubContextType | undefined>(undefined);

export const useArtHubContext = () => {
  const ctx = useContext(ArtHubContext);
  if (!ctx) throw new Error("useArtHubContext must be used within ArtHubProvider");
  return ctx;
};

export const ArtHubProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<ArtHubProgress>(() => {
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
    const today = new Date().toISOString().split("T")[0];
    if (progress.lastVisited !== today) {
      setProgress((p) => ({ ...p, lastVisited: today }));
    }
  }, [progress.lastVisited]);

  const likeArtwork = useCallback((artworkId: string) => {
    setProgress((p) => {
      if (p.likedArtworks.includes(artworkId)) return p;
      return { ...p, likedArtworks: [...p.likedArtworks, artworkId] };
    });
  }, []);

  const unlikeArtwork = useCallback((artworkId: string) => {
    setProgress((p) => ({
      ...p,
      likedArtworks: p.likedArtworks.filter((id) => id !== artworkId),
    }));
  }, []);

  const bookmarkArtwork = useCallback((artworkId: string) => {
    setProgress((p) => {
      if (p.bookmarkedArtworks.includes(artworkId)) return p;
      return { ...p, bookmarkedArtworks: [...p.bookmarkedArtworks, artworkId] };
    });
  }, []);

  const unbookmarkArtwork = useCallback((artworkId: string) => {
    setProgress((p) => ({
      ...p,
      bookmarkedArtworks: p.bookmarkedArtworks.filter((id) => id !== artworkId),
    }));
  }, []);

  const completeTutorial = useCallback((tutorialId: string) => {
    setProgress((p) => {
      if (p.completedTutorials.includes(tutorialId)) return p;
      return { ...p, completedTutorials: [...p.completedTutorials, tutorialId] };
    });
  }, []);

  const joinChallenge = useCallback((challengeId: string) => {
    setProgress((p) => {
      if (p.challengesJoined.includes(challengeId)) return p;
      return { ...p, challengesJoined: [...p.challengesJoined, challengeId] };
    });
  }, []);

  const submitWork = useCallback((workId: string) => {
    setProgress((p) => {
      if (p.submittedWorks.includes(workId)) return p;
      return { ...p, submittedWorks: [...p.submittedWorks, workId] };
    });
  }, []);

  const submitToGallery = useCallback((artworkId: string) => {
    setProgress((p) => {
      if (p.gallerySubmissions.includes(artworkId)) return p;
      return { ...p, gallerySubmissions: [...p.gallerySubmissions, artworkId] };
    });
  }, []);

  const joinCollaboration = useCallback((collabId: string) => {
    setProgress((p) => {
      if (p.collaborationsJoined.includes(collabId)) return p;
      return { ...p, collaborationsJoined: [...p.collaborationsJoined, collabId] };
    });
  }, []);

  const isLiked = useCallback((artworkId: string) => progress.likedArtworks.includes(artworkId), [progress.likedArtworks]);
  const isBookmarked = useCallback((artworkId: string) => progress.bookmarkedArtworks.includes(artworkId), [progress.bookmarkedArtworks]);
  const isTutorialCompleted = useCallback((tutorialId: string) => progress.completedTutorials.includes(tutorialId), [progress.completedTutorials]);
  const isChallengeJoined = useCallback((challengeId: string) => progress.challengesJoined.includes(challengeId), [progress.challengesJoined]);

  const getStats = useCallback(() => ({
    totalLikes: progress.likedArtworks.length,
    totalBookmarks: progress.bookmarkedArtworks.length,
    tutorialsCompleted: progress.completedTutorials.length,
    challengesJoined: progress.challengesJoined.length,
    worksSubmitted: progress.submittedWorks.length,
    collaborations: progress.collaborationsJoined.length,
  }), [progress]);

  return (
    <ArtHubContext.Provider
      value={{
        progress,
        likeArtwork,
        unlikeArtwork,
        bookmarkArtwork,
        unbookmarkArtwork,
        completeTutorial,
        joinChallenge,
        submitWork,
        submitToGallery,
        joinCollaboration,
        isLiked,
        isBookmarked,
        isTutorialCompleted,
        isChallengeJoined,
        getStats,
      }}
    >
      {children}
    </ArtHubContext.Provider>
  );
};
