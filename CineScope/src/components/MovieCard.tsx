import { Link } from "react-router-dom";
import type { Movie, WatchStatus } from "../types/movie";
import { useLibrary } from "../context/LibraryContext";

interface MovieCardProps extends Movie {
  isFavorite: boolean;
  onToggleFavorite: (movieId: number, movieTitle: string) => void;
}

export function MovieCard(props: MovieCardProps) {
  const {
    id,
    title,
    genres,
    year,
    note,
    description,
    imagePath,
    isFavorite,
    onToggleFavorite,
  } = props;

  const { library, addToLibrary, removeFromLibrary, updateStatus } = useLibrary();

  // On vérifie si ce film est déjà enregistré dans la bibliothèque
  const currentMovieInLibrary = library.find((m) => m.id === id);
  const currentStatus = currentMovieInLibrary?.status;

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as WatchStatus;

    if (currentMovieInLibrary) {
      updateStatus(id, newStatus);
    } else {
      // On passe l'objet film complet à la bibliothèque
      addToLibrary(props, newStatus);
    }
  };

  return (
    <article className="movie-card">
      {imagePath ? (
        <img src={imagePath} alt={title} />
      ) : (
        <div className="movie-card__poster-placeholder">Affiche indisponible</div>
      )}
      
      <h2 className="movie-card__title">{title}</h2>
      {genres && <p>{genres.join(", ")}</p>}
      {year && <p>{year}</p>}
      {note !== undefined && <p>Note : ⭐{note.toFixed(1)}/10</p>}
      {description && <p dangerouslySetInnerHTML={{ __html: description }} />}

      {/* Sélecteur de statut de la bibliothèque */}
      <div className="movie-card__library-status mt-2">
        <select
          value={currentStatus || ""}
          onChange={handleStatusChange}
          className="movie-card__status-select"
        >
          <option value="" disabled>
            -- Choisir un statut --
          </option>
          <option value="to_watch">À regarder</option>
          <option value="in_progress">En cours</option>
          <option value="watched">Vu</option>
        </select>

        {currentMovieInLibrary && (
          <button
            type="button"
            onClick={() => removeFromLibrary(id)}
            className="movie-card__remove-button text-xs text-red-500 hover:underline block mt-1"
          >
            Retirer de la bibliothèque
          </button>
        )}
      </div>

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
