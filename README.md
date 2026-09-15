# 🎬 CineScope

CineScope est une application web de découverte de films développée avec **React** et **TypeScript**.
L'application utilise l'API **TMDB (The Movie Database)** afin de récupérer et d'afficher des informations sur les films : affiches, titres, descriptions, notes, dates de sortie, genres, etc.

L'objectif du projet est de proposer une interface moderne et intuitive permettant aux utilisateurs de rechercher et de découvrir des films facilement.

---

## ✨ Fonctionnalités principales

* 🔎 Recherche de films
* 🎬 Affichage des films disponibles depuis l'API TMDB
* 🖼️ Affichage des affiches et informations principales des films
* ⭐ Affichage des notes des films
* 📅 Affichage des dates de sortie
* 📖 Affichage des synopsis
* 🎭 Affichage des genres
* 📱 Interface responsive adaptée aux différentes tailles d'écran
* ⚡ Navigation dynamique entre les différentes pages
* 🌐 Récupération des données en temps réel depuis l'API TMDB

---

## 🛠️ Technologies utilisées

### Front-end

* **React** — bibliothèque JavaScript pour la création de l'interface utilisateur
* **TypeScript** — typage statique et sécurisation du code
* **HTML5**
* **CSS3**

### API

* **TMDB API** — récupération des données concernant les films

### Outils

* **Node.js**
* **npm**
* **Git / GitHub**

---

## 📦 Installation

### Prérequis

Avant de commencer, assurez-vous d'avoir installé :

* [Node.js](https://nodejs.org/)
* npm

Vous pouvez vérifier les versions installées avec :

```bash
node --version
npm --version
```

---

## 🚀 Lancer le projet en local

### 1. Cloner le dépôt

```bash
git clone https://github.com/theoluthin2903/Theo_LUTHIN_Projet_React_TypeScript.git
```

### 2. Se placer dans le dossier du projet

```bash
cd Theo_LUTHIN_Projet_React_TypeScript/CineScope
```

### 3. Installer les dépendances

```bash
npm install
```

### 4. Configurer TMDB

Créer un fichier `.env` à la racine du projet `CineScope`.

Ajouter la clé API TMDB dans la variable d'environnement utilisée par le projet.

Exemple :

```env
VITE_TMDB_API_KEY=votre_cle_api_tmdb
```

> ⚠️ Le nom de la variable doit correspondre exactement à celui utilisé dans le code du projet. Si le projet utilise une autre variable, remplacez `VITE_TMDB_API_KEY` par le nom correspondant.

### 5. Démarrer l'application

```bash
npm run dev
```

L'application sera ensuite accessible à l'adresse indiquée par Vite dans le terminal, généralement :

```text
http://localhost:5173
```

---

## 🔑 Configuration de TMDB

CineScope utilise l'API de **The Movie Database (TMDB)** pour récupérer les informations sur les films.

### 1. Créer un compte TMDB

Rendez-vous sur le site officiel de TMDB et créez un compte :

https://www.themoviedb.org/

### 2. Créer une clé API

Une fois connecté :

1. Accédez aux paramètres de votre compte.
2. Ouvrez la section **API**.
3. Demandez une nouvelle clé API.
4. Choisissez le type d'utilisation correspondant à votre projet.
5. Récupérez votre clé API.

### 3. Ajouter la clé au projet

Dans le dossier `CineScope`, créez un fichier :

```text
.env
```

Ajoutez ensuite votre clé :

```env
VITE_TMDB_API_KEY=votre_cle_api_tmdb
```

Exemple :

```env
VITE_TMDB_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

> 🔒 **Important :** ne publiez jamais votre clé API directement dans le dépôt GitHub. Le fichier `.env` doit être ajouté au `.gitignore`.

Après avoir ajouté ou modifié la variable d'environnement, redémarrez le serveur de développement :

```bash
npm run dev
```

---

## 🏗️ Build de production

Pour générer la version optimisée de l'application :

```bash
npm run build
```

Les fichiers nécessaires au déploiement seront générés dans le dossier de build configuré par le projet.

Pour tester la version de production localement, utilisez la commande prévue par le projet, par exemple :

```bash
npm run preview
```

---

## 🌐 Version déployée

La version en ligne de **CineScope** est disponible à l'adresse suivante :

**[À compléter avec l'URL de déploiement]**

> Exemple : `https://mon-projet-cinescope.vercel.app`

---

## 📁 Structure du projet

Le projet est organisé autour de l'application **CineScope** :

```text
Theo_LUTHIN_Projet_React_TypeScript/
│
├── CineScope/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   │
│   ├── .env
│   ├── package.json
│   ├── tsconfig.json
│   └── ...
│
└── fil_rouge.pdf
```

---

## 🎯 Objectif du projet

Ce projet a été réalisé dans le cadre d'un projet de développement web avec pour objectif de mettre en pratique :

* le développement d'une application avec **React** ;
* l'utilisation de **TypeScript** ;
* la consommation d'une **API externe** ;
* la gestion de données dynamiques ;
* la création d'une interface utilisateur responsive ;
* la structuration d'une application front-end moderne.

---

## 👨‍💻 Auteur

**Theo LUTHIN**

Projet React / TypeScript — CineScope.

---

## 📄 Licence

Ce projet est réalisé dans un cadre pédagogique.
