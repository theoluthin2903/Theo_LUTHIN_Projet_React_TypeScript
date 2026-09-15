import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Movie, WatchStatus } from '../types/movie';

interface LibraryContextType {
  library: Movie[];
  addToLibrary: (movie: Movie, status: WatchStatus) => void;
  removeFromLibrary: (movieId: number | string) => void;
  updateStatus: (movieId: number | string, status: WatchStatus) => void;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const LibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [library, setLibrary] = useState<Movie[]>(() => {
    const saved = localStorage.getItem('user_library');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('user_library', JSON.stringify(library));
  }, [library]);

  const addToLibrary = (movie: Movie, status: WatchStatus) => {
    setLibrary((prev) => {
      const exists = prev.find((m) => m.id === movie.id);
      if (exists) {
        return prev.map((m) => (m.id === movie.id ? { ...m, status } : m));
      }
      return [...prev, { ...movie, status }];
    });
  };

  const removeFromLibrary = (movieId: number | string) => {
    setLibrary((prev) => prev.filter((m) => m.id !== movieId));
  };

  const updateStatus = (movieId: number | string, status: WatchStatus) => {
    setLibrary((prev) =>
      prev.map((m) => (m.id === movieId ? { ...m, status } : m))
    );
  };

  return (
    <LibraryContext.Provider
      value={{ library, addToLibrary, removeFromLibrary, updateStatus }}
    >
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