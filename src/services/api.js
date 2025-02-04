import axios from "axios";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY; // Correct way to access env variable in Vite
const BASE_URL = "http://www.omdbapi.com/";

export const fetchMovies = async (searchTerm) => {
  if (!searchTerm.trim()) return []; // Avoid empty searches

  try {
    const response = await axios.get(`${BASE_URL}?s=${searchTerm.split(" ")[0]}&apikey=${API_KEY}`);

    // Ensure API returned results
    if (!response.data.Search) return [];

    return response.data.Search;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};
