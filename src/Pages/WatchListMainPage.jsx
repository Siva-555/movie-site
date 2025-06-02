import React, { useCallback, useEffect, useState } from "react";
import MediaList from "@/components/MediaComponents/MediaList";

import redirectURL from "@/redirectURL";
import { getAllDataFromDB } from "@/services/indexdDB";
import { Bookmark, Search } from "lucide-react";

import { motion, AnimatePresence } from "motion/react"
import SearchButton from "@/components/Search/SearchButton";
import EmptyMedia from "@/components/MediaComponents/EmptyMedia";

const WatchListMainPage = () => {

  const [movies, setMovies] = useState([]);
  const [tvshows, setTVshows] = useState([]);

  const [loading, setLoading] = useState({loading1: true, loading2: true })

  const fetchWatchlistMovies = async (list) => {
    if (!list.length) {
      setLoading((prev)=>({...prev, loading1: false}));
      return []
    }
  
    try {
      let query_params = { language: "en-US" };

      setLoading((prev)=>({...prev, loading1: true}));

      const responses = await Promise.all(
          list.map((ele) =>  redirectURL.get(`/movie/${ele.recordId}`, query_params).then((res) => {
            // console.log(" test - movie ", res)

            // if(ele.alreadyWatched && res.data) res.data.alreadyWatched = 1
            if(ele.bookMarked && res.data) res.data.bookMarked = 1
            if(ele.modifiedDate && res.data) res.data.modifiedDate = ele.modifiedDate

            return res.data
          }) 
        )
      );

      
      return responses;
    } catch (error) {
      console.error("Error fetching movies:", error);
      return [];
    }
    finally{
      setLoading((prev)=>({...prev, loading1: false}));
    }
  };
  const fetchTVShowsMovies = async (list) => {
    if (!list.length) {
      setLoading((prev)=>({...prev, loading2: false}))
      return []
    };
  
    try {
      let query_params = { language: "en-US" };
      setLoading((prev)=>({...prev, loading2: true}));
      const responses = await Promise.all(
          list.map((ele) =>  redirectURL.get(`/tv/${ele.recordId}`, query_params).then((res) => {
            // console.log(" test - movie ", res)

            // if(ele.alreadyWatched && res.data) res.data.alreadyWatched = 1
            if(ele.bookMarked && res.data) res.data.bookMarked = 1
            if(ele.modifiedDate && res.data) res.data.modifiedDate = ele.modifiedDate

            return res.data
          }) 
        )
      );
  
      return responses;
    } catch (error) {
      console.error("Error fetching movies:", error);
      return [];
    }
    finally{
      setLoading((prev)=>({...prev, loading2: false}));
    }
  };


  const loadData = async ()=>{

    try{
      const respFromIndexDB = await getAllDataFromDB();
      let allRecords = respFromIndexDB?.data;


      if(respFromIndexDB.bool && allRecords?.length>0){
        allRecords.sort((a,b)=> new Date(a.modifiedDate) - new Date(b.modifiedDate));

        let movieRecordsDB = [];
        let tvshowRecordsDB = [];
        allRecords.forEach((ele)=>{
          if((ele?.type === "movie") && ele?.bookMarked === 1 && ele?.recordId) movieRecordsDB.push(ele);
          else if(ele?.type === "tvshow" && ele?.bookMarked === 1 && ele?.recordId) tvshowRecordsDB.push(ele);
        })

        fetchWatchlistMovies(movieRecordsDB).then(results=>setMovies(results)).catch((err)=>console.log("err ", err))
        fetchTVShowsMovies(tvshowRecordsDB).then(results=>setTVshows(results)).catch((err)=>console.log("err ", err))
      }else{
        setLoading({loading1:false, loading2: false})
      }
  
    }
    catch(err){
      console.Error("Error", err);
      setLoading({loading1:false, loading2: false})
    }
  }
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="my-3 space-y-3 ">
      <AnimatePresence mode="wait">
        {
          movies?.length == 0 && tvshows?.length == 0 && !loading.loading1 && !loading.loading2 &&
          <EmptyMedia className="" cardKey="watchlist-empty" icon={<Bookmark  />} title="Your watchlist is empty!" subTitle="See something you like? Add it to your watchlist and watch it anytime!" />
        }
      </AnimatePresence>
      {movies?.length>0 && <div>
        <h4 className="text-base md:text-xl font-semibold ">
          <span>Movies</span>
          <span className=" rounded-full text-sm bg-slate-600 py-0.5 px-1.5  ml-2">{movies?.length}</span>
        </h4>
        <MediaList 
          className="mt-3  " 
          listType="watchlist"
          catagoryType="movies"
          loading={loading.loading1} 
          dataList={movies}
        />
      </div>}
      {tvshows?.length>0 && <div className="">
        <h4 className="text-base md:text-xl font-semibold ">
          <span>TV Shows</span>
          <span className=" rounded-full text-sm bg-slate-600 py-0.5 px-1.5  ml-2">{tvshows?.length}</span>
        </h4>
        <MediaList 
          className="mt-3 " 
          listType="watchlist"
          catagoryType="tvshows"
          loading={loading.loading2} 
          dataList={tvshows} 
        />
      </div>}
    </div>
  );
};

export default WatchListMainPage;
