import React from "react";
import { useLibrary } from "../context/LibraryContext";
import type { WatchStatus } from "../types/movie";
import MovieCard from "../components/MovieCard";

interface CategoryConfig {
  key: WatchStatus;
  title: string;
  description: string;
}

interface LibraryPageProps {
  favorites: number[];
  onToggleFavorite: (movieId: number, movieTitle: string) => void;
}

const CATEGORIES: CategoryConfig[] = [
  {
    key: "to_watch",
    title: "À regarder",
    description: "Films que vous souhaitez regarder prochainement.",
  },
  {
    key: "in_progress",
    title: "En cours",
    description: "Films que vous avez commencé à regarder.",
  },
  {
    key: "watched",
    title: "Vu",
    description: "Films que vous avez déjà regardés.",
  },
];

export const LibraryPage: React.FC<LibraryPageProps> = ({
  favorites,
  onToggleFavorite,
}) => {
  const { library } = useLibrary();

  return (
    <section className="library-page">
      <div className="library-header">
        <p className="eyebrow">Ma collection</p>
        <h1>Ma bibliothèque</h1>
        <p>Retrouvez vos films classés selon leur statut de visionnage.</p>
      </div>

      <div className="library-categories">
        {CATEGORIES.map(({ key, title, description }) => {
          const movies = library.filter((movie) => movie.status === key);

          return (
            <section key={key} className="library-section">
              <div className="library-section__header">
                <div>
                  <h2>{title}</h2>
                  <p>{description}</p>
                </div>
                <span className="library-count">{movies.length}</span>
              </div>

              {movies.length === 0 ? (
                <p className="library-empty">Aucun film dans cette liste.</p>
              ) : (
                <div className="movie-grid library-grid">
                  {movies.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      {...movie}
                      isFavorite={favorites.includes(movie.id)}
                      onToggleFavorite={onToggleFavorite}
                    />
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </section>
  );
};

export default LibraryPage;
