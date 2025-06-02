import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  movies: [],
  tvshows: [],
};

export const genreSlice = createSlice({
  name: "genre",
  initialState,
  reducers: {
    setMovieGeners: (state, action) => {
      // console.log("test setmovie", action);
      state.movies = action.payload;
    },
    setTvShowsGenres: (state, action) => {
      state.tvshows = action.payload;
    },
    setLoadingGenre: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setMovieGeners, setTvShowsGenres, setLoadingGenre } = genreSlice.actions;

export default genreSlice.reducer;
