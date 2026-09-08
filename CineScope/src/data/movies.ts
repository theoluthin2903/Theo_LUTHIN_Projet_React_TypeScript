import inceptionImage from "../assets/Inception.jpeg";
import interstellarImage from "../assets/Interstellar.jpg";
import matrixImage from "../assets/Matrix.jpeg";
import parasiteImage from "../assets/Parasite.jpg";
import shawshankImage from "../assets/The_shawshank_redemption.jpeg";
import theDarkKnightImage from "../assets/The_dark_knight.jpg";

export interface Movie {
  id: number;
  title: string;
  genres: string[];
  year: number;
  note: number;
  duree: number;
  description: string;
  synopsis: string;
  cast: string[];
  imagePath: string;
}

export const movies: Movie[] = [
  { id: 1, title: "Interstellar", genres: ["Science Fiction", "Drame", "Aventure"], year: 2014, note: 8.7, duree: 169, description: "Une équipe d'explorateurs voyage à travers un trou de ver afin de trouver une nouvelle planète habitable pour l'humanité.", synopsis: "Dans un futur où la Terre est en train de devenir inhabitable, un groupe d'explorateurs traversent un trou de ver pour trouver une nouvelle maison pour l'humanité.", cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine"], imagePath: interstellarImage },
  { id: 2, title: "Inception", genres: ["Science Fiction", "Action", "Thriller"], year: 2010, note: 8.8, duree: 148, description: "Un spécialiste de l'extraction de secrets pénètre dans les rêves d'autres personnes et reçoit une mission particulièrement difficile", synopsis: "Un voleur de rêves doit planter une idée dans l'esprit d'un héritier afin de provoquer une transformation profonde et décisive.", cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page", "Tom Hardy"], imagePath: inceptionImage },
  { id: 3, title: "The Dark Knight", genres: ["Action", "Crime", "Drame"], year: 2008, note: 9.0, duree: 152, description: "Batman affronte un criminel qui cherche à plonger Gotham City dans le chaos.", synopsis: "Quand l'inspecteur Gordon et Batman tentent de contenir l'anarchie, ils se heurtent à un criminel sans limite qui défie l'ordre établi.", cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Gary Oldman"], imagePath: theDarkKnightImage },
  { id: 4, title: "Matrix", genres: ["Science Fiction", "Action"], year: 1999, note: 8.7, duree: 154, description: "Un programme informatique qui permet de contrôler la réalité, et qui est utilisé par des agents du gouvernement pour infiltrer le système.", synopsis: "Un hacker découvre la vérité sur le monde dans lequel il vit et se lance dans une lutte contre les machines qui gouvernent la réalité.", cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss", "Hugo Weaving"], imagePath: matrixImage },
  { id: 5, title: "Parasite", genres: ["Thriller", "Drame"], year: 2019, note: 8.5, duree: 132, description: "Une famille pauvre s'infiltre dans la vie d'une famille riche, mais les choses tournent mal.", synopsis: "Une famille au bord du gouffre se glisse dans la vie d'une famille aisée, jusqu'à ce que les tensions cachées explosent.", cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong", "Park So-dam"], imagePath: parasiteImage },
  { id: 6, title: "The Shawshank Redemption", genres: ["Drame"], year: 1994, note: 9.3, duree: 142, description: "Deux hommes emprisonnés se lient d'amitié sur plusieurs années, trouvant du réconfort et de la rédemption à travers des actes de décence commune.", synopsis: "Un banquier condamné à tort s'unit à un détenu expérimenté dans une lutte silencieuse pour garder espoir et humanité.", cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton", "William Sadler"], imagePath: shawshankImage },
];
