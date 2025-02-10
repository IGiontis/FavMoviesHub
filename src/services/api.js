import axios from "axios";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

const DEFAULT_MOVIES = [
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

export const fetchMovies = async (searchTerm = "") => {
  const query = searchTerm.trim() || getDailyMovie(); 

  const { data } = await axios.get(BASE_URL, {
    params: { s: query, apikey: API_KEY },
  });

  return data.Search?.filter((movie) => ["movie", "series"].includes(movie.Type)) || [];
};

const getDailyMovie = () => {
  const dayIndex = new Date().getDate() % DEFAULT_MOVIES.length;
  return DEFAULT_MOVIES[dayIndex];
};
