import React, { useCallback, useEffect, useState } from "react";
import MediaList from "@/components/MediaComponents/MediaList";

import redirectURL from "@/redirectURL";
import MediaByGenres from "@/components/MediaComponents/MediaByGenres";

const MoviesMainPage = () => {
  const [trendingMoviesInfo, setTrendingMoviesInfo] = useState({
    // loading: false,
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  });
  const [topRatedMoviesInfo, setTopRatedMoviesInfo] = useState({
    // loading: false,
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  });

  const [loading, setLoading] = useState({loading1: false, loading2: false })

  const getTrendingMovies = useCallback(() => {
    let query_params = {
      language: "en-US",
      page: 1,
    };
    setLoading((prev)=>({...prev, loading1: true}));

    redirectURL.get("/trending/movie/week", { params: query_params })
      .then((res) => {
        if(res.status===200){
            setTrendingMoviesInfo(res.data);
        }
        // console.log(res);
      })
      .catch((err) => console.log(err))
      .finally(()=> setLoading((prev)=>({...prev, loading1: false})) )
  }, []);

  const getTopRatedMovies = useCallback(() => {
    let query_params = {
      language: "en-US",
      page: 1,
    };
    setLoading((prev)=>({...prev, loading2: true}));

    redirectURL.get("/movie/top_rated", { params: query_params })
      .then((res) => {
        if(res.status===200){
          setTopRatedMoviesInfo(res.data);
        }
        // console.log(res);
      })
      .catch((err) => console.log(err))
      .finally(()=> setLoading((prev)=>({...prev, loading2: false})) )

  }, []);

  useEffect(() => {
    getTrendingMovies();
    getTopRatedMovies();
  }, []);

  return (
    <div className="mx-0 md:mx-5 my-3 ">
      <div>
        <h4 className="text-base md:text-xl font-semibold ml-2 md:ml-4">Treding Movies</h4>
        <MediaList 
          className="mt-2 md:p-3" 
          listType="trending" 
          catagoryType="movies"
          loading={loading.loading1} 
          dataList={trendingMoviesInfo.results}
          page={trendingMoviesInfo.page} 
        />
      </div>
      <div className="mt-3">
        <h4 className="text-base md:text-xl font-semibold ml-2 md:ml-4">Top Rated Movies</h4>
        <MediaList 
          className="mt-2 md:p-3" 
          listType="top_rated"
          catagoryType="movies"
          loading={loading.loading2} 
          dataList={topRatedMoviesInfo.results} 
          page={topRatedMoviesInfo.page} 
        />
      </div>
      <MediaByGenres className="my-10" catagoryType="movies" /> 
    </div>
  );
};

export default MoviesMainPage;
