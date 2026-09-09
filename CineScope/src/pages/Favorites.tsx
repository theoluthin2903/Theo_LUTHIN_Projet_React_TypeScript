import { movies } from "../data/movies";
import MovieGrid from "../components/MovieGrid";

interface FavoritesProps {
  favorites: number[];
  onToggleFavorite: (movieId: number) => void;
}

function Favorites({ favorites, onToggleFavorite }: FavoritesProps) {
  const favoriteMovies = movies.filter((movie) => favorites.includes(movie.id));

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
