import axios from "axios";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY; // Correct way to access env variable in Vite
const BASE_URL = "http://www.omdbapi.com/";

export const fetchMovies = async (searchTerm) => {
  try {
    const response = await axios.get(`${BASE_URL}?s=${searchTerm}&apikey=${API_KEY}`);
    console.log(response)
    return response.data.Search || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};
