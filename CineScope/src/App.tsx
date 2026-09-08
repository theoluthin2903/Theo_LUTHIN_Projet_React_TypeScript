import Navbar from "./components/Navbar";
import Footer from "../components/Footer";
import MovieGrid from "./components/MovieGrid";
import SearchBar from "./components/SearchBar";
import "./App.css";

function App() {
	return (
		<main className="app-shell">
			<Navbar />
			<section className="hero-copy">
				<span className="eyebrow">Votre sélection du moment</span>
				<h1>Le cinéma, autrement.</h1>
				<p>Explorez les films du moment.</p>
			</section>
			<SearchBar />
			<MovieGrid />
			<Footer />
		</main>
	);
}
export default App;

