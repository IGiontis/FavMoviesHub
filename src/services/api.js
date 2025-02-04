import axios from "axios";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY; // Access env variable in Vite
const BASE_URL = "https://www.omdbapi.com/";

// List of popular movies to rotate daily
const defaultMovies = [
  "Inception",
  "Titanic",
  "The Dark Knight",
  "Avatar",
  "Interstellar",
  "Gladiator",
  "The Matrix",
  "Forrest Gump",
  "The Godfather",
  "Shutter Island",
  "The Prestige",
  "Fight Club",
  "The Social Network",
  "The Avengers",
  "Django Unchained",
  "The Lion King",
  "Whiplash",
  "The Departed",
  "Joker",
];

export const fetchMovies = async (searchTerm) => {
  try {
    let query = searchTerm.trim();

    // If no search term, pick a daily-changing default movie
    if (!query) {
      const dayIndex = new Date().getDate() % defaultMovies.length; // Rotate movies daily
      query = defaultMovies[dayIndex];
    }

    // Fetch movies
    const response = await axios.get(`${BASE_URL}?s=${query}&apikey=${API_KEY}`);

    return response.data.Search || []; // Ensure no errors if response is empty
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};
