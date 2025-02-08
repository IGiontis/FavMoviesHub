import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likedMovies: [],
};

const likedMoviesSlice = createSlice({
  name: "likedMovies",
  initialState,
  reducers: {
    setLikedMovies: (state, action) => {
      state.likedMovies = action.payload; 
    },
    addLikedMovie: (state, action) => {
      if (!state.likedMovies.some((movie) => movie.imdbID === action.payload.imdbID)) {
        state.likedMovies.push(action.payload);
      }
    },
    removeLikedMovie: (state, action) => {
      state.likedMovies = state.likedMovies.filter((movie) => movie.imdbID !== action.payload);
    },
    clearLikedMovies: (state) => {
      state.likedMovies = [];
    },
    toggleDislikeMovie: (state, action) => {
      state.likedMovies = state.likedMovies.map((movie) =>
        movie.imdbID === action.payload ? { ...movie, disliked: !movie.disliked } : movie
      );
    },
  },
});

export const { setLikedMovies, addLikedMovie, removeLikedMovie, clearLikedMovies,toggleDislikeMovie } = likedMoviesSlice.actions;
export default likedMoviesSlice.reducer;
