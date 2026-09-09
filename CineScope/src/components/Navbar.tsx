import { NavLink } from "react-router-dom";

function Navbar() {
	return (
		<nav className="site-nav">
			<strong className="brand">CineScope</strong>
			<div className="nav-links">
				<NavLink to="/">Accueil</NavLink>
				<NavLink to="/movies">Films</NavLink>
				<NavLink to="/favorites">Favoris</NavLink>
				<NavLink to="/library">Bibliothèque</NavLink>
				<NavLink to="/profile">Profil</NavLink>
			</div>
			<button type="button" className="search-button" onClick={() => window.location.href = "/movies"}>Rechercher</button>
		</nav>
	);
}
export default Navbar;
