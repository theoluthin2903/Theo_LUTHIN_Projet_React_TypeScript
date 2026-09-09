import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "../components/Footer";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Movie from "./pages/Movie";
import Library from "./pages/Library";
import Profile from "./pages/Profile";
import { movies } from "./data/movies";
import "./App.css";

function AppShell() {
	const location = useLocation();
	const showHeader = !location.pathname.startsWith("/movie/");
	const [favorites, setFavorites] = useState<number[]>(() => {
		const savedFavorites = localStorage.getItem("favorites");
		return savedFavorites ? JSON.parse(savedFavorites) : [];
	});
	const [toastMessage, setToastMessage] = useState("");

	useEffect(() => {
		localStorage.setItem("favorites", JSON.stringify(favorites));
	}, [favorites]);

	useEffect(() => {
		if (!toastMessage) {
			return;
		}

		const timeoutId = window.setTimeout(() => {
			setToastMessage("");
		}, 2200);

		return () => window.clearTimeout(timeoutId);
	}, [toastMessage]);

	const toggleFavorite = (movieId: number) => {
		const movie = movies.find((item) => item.id === movieId);
		const isFavorite = favorites.includes(movieId);

		setFavorites((prev) =>
			isFavorite
				? prev.filter((id) => id !== movieId)
				: [...prev, movieId]
		);

		if (movie) {
			setToastMessage(
				isFavorite
					? `« ${movie.title} » retiré des favoris.`
					: `« ${movie.title} » ajouté aux favoris.`
			);
		}
	};

	return (
		<main className="app-shell">
			{showHeader && <Navbar />}
			{toastMessage && (
				<div className="favorite-toast" role="status" aria-live="polite">
					{toastMessage}
				</div>
			)}
			<Routes>
				<Route path="/" element={<Home favorites={favorites} onToggleFavorite={toggleFavorite} />} />
				<Route path="/movies" element={<Movies favorites={favorites} onToggleFavorite={toggleFavorite} />} />
				<Route path="/movie/:id" element={<Movie favorites={favorites} onToggleFavorite={toggleFavorite} />} />
				<Route path="/favorites" element={<Favorites favorites={favorites} onToggleFavorite={toggleFavorite} />} />
				<Route path="/library" element={<Library />} />
				<Route path="/profile" element={<Profile />} />
			</Routes>
			<Footer />
		</main>
	);
}

function App() {
	return (
		<BrowserRouter>
			<AppShell />
		</BrowserRouter>
	);
}
export default App;

