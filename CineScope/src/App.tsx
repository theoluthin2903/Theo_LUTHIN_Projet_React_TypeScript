import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "../components/Footer";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Movie from "./pages/Movie";
import "./App.css";

function AppShell() {
	const location = useLocation();
	const showHeader = !location.pathname.startsWith("/movie/");

	return (
		<main className="app-shell">
			{showHeader && <Navbar />}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/movies" element={<Movies />} />
				<Route path="/movie/:id" element={<Movie />} />
				<Route path="/favorites" element={<Favorites />} />
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

