import { configureStore } from '@reduxjs/toolkit'
import genreReducer from "./genreSlice";

export const store = configureStore({
  reducer: {
    genre: genreReducer
  },
})