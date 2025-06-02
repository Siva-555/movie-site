import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import redirectURL from "@/redirectURL";

import MovieSummary from "@/components/MovieSummary";
import TVShowSummary from "@/components/TVShowSummary";
import CastList from "@/components/common/CastList";

import { IMG_BASE_URL, CAST_LIMIT, YOUTUBE_EMBED_URL, VIDEOS_LIMIT, VIDEO_THUMBNAIL_URL } from "@/lib/constants";
import VideosList from "@/components/VideosList";
import RecommendationList from "@/components/MediaComponents/RecommendationList";
import Reviews from "@/components/Reviews";

import { useLocation } from "react-router-dom";
import TVSeasonSection from "@/components/TVSeasonSection";
import { getImageURL } from "@/lib/utils";
import TVEpisodeSection from "@/components/TVEpisodeSection";
import SkeletonLoader1 from "@/components/common/SkeletonLoader1";
import SkeletonLoaderPage from "@/components/common/SkeletonLoaderPage";
import maskImage from "@/assets/mask.svg";
import { ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';

const TVShowPage = () => {
  const [mediaInfo, setMediaInfo] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [castInfo, setCastInfo] = useState([]);
  const [videosList, setVideosList] = useState([]);
  const [recommedationList, setRecommedationList] = useState([]);
  const [seasonInfo, setSeasonInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageType, setTypeType] = useState("")

  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const getMediaInfo = useCallback( async (id, catagoryType) => {
      let query_params = { language: "en-US" };
      // let type = catagoryType == "movies" ? "movie" : (catagoryType== "tvshows" && "tv" );
      try {
        setLoading(true);
        let res = await redirectURL.get(`/tv/${id}`, {  params: query_params, });
        if (res.status === 200) {
          let data = res.data;
          if(data?.seasons?.length>0){
            let temp_seasons = data.seasons?.filter((ele)=>ele.season_number>0)
            temp_seasons.sort((a,b)=>a.season_number-b.season_number);
            setSeasons(temp_seasons);
          }
          setMediaInfo(data);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    },
    [params.id]
  );

  const getCastInfo = useCallback( async (id, catagoryType) => {
      let query_params = { language: "en-US" };
      // let type = catagoryType == "movies" ? "movie" : (catagoryType== "tvshows" && "tv" );
      try {
        // setLoading(true);
        let res = await redirectURL.get(`/tv/${id}/credits`, { params: query_params, });
        if (res.status === 200) {
          let data = res.data;

          let temp_cast = [];
          let c = 0;
          data?.cast?.forEach((ele, index)=>{

            if(ele?.profile_path && c <= CAST_LIMIT){
              c +=1;
              temp_cast.push({
                profile_path: ele?.profile_path || null,
                profile_img_url: ele?.profile_path  ? `${IMG_BASE_URL}/w185/${ele?.profile_path}` : null,
                original_name: ele?.original_name,
                name: ele?.name,
                character: ele?.character,
              })
            }
          })
          setCastInfo(temp_cast || []);
          // setLoading(false);
        }
      } catch (err) {
        console.log(err);
        // setLoading(false);
      }
    },
    [params.id]
  );

  const getVideosList= useCallback( async (id, catagoryType) => {
      let query_params = { language: "en-US" };
      // let type = catagoryType== "movies" ? "movie" : (catagoryType== "tvshows" && "tv" );
      try {
        // setLoading(true);
        let res = await redirectURL.get(`/tv/${id}/videos`, { params: query_params, });
        if (res.status === 200) {
          let results = res.data?.results || [];

          if(results?.length>0){
            const order = { Trailer: 0, Clip: 1 };
            results.sort((a, b) => (order[a.type] ?? 2) - (order[b.type] ?? 2) );
          }

          let temp_videos = [];
          let c = 0
          results?.forEach((ele, index)=>{
            if(ele?.key && ele.site==="YouTube" && (c <= VIDEOS_LIMIT )&& ["Clip", "Trailer"].includes(ele.type)){
              c +=1;
              ele.video_link = `${YOUTUBE_EMBED_URL}/${ele.key}`;
              ele.thumbnail = `${VIDEO_THUMBNAIL_URL}/${ele.key}/0.jpg`;
              temp_videos.push(ele)
            }
          })
          setVideosList(temp_videos || []);
          // setLoading(false);
        }
      } catch (err) {
        console.log(err);
        // setLoading(false);
      }
    },
    [params.id]
  );

  const getRecommendations= useCallback( async (id, catagoryType) => {
      let query_params = { language: "en-US", page: 1 };
      // let type = catagoryType== "movies" ? "movie" : (catagoryType== "tvshows" && "tv" );
      try {
        // setLoading(true);
        let res = await redirectURL.get(`/tv/${id}/recommendations`, { params: query_params});
        if (res.status === 200) {
          let results = res.data?.results || [];

          setRecommedationList(results || []);
          // setLoading(false);
        }
      } catch (err) {
        console.log(err);
        // setLoading(false);
      }
    },
    [params.id]
  );

  const getSeasonInfo= useCallback( async (id, seasonNo) => {
      let query_params = { language: "en-US", page: 1 };
      // let type = catagoryType== "movies" ? "movie" : (catagoryType== "tvshows" && "tv" );
      try {
        // setLoading(true);
        let res = await redirectURL.get(`/tv/${id}/season/${seasonNo}`, { params: query_params});
        if (res.status === 200) {
          let results = res.data || null;

          setSeasonInfo(results || null);
          // setLoading(false);
        }
      } catch (err) {
        console.log(err);
        // setLoading(false);
      }
    },
    [params.id, params.seasonNo]
  );

  useEffect(() => {
    // let temp = location.pathname?.includes("movies") ? "movies" : (location.pathname?.includes("tvshows") && "tvshows")
    // console.log("test---", params)
    
    getMediaInfo(params.id, "tvshows");
    getCastInfo(params.id, "tvshows");
    getVideosList(params.id, "tvshows");
    getRecommendations(params.id, "tvshows");

    if(params.seasonNo){
      getSeasonInfo(params.id,params.seasonNo);
    }
    else{
      setSeasonInfo(null)
    }

  }, [params.id, params.seasonNo])
  

  let vote_average = "";
  let vote_count = "";
  let tvShowType = "tvshow";

  if(mediaInfo){
    vote_average= mediaInfo?.vote_average || "";
    vote_count= mediaInfo?.vote_count || "";
    tvShowType="tvshow";
  }
  if(seasonInfo){
    vote_average= seasonInfo?.vote_average || "";
    vote_count= seasonInfo?.vote_count || "";
    tvShowType="season";
  }
  if(loading){
    return <SkeletonLoaderPage className={"md:px-10"} />
  }
  return (
    <div className="flex flex-col mb-10 container relative">
      <div className="md:px-10 relative">
        <motion.div 
          className="flex flex-row items-center mt-5 md:mt-10 bg-slate-600 w-fit pl-1 pr-2.5 py-1.5 text-sm rounded-2xl shadow-2xl font-semibold hover:bg-slate-700 transition-all duration-300 cursor-pointer"
          onClick={()=>navigate(-1)}
          whileHover="hover"
          whileTap="tap"
          variants={{
            hover: { scale: 1.05 },
            tap: { scale: 0.95 },
          }}
        >
          
          <motion.div 
            variants={{
              hover: { x: -2 }, // Only triggers when parent is hovered
              tap: { x: 0 },
            }}
            transition={{ duration: 0.3 }}
          ><ChevronLeft size={22} />
            </motion.div>Back
        </motion.div>
        <div className="absolute inset-0 -z-10">
          <img src={getImageURL(mediaInfo?.backdrop_path)} className="mask-gradient-bg blur-xl brightness-[0.7] w-full min-h-[80vh] md:min-h-0"  />
        </div>
        <TVShowSummary
          className=""
          tvShowType={tvShowType} 
          mediaId={mediaInfo?.id || ""}
          title={mediaInfo?.name || ""}
          subTitle={seasonInfo?.name || null}
          overview={seasonInfo?.overview || mediaInfo?.overview || ""}
          backdrop_path={ getImageURL(mediaInfo?.backdrop_path) || null}
          poster_path={ getImageURL(seasonInfo?.poster_path) ||  getImageURL(mediaInfo?.poster_path) || null}
          original_language={mediaInfo?.original_language || ""}
          vote_average={vote_average}
          vote_count={vote_count}
          status={mediaInfo?.status || ""}
          tagline={tvShowType === "tvshow" ? mediaInfo?.tagline : ""}
          genres={mediaInfo?.genres || []}
          first_air_date={mediaInfo?.first_air_date || ""}
          last_air_date={mediaInfo?.last_air_date || ""}
          number_of_seasons={mediaInfo?.number_of_seasons || ""}
          number_of_episodes={mediaInfo?.number_of_episodes || ""}

          season_air_date = {seasonInfo?.air_date || ""}
          season_no_of_EP = {seasonInfo?.episodes?.length || null}
        />
      </div>
      {
        seasonInfo?.episodes?.length>0 && 
        <>
          <h3 className="text-2xl font-semibold md:px-10 mt-6">Episodes <span className="text-lg text-slate-300">{seasonInfo?.episodes?.length}</span></h3>
          <TVEpisodeSection list={seasonInfo?.episodes} mediaId={mediaInfo?.id} className={"mt-5 md:pl-10"} />
        </>
      }
      {
        seasons.length>0 &&
        <>
          <h3 className="text-2xl font-semibold md:px-10 mt-6">Seasons</h3>
          <TVSeasonSection list={seasons} mediaId={mediaInfo?.id} currPageSeasonNo={seasonInfo?.season_number || null} className={"mt-5 md:pl-10"} />
        </>
      }
     
      {
        castInfo?.length>0 && 
        <>
          <h3 className="text-2xl font-semibold md:px-10 mt-6">Cast of <span className="text-slate-300">{mediaInfo?.name}</span></h3>
          <CastList list={castInfo} className={"mt-5 md:pl-10"} />
        </>
      }

      {
        videosList?.length>0 && 
        <>
          <h3 className="text-2xl font-semibold md:px-10 mt-6">Watch <span className="text-slate-300">{mediaInfo?.name}</span> Videos</h3>
          <VideosList list={videosList} className={"mt-5 md:pl-10"} />
        </>
      }
      <Reviews id={params.id} />
      
      {
        recommedationList?.length>0 && 
        <>
          <h3 className="text-2xl font-semibold md:px-10 mt-6">Recommendations</h3>
          {<RecommendationList catagoryType="tvshows" list={recommedationList} className={"mt-5 md:px-10"} />}
        </>
      }
      
    </div>
  );
};

export default TVShowPage;
