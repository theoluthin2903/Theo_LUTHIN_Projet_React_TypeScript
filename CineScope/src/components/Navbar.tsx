import { NavLink } from "react-router-dom";

function Navbar() {
	const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
		isActive ? "nav-link active" : "nav-link";

	return (
		<nav className="site-nav">
			<NavLink to="/" className="brand">CineScope</NavLink>
			<div className="nav-links">
				<NavLink to="/" end className={getNavLinkClass}>Accueil</NavLink>
				<NavLink to="/movies" className={getNavLinkClass}>Films</NavLink>
				<NavLink to="/favorites" className={getNavLinkClass}>Favoris</NavLink>
				<NavLink to="/library" className={getNavLinkClass}>Bibliothèque</NavLink>
				<NavLink to="/profile" className={getNavLinkClass}>Profil</NavLink>
			</div>
			<NavLink to="/search" className="search-button">Rechercher</NavLink>
		</nav>
	);
}
export default Navbar;
