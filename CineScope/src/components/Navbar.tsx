import { NavLink } from "react-router-dom";

function Navbar() {
	return (
		<nav className="site-nav">
			<strong className="brand">CineScope</strong>
			<NavLink to="/">Accueil</NavLink>
			<NavLink to="/movies">Films</NavLink>
			<NavLink to="/favorites">Favoris</NavLink>
		</nav>
	);
}
export default Navbar;
