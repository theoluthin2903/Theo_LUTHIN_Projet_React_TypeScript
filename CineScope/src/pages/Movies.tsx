import { useState } from "react";
import MovieGrid from "../components/MovieGrid";
import SearchBar from "../components/SearchBar";
import { movies } from "../data/movies";

function Movies() {
  const [search, setSearch] = useState("");
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section>
      <section className="hero-copy">
        <span className="eyebrow">Catalogue</span>
        <h1>Films</h1>
        <p>Retrouvez tous les films disponibles sur CineScope.</p>
        <SearchBar search={search} onSearchChange={setSearch} />
      </section>
      <MovieGrid movies={filteredMovies} />
    </section>
  );
}

export default Movies;
