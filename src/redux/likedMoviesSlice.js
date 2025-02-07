import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  likedMovies: [],
};

const likedMoviesSlice = createSlice({
  name: "likedMovies",
  initialState,
  reducers: {
    addLikedMovie: (state, action) => {
      console.log(action.payload);
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
  },
});

export const { addLikedMovie, removeLikedMovie, clearLikedMovies } = likedMoviesSlice.actions;
export default likedMoviesSlice.reducer;
