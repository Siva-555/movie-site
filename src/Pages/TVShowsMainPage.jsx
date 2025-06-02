import React, { useCallback, useEffect, useState } from "react";
import MediaList from "@/components/MediaComponents/MediaList";

import redirectURL from "@/redirectURL";
import MediaByGenres from "@/components/MediaComponents/MediaByGenres";

const TVShowsMainPage = () => {
  const [trendingInfo, setTrendingInfo] = useState({
    // loading: false,
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  });
  const [topRatedInfo, setTopRatedInfo] = useState({
    // loading: false,
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  });

  const [loading, setLoading] = useState({loading1: false, loading2: false })

  const getTrendingInfo = useCallback(() => {
    let query_params = {
      language: "en-US",
      page: 1,
    };
    setLoading((prev)=>({...prev, loading1: true}));

    redirectURL.get("/trending/tv/week", { params: query_params })
      .then((res) => {
        if(res.status===200){
          setTrendingInfo(res.data);
        }
        // console.log(res);
      })
      .catch((err) => console.log(err))
      .finally(()=> setLoading((prev)=>({...prev, loading1: false})) )
  }, []);

  const getTopRatedInfo = useCallback(() => {
    let query_params = {
      language: "en-US",
      page: 1,
    };
    setLoading((prev)=>({...prev, loading2: true}));

    redirectURL.get("/tv/top_rated", { params: query_params })
      .then((res) => {
        if(res.status===200){
          setTopRatedInfo(res.data);
        }
      })
      .catch((err) => console.log(err))
      .finally(()=> setLoading((prev)=>({...prev, loading2: false})) )

  }, []);

  useEffect(() => {
    getTrendingInfo();
    getTopRatedInfo();
  }, []);

  return (
    <div className="mx-0 md:mx-5 my-3 ">
      <div>
        <h4 className="text-base md:text-xl font-semibold ml-2 md:ml-4">Treding TV Shows</h4>
        <MediaList 
          className="mt-2 md:p-3" 
          listType="trending"
          catagoryType="tvshows"
          loading={loading.loading1} 
          dataList={trendingInfo.results}
          page={trendingInfo.page} 
        />
      </div>
      <div className="mt-3">
        <h4 className="text-base md:text-xl font-semibold ml-2 md:ml-4">Top Rated TV Shows</h4>
        <MediaList 
          className="mt-2 md:p-3" 
          listType="top_rated"
          catagoryType="tvshows"
          loading={loading.loading2} 
          dataList={topRatedInfo.results} 
          page={topRatedInfo.page} 
        />
      </div>
      <MediaByGenres className="my-10" catagoryType="tvshows" /> 
    </div>
  );
};

export default TVShowsMainPage;
