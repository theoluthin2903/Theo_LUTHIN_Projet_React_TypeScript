import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProfile } from "../context/ProfileContext";
import { fetchMovieDetails } from "../services/tmdb";

interface ProfileMovie {
  id: number;
  title: string;
  year?: string;
  imagePath?: string;
}

function toProfileMovie(movie: any): ProfileMovie {
  return {
    id: Number(movie.id),
    title: movie.title || movie.name || "Film sans titre",
    year:
      movie.year ||
      (movie.release_date
        ? String(movie.release_date).slice(0, 4)
        : undefined),
    imagePath:
      movie.imagePath ||
      (movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : undefined),
  };
}

function Profile() {
  const { user, logout } = useAuth();
  const { setUsername } = useProfile();

  const [savedRatings, setSavedRatings] = useState<Record<string, number>>({});
  const [watchedMovies, setWatchedMovies] = useState<ProfileMovie[]>([]);
  const [ratedMovies, setRatedMovies] = useState<ProfileMovie[]>([]);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user, setUsername]);

  const loadProfileMovies = useCallback(async () => {
    if (!user) {
      setSavedRatings({});
      setWatchedMovies([]);
      setRatedMovies([]);
      return;
    }

    // Films notés = uniquement les films pour lesquels l'utilisateur
    // possède réellement une note enregistrée, indépendamment de la bibliothèque.
    const ratings = JSON.parse(
      localStorage.getItem("cinescope_ratings") || "{}"
    ) as Record<string, unknown>;

    const prefix = `${user.email}:`;
    const userRatings: Record<string, number> = {};

    Object.entries(ratings).forEach(([key, value]) => {
      if (key.startsWith(prefix) && typeof value === "number") {
        userRatings[key.slice(prefix.length)] = value;
      }
    });

    setSavedRatings(userRatings);

    // Films vus = films dont la page de détail a été ouverte.
    const viewed = JSON.parse(
      localStorage.getItem("cinescope_viewed_movies") || "{}"
    ) as Record<string, unknown>;

    const viewedIds = Array.isArray(viewed[user.email])
      ? (viewed[user.email] as unknown[])
          .map(Number)
          .filter((id) => Number.isFinite(id))
      : [];

    const ratedIds = Object.keys(userRatings)
      .map(Number)
      .filter((id) => Number.isFinite(id));

    const uniqueIds = (ids: number[]) => [...new Set(ids)];

    const fetchMovies = async (ids: number[]) => {
      const results = await Promise.all(
        uniqueIds(ids).map(async (id) => {
          try {
            const movie = await fetchMovieDetails(id);
            return movie ? toProfileMovie(movie) : null;
          } catch {
            return null;
          }
        })
      );

      return results.filter((movie): movie is ProfileMovie => movie !== null);
    };

    const [viewedResults, ratedResults] = await Promise.all([
      fetchMovies(viewedIds),
      fetchMovies(ratedIds),
    ]);

    setWatchedMovies(viewedResults);
    setRatedMovies(ratedResults);
  }, [user]);

  useEffect(() => {
    void loadProfileMovies();

    const refresh = () => {
      void loadProfileMovies();
    };

    window.addEventListener("storage", refresh);
    window.addEventListener("cinescope:ratings-updated", refresh);
    window.addEventListener("cinescope:viewed-updated", refresh);

    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("cinescope:ratings-updated", refresh);
      window.removeEventListener("cinescope:viewed-updated", refresh);
    };
  }, [loadProfileMovies]);

  if (!user) {
    return null;
  }

  return (
    <section className="profile-page">
      <section className="hero-copy">
        <span className="eyebrow">Profil</span>
        <h1>Bonjour, {user.username}</h1>
        <p>{user.email}</p>
      </section>

      <div className="profile-actions">
        <Link to="/movies" className="search-submit">
          Explorer les films
        </Link>
        <button type="button" className="profile-logout" onClick={logout}>
          Se déconnecter
        </button>
      </div>

      <section className="profile-section">
        <h2>Historique des films inspectés</h2>
        {watchedMovies.length === 0 ? (
          <div className="profile-empty">
            <p>Vous n'avez pas encore ouvert la fiche d'un film.</p>
            <Link to="/movies" className="movie-infos-button">
              Voir les films
            </Link>
          </div>
        ) : (
          <div className="movie-grid">
            {watchedMovies.map((movie) => (
              <article className="movie-card" key={movie.id}>
                {movie.imagePath && (
                  <img src={movie.imagePath} alt={movie.title} />
                )}
                <h3 className="movie-card__title">{movie.title}</h3>
                <p>{movie.year || "Date inconnue"}</p>
                <Link
                  to={`/movie/${movie.id}`}
                  className="movie-infos-button"
                >
                  Voir le film
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="profile-section">
        <h2>Films notés</h2>
        {ratedMovies.length === 0 ? (
          <div className="profile-empty">
            <p>Vous n'avez pas encore noté de film.</p>
            <Link to="/movies" className="movie-infos-button">
              Noter un film
            </Link>
          </div>
        ) : (
          <div className="movie-grid">
            {ratedMovies.map((movie) => (
              <article className="movie-card" key={movie.id}>
                {movie.imagePath && (
                  <img src={movie.imagePath} alt={movie.title} />
                )}
                <h3 className="movie-card__title">{movie.title}</h3>
                <p>
                  Votre note : ⭐ {savedRatings[String(movie.id)]}/5
                </p>
                <Link
                  to={`/movie/${movie.id}`}
                  className="movie-infos-button"
                >
                  Voir le film
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}

export default Profile;