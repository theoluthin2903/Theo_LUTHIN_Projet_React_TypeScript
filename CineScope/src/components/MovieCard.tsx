import { Link } from "react-router-dom";

interface MovieCardProps {
    id: number;
    title: string;
    year: number;
    note: number;
    genres: string[];
    duree: number;
    description: string;
    realisateur: string[]
    imagePath: string;

}
function MovieCard({id, title, genres, year, note, duree, description, realisateur, imagePath }: MovieCardProps) {
return (
<article className="movie-card">
<img src={imagePath} alt={title} />
<h2>{title}</h2>
<p>De {realisateur.join(" et ")}</p>
<p>{genres.join(", ")}</p>
<p>{year}</p>
<p>Note : ⭐{note}/10</p>
<p>Durée : {duree} minutes</p>
<p dangerouslySetInnerHTML={{ __html: description }} />
<div className="movie-card-actions">
  <Link to={`/movie/${id}`} className="movie-infos-button">
    Voir le film
  </Link>
  <button className="favorite-button">Ajouter aux favoris</button>
</div>
</article>
);
}
export default MovieCard;