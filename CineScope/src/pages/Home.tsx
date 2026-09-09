import MovieGrid from "../components/MovieGrid"
import { movies } from "../data/movies";


function Home() {
   const filterMovies = movies.filter((movie) =>
    movie.id <= 6);
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
        <MovieGrid movies={filterMovies} />
      </section>
    </>
  );
}

export default Home;
