import type { Movie } from "../types/movie";

const API_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

interface TmdbMovie {
  id: number;
  title: string;
  release_date?: string;
  vote_average: number;
  vote_count: number;
  overview: string;
  poster_path: string | null;
  genre_ids?: number[];
  genres?: Array<{ id: number; name: string }>;
  runtime?: number | null;
  original_language: string;
  production_countries?: Array<{ iso_3166_1: string }>;
  credits?: {
    cast?: Array<{ name: string }>;
    crew?: Array<{ name: string; job: string }>;
  };
}

interface TmdbListResponse {
  page: number;
  total_pages: number;
  results: TmdbMovie[];
}

export interface MoviePage {
  movies: Movie[];
  page: number;
  totalPages: number;
}

const genreNames: Record<number, string> = {
  28: "Action",
  12: "Aventure",
  16: "Animation",
  35: "Comédie",
  80: "Crime",
  99: "Documentaire",
  18: "Drame",
  10751: "Familial",
  14: "Fantastique",
  36: "Histoire",
  27: "Horreur",
  10402: "Musique",
  9648: "Mystère",
  10749: "Romance",
  878: "Science-fiction",
  53: "Thriller",
  10752: "Guerre",
  37: "Western",
};

function getApiKey() {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  if (!apiKey) {
    throw new Error("La clé API TMDB est absente. Ajoutez VITE_TMDB_API_KEY dans .env.");
  }
  return apiKey;
}

async function request<T>(path: string, params: Record<string, string> = {}) {
  const searchParams = new URLSearchParams({
    api_key: getApiKey(),
    language: "fr-FR",
    ...params,
  });
  const response = await fetch(`${API_URL}${path}?${searchParams}`);
  if (!response.ok) {
    throw new Error(`TMDB a répondu avec le statut ${response.status}.`);
  }
  return response.json() as Promise<T>;
}

function mapMovie(movie: TmdbMovie): Movie {
  const year = movie.release_date ? Number(movie.release_date.slice(0, 4)) : 0;
  const genres = movie.genres?.map((genre) => genre.name)
    ?? movie.genre_ids?.map((genreId) => genreNames[genreId] ?? "Autre")
    ?? [];
  const director = movie.credits?.crew?.find((member) => member.job === "Director");

  return {
    id: movie.id,
    title: movie.title,
    genres,
    year,
    note: movie.vote_average,
    duree: movie.runtime ?? 0,
    description: movie.overview || "Aucune description disponible.",
    synopsis: movie.overview || "Aucun synopsis disponible.",
    cast: movie.credits?.cast?.slice(0, 5).map((actor) => actor.name) ?? [],
    realisateur: director ? [director.name] : [],
    imagePath: movie.poster_path ? `${IMAGE_URL}${movie.poster_path}` : "",
    voteCount: movie.vote_count,
    originalLanguage: movie.original_language,
    productionCountries: movie.production_countries?.map((country) => country.iso_3166_1) ?? [],
  };
}

export async function fetchPopularMovies(page = 1): Promise<MoviePage> {
  const data = await request<TmdbListResponse>("/movie/popular", { page: String(page) });
  return { movies: data.results.map(mapMovie), page: data.page, totalPages: data.total_pages };
}

export async function searchMovies(query: string, page = 1): Promise<MoviePage> {
  const data = await request<TmdbListResponse>("/search/movie", {
    query,
    page: String(page),
  });
  return { movies: data.results.map(mapMovie), page: data.page, totalPages: data.total_pages };
}

export async function fetchMovieDetails(id: number): Promise<Movie> {
  const data = await request<TmdbMovie>(`/movie/${id}`, { append_to_response: "credits" });
  return mapMovie(data);
}