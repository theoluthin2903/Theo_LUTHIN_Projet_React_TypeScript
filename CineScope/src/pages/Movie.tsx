import { Link, useParams } from "react-router-dom";
import { movies } from "../data/movies";

function Movie() {
  const { id } = useParams<{ id: string }>();
  const movie = movies.find((item) => item.id === Number(id));

  if (!movie) {
    return (
      <section className="movie-detail movie-detail--empty">
        <h1>Film introuvable</h1>
        <Link to="/movies" className="movie-infos-button">Retour au catalogue</Link>
      </section>
    );
  }

  return (
    <section className="movie-detail">
      <div className="movie-detail__hero">
        <img src={movie.imagePath} alt={movie.title} className="movie-detail__image" />

        <div className="movie-detail__content">
          <p className="movie-detail__genres">{movie.genres.join(" • ")}</p>
          <h1>{movie.title}</h1>
          <p> De {movie.realisateur.join(" et ")} </p>
          <p className="movie-detail__meta">
            {movie.year} • {Math.trunc(movie.duree / 60)}h {movie.duree % 60}min • ⭐ {movie.note}/10
          </p>

          <div className="movie-detail__actions">
            <button type="button" className="favorite-button">Ajouter aux favoris</button>
            <Link to="/movies" className="movie-infos-button">Retour aux films</Link>
          </div>

          <div className="movie-detail__info">
            <div>
              <h2>Synopsis</h2>
              <p dangerouslySetInnerHTML={{ __html: movie.synopsis }} />
            </div>

            <div>
              <h2>Acteurs principaux</h2>
              <ul className="movie-detail__cast">
                {movie.cast.map((actor) => (
                  <li key={actor}>{actor}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Movie;

