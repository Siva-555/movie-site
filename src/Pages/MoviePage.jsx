import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import redirectURL from "@/redirectURL";

import MovieSummary from "@/components/MovieSummary";
import CastList from "@/components/common/CastList";

import { IMG_BASE_URL, CAST_LIMIT, YOUTUBE_EMBED_URL, VIDEOS_LIMIT, VIDEO_THUMBNAIL_URL } from "@/lib/constants";
import VideosList from "@/components/VideosList";
import RecommendationList from "@/components/MediaComponents/RecommendationList";
import Reviews from "@/components/Reviews";

import { useLocation } from "react-router-dom";
import SkeletonLoaderPage from "@/components/common/SkeletonLoaderPage";
import { ChevronLeft } from "lucide-react";
import { getImageURL } from "@/lib/utils";
import { motion, AnimatePresence } from 'framer-motion';
const MoviePage = () => {
  const [movieInfo, setMovieInfo] = useState();
  const [castInfo, setCastInfo] = useState([]);
  const [videosList, setVideosList] = useState([]);
  const [recommedationList, setRecommedationList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageType, setTypeType] = useState("")

  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const getMediaInfo = useCallback( async (id, catagoryType) => {
      let query_params = { language: "en-US" };
      let type = catagoryType == "movies" ? "movie" : (catagoryType== "tvshows" && "tv" );
      try {
        setLoading(true);
        let res = await redirectURL.get(`/${type}/${id}`, {  params: query_params, });
        if (res.status === 200) {
          let data = res.data;
          setMovieInfo(data);
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
      let type = catagoryType == "movies" ? "movie" : (catagoryType== "tvshows" && "tv" );
      try {
        setLoading(true);
        let res = await redirectURL.get(`/${type}/${id}/credits`, { params: query_params, });
        if (res.status === 200) {
          let data = res.data;

          let temp_cast = [];
          let c = 0;
          data?.cast?.forEach((ele, index)=>{

            if(ele?.profile_path && c <= CAST_LIMIT){
              c +=1;
              temp_cast.push({
                profile_path: ele?.profile_path || null,
                profile_img_url: ele?.profile_path ? `${IMG_BASE_URL}/w185/${ele?.profile_path}` : null,
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
      let type = catagoryType== "movies" ? "movie" : (catagoryType== "tvshows" && "tv" );
      try {
        setLoading(true);
        let res = await redirectURL.get(`/${type}/${id}/videos`, { params: query_params, });
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
      let type = catagoryType== "movies" ? "movie" : (catagoryType== "tvshows" && "tv" );
      try {
        setLoading(true);
        let res = await redirectURL.get(`/${type}/${id}/recommendations`, { params: query_params});
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

  
  useEffect(() => {
    let temp = location.pathname?.includes("movies") ? "movies" : (location.pathname?.includes("tvshows") && "tvshows")
    // console.log("test --",location, temp)
    
    getMediaInfo(params.id, temp);
    getCastInfo(params.id, temp);
    getVideosList(params.id, temp);
    getRecommendations(params.id, temp);

  }, [params.id, location])
  
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
          <img src={getImageURL(movieInfo?.backdrop_path)} className="mask-gradient-bg blur-xl brightness-[0.6] w-full min-h-[80vh] md:min-h-0"  />
        </div>
        <MovieSummary
          className=""
          movieId={movieInfo?.id || ""}
          title={movieInfo?.title || ""}
          overview={movieInfo?.overview || ""}
          backdrop_path={ movieInfo?.backdrop_path ? `${IMG_BASE_URL}/original/${movieInfo?.backdrop_path}` : null }
          poster_path={  movieInfo?.poster_path ? `${IMG_BASE_URL}/original/${movieInfo?.poster_path}` : null }
          original_language={movieInfo?.original_language || ""}
          budget={movieInfo?.budget || ""}
          revenue={movieInfo?.revenue || ""}
          vote_average={movieInfo?.vote_average || ""}
          vote_count={movieInfo?.vote_count || ""}
          status={movieInfo?.status || ""}
          tagline={movieInfo?.tagline || ""}
          genres={movieInfo?.genres || []}
          runtime={movieInfo?.runtime || ""}
          release_date={movieInfo?.release_date || ""}
        />
      </div>
      {
        castInfo?.length>0 && 
        <>
          <h3 className="text-2xl font-semibold md:px-10 mt-6">Cast of <span className="text-slate-300">{movieInfo?.title}</span></h3>
          <CastList list={castInfo} className={"mt-5 md:pl-10"} />
        </>
      }

      {
        videosList?.length>0 && 
        <>
          <h3 className="text-2xl font-semibold md:px-10 mt-6">Watch <span className="text-slate-300">{movieInfo?.title}</span> Videos</h3>
          <VideosList list={videosList} className={"mt-5 md:pl-10"} />
        </>
      }
      <Reviews id={params.id} />
      
      {
        recommedationList?.length>0 && 
        <>
          <h3 className="text-2xl font-semibold md:px-10 mt-6">Recommendations</h3>
          {<RecommendationList catagoryType="movies" list={recommedationList} className={"mt-5 md:px-10"} />}
        </>
      }
      
    </div>
  );
};

export default MoviePage;
