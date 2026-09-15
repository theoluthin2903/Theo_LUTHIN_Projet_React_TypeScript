import MovieCard from "./MovieCard";
import type { Movie } from "../types/movie";

interface MovieGridProps {
  movies: Movie[];
  favorites: number[];
  onToggleFavorite: (movieId: number) => void;
}

function MovieGrid({ movies, favorites, onToggleFavorite }: MovieGridProps) {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          {...movie}
          isFavorite={favorites.includes(movie.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

export default MovieGrid;