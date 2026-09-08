import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "../components/Footer";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<main className="app-shell">
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/movies" element={<Movies />} />
					<Route path="/favorites" element={<Favorites />} />
				</Routes>
				<Footer />
			</main>
		</BrowserRouter>
	);
}
export default App;

