interface MovieCardProps {
    id: number;
    title: string;
    year: number;
    note: number;
    genres: string[];
    duree: number;
    description: string;
    imagePath: string;

}
function MovieCard({title, genres, year, note, duree, description, imagePath }: MovieCardProps) {
return (
<article className="movie-card">
<img src={imagePath} alt={title} />
<h2>{title}</h2>
<p>{genres.join(", ")}</p>
<p>{year}</p>
<p>Note: ⭐{note}/10</p>
<p>Durée: {duree} minutes</p>
<p>{description}</p>
</article>
);
}
export default MovieCard;