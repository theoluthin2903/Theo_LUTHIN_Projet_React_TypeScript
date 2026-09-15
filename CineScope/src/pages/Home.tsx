import { useEffect, useState } from "react";
import MovieGrid from "../components/MovieGrid";
import { fetchPopularMovies } from "../services/tmdb";
import type { Movie } from "../types/movie";

interface HomeProps {
  favorites: number[];
  onToggleFavorite: (movieId: number, movieTitle: string) => void;
}

function Home({ favorites, onToggleFavorite }: HomeProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchPopularMovies()
      .then((result) => setMovies(result.movies.slice(0, 6)))
      .catch(() => setError(true));
  }, []);

  return (
    <>
      <section className="hero-copy">
        <span className="eyebrow">Sélection du moment</span>
        <h1>Découvrez votre prochain film</h1>
        <p>Explorez des films, trouvez vos favoris et construisez votre bibliothèque personnelle.</p>
      </section>

      <section>
        <section className="popular-films">
          <h2>Films Populaires :</h2>
        </section>

        {error && <p role="alert">Impossible de charger les films populaires.</p>}
        {!error && movies.length > 0 && <MovieGrid movies={movies} favorites={favorites} onToggleFavorite={onToggleFavorite} />}
      </section>
    </>
  );
}

export default Home;