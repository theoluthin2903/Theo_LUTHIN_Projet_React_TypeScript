import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchMovieDetails } from "../services/tmdb";
import type { Movie as MovieType } from "../types/movie";

interface MovieProps {
  favorites: number[];
  onToggleFavorite: (movieId: number) => void;
}

function Movie({ favorites, onToggleFavorite }: MovieProps) {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(false);
    fetchMovieDetails(Number(id))
      .then(setMovie)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <section className="movie-detail--empty"><p>Chargement du film...</p></section>;

  if (error || !movie) {
    return (
      <section className="movie-detail movie-detail--empty">
        <h1>Film introuvable</h1>
        <p>Le film demandé n'existe pas ou n'est plus disponible.</p>
        <Link to="/movies" className="movie-infos-button">Retour au catalogue</Link>
      </section>
    );
  }

  const isFavorite = favorites.includes(movie.id);

  return (
    <section className="movie-detail">
      <div className="movie-detail__hero">
        {movie.imagePath ? <img src={movie.imagePath} alt={movie.title} className="movie-detail__image" /> : <div className="movie-detail__image movie-card__poster-placeholder">Affiche indisponible</div>}

        <div className="movie-detail__content">
          <p className="movie-detail__genres">{movie.genres.join(" • ")}</p>
          <h1>{movie.title}</h1>
          {movie.realisateur.length > 0 && <p> De {movie.realisateur.join(" et ")} </p>}
          <p className="movie-detail__meta">
            {movie.year || "Date inconnue"} • {movie.duree ? `${Math.trunc(movie.duree / 60)}h ${movie.duree % 60}min` : "Durée inconnue"} • ⭐ {movie.note.toFixed(1)}/10 • {movie.voteCount} votes
          </p>

          <div className="movie-detail__actions">
            <button
              type="button"
              className="favorite-button"
              onClick={() => onToggleFavorite(movie.id)}
            >
              {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
            </button>
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
            <p>Langue originale : {movie.originalLanguage}</p>
            <p>Pays de production : {movie.productionCountries.join(", ") || "Non renseigné"}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Movie;

