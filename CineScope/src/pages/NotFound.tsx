import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="not-found">
      <span className="eyebrow">Erreur 404</span>
      <h1>Page introuvable</h1>
      <p>La page que vous recherchez n'existe pas ou n'est plus disponible.</p>
      <Link to="/" className="movie-infos-button">
        Retour à l'accueil
      </Link>
    </section>
  );
}

export default NotFound;
