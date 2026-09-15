import { useEffect, useState } from "react";
import MovieGrid from "../components/MovieGrid";
import { fetchMovieDetails } from "../services/tmdb";
import type { Movie } from "../types/movie";

interface FavoritesProps {
  favorites: number[];
  onToggleFavorite: (movieId: number, movieTitle: string) => void;
}

function Favorites({ favorites, onToggleFavorite }: FavoritesProps) {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

  useEffect(() => {
    Promise.all(favorites.map((id) => fetchMovieDetails(id)))
      .then(setFavoriteMovies)
      .catch(() => setFavoriteMovies([]));
  }, [favorites]);

  return (
    <>
      <section className="hero-copy">
        <span className="eyebrow">Ma sélection</span>
        <h1>Mes Favoris</h1>
        <p>Ajoutez des films à vos favoris pour les retrouver ici</p>
      </section>

      <section className="favorites-films">
        <h2>Films favoris ({favoriteMovies.length}) :</h2>

        {favoriteMovies.length === 0 ? (
          <p>Vous n'avez encore aucun film favori.</p>
        ) : (
          <MovieGrid
            movies={favoriteMovies}
            favorites={favorites}
            onToggleFavorite={onToggleFavorite}
          />
        )}
      </section>
    </>
  );
}

export default Favorites;
