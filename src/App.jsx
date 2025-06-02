// import { useState } from "react";
import { useEffect ,useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import LayoutWrapper from "@/components/layouts/LayoutWrapper";

import HomePage from "@/Pages/HomePage";
import NotFound from "@/components/layouts/NotFound";
import MoviesMainPage from "@/Pages/MoviesMainPage";
import MoviePage from "@/Pages/MoviePage";
import TVShowsMainPage from "@/Pages/TVShowsMainPage";
import TVShowPage from "@/Pages/TVShowPage";
import WatchListMainPage from "@/Pages/WatchListMainPage";
import AlreadyWatchedMainPage from "@/Pages/AlreadyWatchedMainPage";
import MyListPage from "@/Pages/MyListPage";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<LayoutWrapper />}>
          <Route path="/movies/" element={<MoviesMainPage />} />
          <Route path="/mylist" element={<MyListPage />} />
          <Route path="/tvshows/" element={<TVShowsMainPage />} />
          <Route path="/upcoming" element={<WatchListMainPage />} />

          <Route path="/watchlist/" element={<WatchListMainPage />} />
          <Route path="/mylist" element={<WatchListMainPage />} />
          <Route path="/alreadywatched/" element={<AlreadyWatchedMainPage />} />

          <Route path="/movies/:id" element={<MoviePage />} />
          <Route path="/tvshows/:id" element={<TVShowPage />} />
          <Route path="/tvshows/:id/season/:seasonNo" element={<TVShowPage />} />
          {/* <Route path="/" element={<HomePage />} /> */}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
