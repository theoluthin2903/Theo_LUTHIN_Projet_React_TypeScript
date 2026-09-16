import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchMovieDetails } from "../services/tmdb";
import type { Movie as MovieType, WatchStatus } from "../types/movie";
import { useLibrary } from "../context/LibraryContext";
import { useAuth } from "../context/AuthContext";

interface MovieProps {
  favorites: number[];
  onToggleFavorite: (movieId: number, movieTitle: string) => void;
}

const getCountryName = (country: string): string => {
  if (!country) return country;

  // TMDB fournit généralement un code ISO 3166-1 (ex. FR, US, GB).
  // Si une valeur est déjà un nom complet, on la conserve.
  if (country.length !== 2) return country;

  try {
    const displayNames = new Intl.DisplayNames(["fr"], { type: "region" });
    return displayNames.of(country.toUpperCase()) || country;
  } catch {
    return country;
  }
};

const getLanguageName = (language: string): string => {
  if (!language) return language;

  // TMDB fournit généralement un code ISO 3166-1 (ex. FR, US, GB).
  // Si une valeur est déjà un nom complet, on la conserve.
  if (language.length !== 2) return language;

  try {
    const displayNames = new Intl.DisplayNames(["fr"], { type: "language" });
    return displayNames.of(language.toUpperCase()) || language;
  } catch {
    return language;
  }
};

function Movie({ favorites, onToggleFavorite }: MovieProps) {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [userRating, setUserRating] = useState(0);
    const [ratingMessage, setRatingMessage] = useState("");
  const { library, addToLibrary, removeFromLibrary, updateStatus } = useLibrary();
  const { user } = useAuth();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(false);
    fetchMovieDetails(Number(id))
      .then(setMovie)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!movie || !user) return;

    const ratings = JSON.parse(localStorage.getItem("cinescope_ratings") || "{}");
    const savedRating = ratings[`${user.email}:${movie.id}`];

    setUserRating(typeof savedRating === "number" ? savedRating : 0);
  }, [movie, user]);

  // Un film est considéré comme "vu" dès que l'utilisateur ouvre sa page de détail.
  useEffect(() => {
    if (!movie || !user) return;

    const viewed = JSON.parse(
      localStorage.getItem("cinescope_viewed_movies") || "{}"
    ) as Record<string, number[]>;

    const userViewed = Array.isArray(viewed[user.email])
      ? viewed[user.email]
      : [];

    if (!userViewed.includes(movie.id)) {
      viewed[user.email] = [...userViewed, movie.id];
      localStorage.setItem("cinescope_viewed_movies", JSON.stringify(viewed));
      window.dispatchEvent(new Event("cinescope:viewed-updated"));
    }
  }, [movie, user]);

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
  const libraryMovie = library.find((item) => item.id === movie.id);
  const isInLibrary = Boolean(libraryMovie);

  const toggleLibrary = () => {
    if (libraryMovie) {
      removeFromLibrary(movie.id);
    } else {
      addToLibrary(movie, "to_watch");
    }
  };

  const handleLibraryStatusChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const status = event.target.value as WatchStatus;

    if (libraryMovie) {
      updateStatus(movie.id, status);
    } else {
      addToLibrary(movie, status);
    }
  };

  const hasSavedRating =
    Boolean(user && movie && Object.prototype.hasOwnProperty.call(
      JSON.parse(localStorage.getItem("cinescope_ratings") || "{}"),
      `${user.email}:${movie.id}`
    ));

  const handleRatingSubmit = () => {
    if (!user) {
      setRatingMessage("Connectez-vous pour enregistrer une note.");
      return;
    }

    const ratings = JSON.parse(
      localStorage.getItem("cinescope_ratings") || "{}"
    );

    ratings[`${user.email}:${movie.id}`] = userRating;
    localStorage.setItem("cinescope_ratings", JSON.stringify(ratings));
    window.dispatchEvent(new Event("cinescope:ratings-updated"));

    setRatingMessage("Votre note a été enregistrée.");
  };

  const handleRatingDelete = () => {
    if (!user) return;

    const ratings = JSON.parse(
      localStorage.getItem("cinescope_ratings") || "{}"
    );

    delete ratings[`${user.email}:${movie.id}`];
    localStorage.setItem("cinescope_ratings", JSON.stringify(ratings));

    setUserRating(0);
    setRatingMessage("Votre note a été supprimée.");
    window.dispatchEvent(new Event("cinescope:ratings-updated"));
  };

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
              onClick={() => onToggleFavorite(movie.id, movie.title)}
            >
              {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
            </button>
            <button
              type="button"
              className="movie-library-button"
              onClick={toggleLibrary}
            >
              {isInLibrary
                ? "Retirer de la bibliothèque"
                : "Ajouter à la bibliothèque"}
            </button>
            <Link to="/movies" className="movie-infos-button">
              Retour aux films
            </Link>
          </div>

          {isInLibrary && (
            <div className="movie-detail__library-status">
              <label htmlFor="movie-library-status">Statut :</label>
              <select
                id="movie-library-status"
                className="movie-card__status-select"
                value={libraryMovie?.status ?? "to_watch"}
                onChange={handleLibraryStatusChange}
              >
                <option value="to_watch">À regarder</option>
                <option value="in_progress">En cours</option>
                <option value="watched">Vu</option>
              </select>
            </div>
          )}

          <div className="movie-rating">
            <h2>Ma note</h2>

            <div className="movie-rating__selection">
              <div
                className="movie-rating__stars"
                role="radiogroup"
                aria-label="Ma note"
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={star <= userRating ? "star selected" : "star"}
                    onClick={() => {
                      setUserRating(star === userRating ? 0 : star);
                      setRatingMessage("");
                    }}
                    aria-label={`${star} étoile${star > 1 ? "s" : ""}`}
                    aria-pressed={star <= userRating}
                  >
                    ★
                  </button>
                ))}
              </div>

              <span className="movie-rating__selected">
                {userRating}/5
              </span>
            </div>

            <button
              type="button"
              className="movie-rating__submit"
              onClick={hasSavedRating ? handleRatingDelete : handleRatingSubmit}
            >
              {hasSavedRating ? "Supprimer ma note" : "Enregistrer ma note"}
            </button>

            {ratingMessage && (
              <p className="movie-rating__message" role="status">
                {ratingMessage}
              </p>
            )}
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
            <p>Langue originale : {getLanguageName(movie.originalLanguage)}
            </p>
            <p>
              Pays de production :{" "}
              {movie.productionCountries.length > 0
              ? movie.productionCountries.map(getCountryName).join(", ")
            : "Non renseigné"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Movie;
