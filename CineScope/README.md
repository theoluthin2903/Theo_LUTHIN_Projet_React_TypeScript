# CineScope

CineScope est une application React/TypeScript permettant de parcourir des films, rechercher un titre, consulter ses détails et gérer ses favoris.

## Fonctionnalités

- Catalogue de films populaires fourni par l'API TMDB
- Pagination du catalogue
- Recherche de films via TMDB
- Page de détail avec affiche, note, genres, durée, distribution et pays de production
- Ajout et retrait des favoris avec conservation dans le navigateur
- Navigation avec React Router
- Interface responsive

## Technologies

- React 19
- TypeScript
- Vite
- React Router
- API The Movie Database (TMDB)
- CSS

## Installation

```bash
npm install
```

Créez un fichier `.env` à la racine de `CineScope` à partir de `.env.example` :

```env
VITE_TMDB_API_KEY=votre_cle_api_tmdb
```

La clé peut être créée depuis le compte TMDB, dans la section API. Ne commitez jamais votre fichier `.env`.

## Lancer le projet

```bash
npm run dev
```

L'application sera disponible à l'adresse indiquée par Vite, généralement `http://localhost:5173`.

## Vérifications

```bash
npm run lint
npm run build
```

Les films affichés proviennent de TMDB. Le catalogue est paginé car l'API renvoie ses résultats par pages ; il n'est pas possible de charger la totalité des films existants en une seule requête.
