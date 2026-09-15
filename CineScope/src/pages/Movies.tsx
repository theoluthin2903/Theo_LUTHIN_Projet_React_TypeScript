import { useEffect, useState } from "react";
import MovieGrid from "../components/MovieGrid";
import { fetchPopularMovies } from "../services/tmdb";
import type { Movie } from "../types/movie";

interface MoviesProps {
  favorites: number[];
  onToggleFavorite: (movieId: number) => void;
}

function Movies({ favorites, onToggleFavorite }: MoviesProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    fetchPopularMovies(page)
      .then((result) => {
        if (!cancelled) {
          setMovies(result.movies);
          setTotalPages(result.totalPages);
        }
      })
      .catch(() => {
        if (!cancelled) setError("Impossible de charger les films.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [page]);

  return (
    <section>
      <section className="hero-copy">
        <span className="eyebrow">Catalogue</span>
        <h1>Films</h1>
        <p>Retrouvez tous les films disponibles sur CineScope.</p>
      </section>
      {loading && <p role="status">Chargement des films...</p>}
      {error && <p role="alert">{error} Une erreur est survenue lors de la récupération des données.</p>}
      {!loading && !error && <MovieGrid movies={movies} favorites={favorites} onToggleFavorite={onToggleFavorite} />}
      {!loading && !error && <div className="pagination">
        <button type="button" disabled={page === 1} onClick={() => setPage((current) => current - 1)}>Page précédente</button>
        <span>Page {page} sur {totalPages}</span>
        <button type="button" disabled={page >= totalPages} onClick={() => setPage((current) => current + 1)}>Page suivante</button>
      </div>}
    </section>
  );
}

export default Movies;
