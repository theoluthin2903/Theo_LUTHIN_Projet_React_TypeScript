interface SearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onSubmit: () => void;
}

function SearchBar({ search, onSearchChange, onSubmit }: SearchBarProps) {
  return (
    <form className="search-bar" onSubmit={(event) => { event.preventDefault(); onSubmit(); }}>
      <label htmlFor="movie-search">Rechercher un film</label>
      <input
        id="movie-search"
        type="text"
        placeholder="Titre du film..."
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />
      <button type="submit" className="search-submit">Rechercher</button>
    </form>
  );
}

export default SearchBar;
