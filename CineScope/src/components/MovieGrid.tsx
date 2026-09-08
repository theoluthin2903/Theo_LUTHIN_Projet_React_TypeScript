import MovieCard from "./MovieCard";
import inceptionImage from "../assets/Inception.jpeg";
import interstellarImage from "../assets/Interstellar.jpg";
import matrixImage from "../assets/Matrix.jpeg";
import parasiteImage from "../assets/Parasite.jpg";
import shawshankImage from "../assets/The_shawshank_redemption.jpeg";
import theDarkKnightImage from "../assets/The_dark_knight.jpg";
  
function MovieGrid() {
  return (
    <div className="movie-grid">
  <MovieCard id={1} title="Interstellar" genres={["Science Fiction", "Drame", "Aventure"]} year={2014} note={8.7} duree={169} description="Une équipe d'explorateurs voyage à travers un trou de ver afin de trouver une nouvelle planète habitable pour l'humanité." imagePath={interstellarImage} />
  <MovieCard id={2} title="Inception" genres={["Science Fiction", "Action", "Thriller"]} year={2010} note={8.8} duree={148} description="Un spécialiste de l'extraction de secrets pénètre dans les rêves d'autres personnes et reçoit une mission particulièrement difficile" imagePath={inceptionImage} />
  <MovieCard id={3} title="The Dark Knight" genres={["Action", "Crime", "Drame"]} year={2008} note={9.0} duree={152} description="Batman affronte un criminel qui cherche à plonger Gotham City dans le chaos." imagePath={theDarkKnightImage} />
  <MovieCard id={4} title="Matrix" genres={["Science Fiction", "Action"]} year={1999} note={8.7} duree={154} description="Un programme informatique qui permet de contrôler la réalité, et qui est utilisé par des agents du gouvernement pour infiltrer le système." imagePath={matrixImage} />
  <MovieCard id={5} title="Parasite" genres={["Thriller", "Drame"]} year={2019} note={8.5} duree={132} description="Une famille pauvre s'infiltre dans la vie d'une famille riche, mais les choses tournent mal." imagePath={parasiteImage} />
  <MovieCard id={6} title="The Shawshank Redemption" genres={["Drame"]} year={1994} note={9.3} duree={142} description="Deux hommes emprisonnés se lient d'amitié sur plusieurs années, trouvant du réconfort et de la rédemption à travers des actes de décence commune." imagePath={shawshankImage} />
    </div>  
  );
}
export default MovieGrid;