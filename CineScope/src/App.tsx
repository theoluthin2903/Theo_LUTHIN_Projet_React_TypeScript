import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "../components/Footer";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Movie from "./pages/Movie";
import { LibraryPage } from "./pages/Library";
import { LibraryProvider } from './context/LibraryContext';
import { ProfileProvider } from './context/ProfileContext';
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import "./App.css";

function ProtectedProfile() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <Profile />;
}

function AppShell() {
	const location = useLocation();
    const { user } = useAuth();
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

	const toggleFavorite = (movieId: number, movieTitle: string) => {
		const isFavorite = favorites.includes(movieId);

		setFavorites((prev) =>
			isFavorite
				? prev.filter((id) => id !== movieId)
				: [...prev, movieId]
		);

		setToastMessage(
			isFavorite
				? `${movieTitle} retiré des favoris.`
				: `${movieTitle} ajouté aux favoris.`
		);
	};

	return (
		<ProfileProvider>
		<main className="app-shell">
			{showHeader && user && <Navbar />}
			{toastMessage && (
				<div className="favorite-toast" role="status" aria-live="polite">
					{toastMessage}
				</div>
			)}
			<LibraryProvider>
			<Routes>
				<Route
                    path="/"
                    element={user ? <Home favorites={favorites} onToggleFavorite={toggleFavorite} /> : <Navigate to="/auth" replace />}
                />
				<Route path="/movies" element={<Movies favorites={favorites} onToggleFavorite={toggleFavorite} />} />
				<Route path="/movie/:id" element={<Movie favorites={favorites} onToggleFavorite={toggleFavorite} />} />
				<Route path="/favorites" element={<Favorites favorites={favorites} onToggleFavorite={toggleFavorite} />} />
				<Route path="/library" element={<LibraryPage favorites={favorites} onToggleFavorite={toggleFavorite} />} />
				<Route path="/auth" element={<Auth />} />
                <Route path="/profile" element={<ProtectedProfile />} />
				<Route path="/search" element={<Search favorites={favorites} onToggleFavorite={toggleFavorite} />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			</LibraryProvider>
			<Footer />
		</main>
		</ProfileProvider>
	);
}

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<AppShell />
			</BrowserRouter>
		</AuthProvider>
	);
}
export default App;