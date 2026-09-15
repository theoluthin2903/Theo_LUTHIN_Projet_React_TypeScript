import { useEffect, useState } from "react";
import MovieGrid from "../components/MovieGrid";
import SearchBar from "../components/SearchBar";
import { fetchPopularMovies, searchMovies } from "../services/tmdb";
import type { Movie } from "../types/movie";

interface SearchProps {
  favorites: number[];
  onToggleFavorite: (movieId: number) => void;
}

function Search({ favorites, onToggleFavorite }: SearchProps) {
  const [search, setSearch] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    const request = submittedSearch.trim()
      ? searchMovies(submittedSearch.trim())
      : fetchPopularMovies();
    request
      .then((result) => { if (!cancelled) setResults(result.movies); })
      .catch(() => { if (!cancelled) setError("Impossible de charger les films."); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [submittedSearch]);

  return (
    <section>
      <section className="hero-copy search-page-header">
        <span className="eyebrow">Explorer</span>
        <h1>Rechercher un film</h1>
        <p>Trouvez rapidement un film dans le catalogue CineScope.</p>
        <SearchBar
          search={search}
          onSearchChange={setSearch}
          onSubmit={() => setSubmittedSearch(search)}
        />
      </section>

      {loading && <p role="status">Chargement des films...</p>}
      {error && <p role="alert">{error} Une erreur est survenue lors de la récupération des données.</p>}
      {!loading && !error && results.length > 0 && (
        <MovieGrid
          movies={results}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
      )}

      {!loading && !error && submittedSearch.trim() && results.length === 0 && (
        <div className="search-empty" role="status">
          <h2>Aucun film trouvé</h2>
          <p>Essayez avec un autre titre ou une autre recherche.</p>
          <button type="button" className="search-submit" onClick={() => { setSearch(""); setSubmittedSearch(""); }}>
            Réinitialiser la recherche
          </button>
        </div>
      )}
    </section>
  );
}

export default Search;