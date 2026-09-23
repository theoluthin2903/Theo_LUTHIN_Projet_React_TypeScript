import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Movie, WatchStatus } from '../types/movie';

interface LibraryContextType {
  library: Movie[];
  addToLibrary: (movie: Movie, status: WatchStatus) => void;
  removeFromLibrary: (movieId: number | string) => void;
  updateStatus: (movieId: number | string, status: WatchStatus) => void;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

const STATUS_LABELS: Record<WatchStatus, string> = {
  to_watch: "à regarder",
  in_progress: "en cours",
  watched: "vu",
};

export const LibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [library, setLibrary] = useState<Movie[]>(() => {
    const saved = localStorage.getItem('user_library');
    return saved ? JSON.parse(saved) : [];
  });
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    localStorage.setItem('user_library', JSON.stringify(library));
  }, [library]);

  useEffect(() => {
    if (!toastMessage) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setToastMessage("");
    }, 2200);

    return () => window.clearTimeout(timeoutId);
  }, [toastMessage]);

  const addToLibrary = (movie: Movie, status: WatchStatus) => {
    setLibrary((prev) => {
      const exists = prev.find((m) => m.id === movie.id);
      if (exists) {
        return prev.map((m) => (m.id === movie.id ? { ...m, status } : m));
      }
      return [...prev, { ...movie, status }];
    });
    setToastMessage(`${movie.title} ajouté à la bibliothèque (${STATUS_LABELS[status]}).`);
  };

  const removeFromLibrary = (movieId: number | string) => {
    const removedMovie = library.find((m) => m.id === movieId);

    setLibrary((prev) => prev.filter((m) => m.id !== movieId));

    setToastMessage(
      removedMovie
        ? `${removedMovie.title} retiré de la bibliothèque.`
        : "Film retiré de la bibliothèque."
    );
  };

  const updateStatus = (movieId: number | string, status: WatchStatus) => {
    const updatedMovie = library.find((m) => m.id === movieId);

    setLibrary((prev) =>
      prev.map((m) => (m.id === movieId ? { ...m, status } : m))
    );

    if (updatedMovie) {
      setToastMessage(`${updatedMovie.title} : statut mis à jour (${STATUS_LABELS[status]}).`);
    }
  };

  return (
    <LibraryContext.Provider
      value={{ library, addToLibrary, removeFromLibrary, updateStatus }}
    >
      {toastMessage && (
        <div className="favorite-toast" role="status" aria-live="polite">
          {toastMessage}
        </div>
      )}
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary doit être utilisé au sein de LibraryProvider');
  }
  return context;
};