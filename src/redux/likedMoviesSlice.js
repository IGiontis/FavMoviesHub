import { createSlice } from "@reduxjs/toolkit";

const likedMoviesSlice = createSlice({
  name: "likedMovies",
  initialState: [],
  reducers: {
    addLikedMovie: (state, action) => {
      if (!state.some((movie) => movie.imdbID === action.payload.imdbID)) {
        state.push(action.payload);
      }
    },
    removeLikedMovie: (state, action) => {
      return state.filter((movie) => movie.imdbID !== action.payload);
    },
    clearLikedMovies: () => {
      return [];
    },
  },
});

export const { addLikedMovie, removeLikedMovie, clearLikedMovies } = likedMoviesSlice.actions;
export default likedMoviesSlice.reducer;
