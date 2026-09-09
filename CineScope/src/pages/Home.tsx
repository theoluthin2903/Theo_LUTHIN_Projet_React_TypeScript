import MovieGrid from "../components/MovieGrid";
import { movies } from "../data/movies";

interface HomeProps {
  favorites: number[];
  onToggleFavorite: (movieId: number) => void;
}

function Home({ favorites, onToggleFavorite }: HomeProps) {
  const filterMovies = movies.filter((movie) => movie.id <= 6);

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

        <MovieGrid
          movies={filterMovies}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
      </section>
    </>
  );
}

export default Home;