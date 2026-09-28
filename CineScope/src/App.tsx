import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Movie from "./pages/Movie";
import { LibraryPage } from "./pages/Library";
import { LibraryProvider } from './context/LibraryContext';
import { ProfileProvider } from './context/ProfileContext';
import { FavoritesProvider } from './context/FavoritesContext';
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

	return (
		<ProfileProvider>
		<FavoritesProvider>
		<main className="app-shell">
			{showHeader && user && <Navbar />}
			<LibraryProvider>
			<Routes>
				<Route
                    path="/"
                    element={user ? <Home /> : <Navigate to="/auth" replace />}
                />
				<Route path="/movies" element={<Movies />} />
				<Route path="/movie/:id" element={<Movie />} />
				<Route path="/favorites" element={<Favorites />} />
				<Route path="/library" element={<LibraryPage />} />
				<Route path="/auth" element={<Auth />} />
                <Route path="/profile" element={<ProtectedProfile />} />
				<Route path="/search" element={<Search />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			</LibraryProvider>
			<Footer />
		</main>
		</FavoritesProvider>
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