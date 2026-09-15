export interface Movie {
  id: number;
  title: string;
  genres: string[];
  year: number;
  note: number;
  duree: number;
  description: string;
  synopsis: string;
  cast: string[];
  realisateur: string[];
  imagePath: string;
  voteCount: number;
  originalLanguage: string;
  productionCountries: string[];
}