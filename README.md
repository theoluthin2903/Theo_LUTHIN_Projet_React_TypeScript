# 🎬 CineScope

CineScope est une application web de découverte et de gestion de films développée avec **React et TypeScript**.  
L'application utilise l'API **TMDB (The Movie Database)** pour récupérer les informations sur les films et permet à l'utilisateur de consulter un catalogue, d'ouvrir les fiches détaillées, de gérer ses favoris, sa bibliothèque personnelle et ses notes.

Le projet a été réalisé dans le cadre d'un projet de développement web.

---

## ✨ Fonctionnalités principales

### 🔐 Authentification
- Création d'un compte avec une adresse e-mail, un pseudo et un mot de passe.
- Connexion avec l'adresse e-mail ou le pseudo.
- Déconnexion.
- Protection des pages nécessitant une authentification.
- Affichage d'un message de bienvenue pendant la session.

### 🏠 Accueil
- Présentation de CineScope.
- Affichage d'une sélection de films populaires.
- Accès rapide aux différentes fonctionnalités de l'application.

### 🎬 Catalogue de films
- Consultation des films disponibles via TMDB.
- Pagination du catalogue.
- Affichage des affiches, titres, dates de sortie et informations principales.
- Accès à la fiche détaillée de chaque film.

### 🔎 Recherche et découverte
- Recherche de films.
- Navigation entre les différentes pages de l'application.
- Consultation des informations fournies par TMDB.

### 🎞️ Fiche détaillée d'un film
Pour chaque film, l'application affiche notamment :
- le titre ;
- l'affiche ;
- le synopsis ;
- la date de sortie ;
- la durée ;
- les genres ;
- la note TMDB ;
- le nombre de votes ;
- le ou les réalisateurs ;
- le pays ou les pays de production avec leur nom complet ;
- la langue originale avec son nom complet.

La fiche détaillée permet également :
- d'ajouter ou de retirer un film de la bibliothèque ;
- de modifier son statut dans la bibliothèque ;
- d'ajouter une note personnelle de **0 à 5 étoiles** ;
- de supprimer sa note enregistrée ;
- d'ajouter ou de retirer un film des favoris.

### 📚 Bibliothèque personnelle
- Ajout et suppression de films.
- Gestion du statut d'un film :
  - à voir ;
  - vu.
- Affichage des informations des films enregistrés, notamment leur date de sortie.
- Accès direct à la fiche détaillée d'un film.

### ⭐ Notes personnelles
- Attribution d'une note de 0 à 5 étoiles.
- Possibilité d'enregistrer une note de 0/5.
- Modification de sa note.
- Suppression de sa note avec le bouton **« Supprimer ma note »**.
- Les films réellement notés apparaissent dans la section **« Films notés »** du profil.

### 👤 Profil
- Affichage du pseudo et de l'adresse e-mail.
- Section **« Films vus »**.
- Section **« Films notés »**.
- Accès aux fiches des films depuis le profil.

---

## 🛠️ Technologies utilisées

### Front-end
- **React**
- **TypeScript**
- **HTML5**
- **CSS3**
- **React Router**

### API
- **TMDB API (The Movie Database)** pour les données des films.

### Outils
- **Node.js**
- **npm**
- **Vite**
- **Git / GitHub**
- **Scalingo** pour le déploiement.

---

## 📦 Installation

### Prérequis

Avant de lancer le projet, vous devez avoir installé :

- [Node.js](https://nodejs.org/)
- npm

Vérifier les installations :

```bash
node --version
npm --version
```

### 1. Cloner le dépôt

```bash
git clone https://github.com/theoluthin2903/Theo_LUTHIN_Projet_React_TypeScript.git
```

### 2. Accéder au dossier du projet

```bash
cd Theo_LUTHIN_Projet_React_TypeScript/CineScope
```

### 3. Installer les dépendances

```bash
npm install
```

---

## 🔑 Configuration de TMDB

CineScope utilise l'API TMDB pour récupérer les informations relatives aux films.

### 1. Créer un compte TMDB

Rendez-vous sur le site officiel :

https://www.themoviedb.org/

Créez un compte ou connectez-vous à votre compte existant.

### 2. Obtenir une clé API

Depuis votre compte TMDB :

1. Accédez aux paramètres de votre compte.
2. Ouvrez la section **API**.
3. Demandez une clé API.
4. Suivez les étapes demandées par TMDB.
5. Récupérez votre clé API.

### 3. Ajouter la clé au projet

Dans le dossier `CineScope`, créez un fichier `.env`.

Ajoutez votre clé API :

```env
VITE_TMDB_API_KEY=votre_cle_api_tmdb
```

> ⚠️ Le nom de la variable d'environnement doit correspondre à celui utilisé dans le projet.

> 🔒 Ne publiez jamais votre clé API dans GitHub. Le fichier `.env` doit rester ignoré par Git.

Après toute modification du fichier `.env`, redémarrez le serveur de développement.

---

## 🚀 Lancer le projet en développement

Une fois les dépendances installées et la clé TMDB configurée :

```bash
npm run dev
```

Vite indiquera dans le terminal l'adresse locale de l'application, généralement :

```text
http://localhost:5173
```

---

## 🏗️ Générer une version de production

Pour construire l'application :

```bash
npm run build
```

Pour prévisualiser la version de production :

```bash
npm run preview
```

---

## 🌐 Version déployée

La version en ligne de CineScope est déployée sur **Scalingo** :

https://app-cinescope-theol.osc-fr1.scalingo.io

---

## 📁 Structure du projet

```text
Theo_LUTHIN_Projet_React_TypeScript/
│
├── CineScope/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   └── ...
│   │
│   ├── .env
│   ├── package.json
│   ├── tsconfig.json
│   └── ...
│
├── Procfile
├── README.md
└── fil_rouge.pdf
```

---

## 🎯 Objectifs du projet

Ce projet permet de mettre en pratique :

- le développement d'une application avec React ;
- l'utilisation de TypeScript ;
- la création d'interfaces utilisateur avec HTML et CSS ;
- la gestion des routes avec React Router ;
- la consommation d'une API externe ;
- la gestion d'état avec les Contexts React ;
- la gestion de données persistées dans le navigateur ;
- la création d'une interface responsive ;
- le déploiement d'une application web.

---

## 👨‍💻 Auteur

**Theo LUTHIN**

Projet React / TypeScript — CineScope.

---

## 📄 Licence

Projet réalisé dans un cadre scolaire.
