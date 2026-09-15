import { Link } from "react-router-dom";
import type { Movie } from "../types/movie";

interface MovieCardProps extends Movie {
  isFavorite: boolean;
  onToggleFavorite: (movieId: number, movieTitle: string) => void;
}

function MovieCard({
  id,
  title,
  genres,
  year,
  note,
  description,
  imagePath,
  isFavorite,
  onToggleFavorite,
}: MovieCardProps) {
  return (
    <article className="movie-card">
      {imagePath ? <img src={imagePath} alt={title} /> : <div className="movie-card__poster-placeholder">Affiche indisponible</div>}
      <h2 className="movie-card__title">{title}</h2>
      <p>{genres.join(", ")}</p>
      <p>{year}</p>
      <p>Note : ⭐{note.toFixed(1)}/10</p>
      <p dangerouslySetInnerHTML={{ __html: description }} />
      <div className="movie-card-actions">
        <Link to={`/movie/${id}`} className="movie-infos-button">
          Voir le film
        </Link>
        <button
          type="button"
          className="favorite-button"
          onClick={() => onToggleFavorite(id, title)}
        >
          {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        </button>
      </div>
    </article>
  );
}

export default MovieCard;
