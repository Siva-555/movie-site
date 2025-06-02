import React from "react";
import MediaCard from "@/components/MediaComponents/MediaCard";
import { IMG_BASE_URL } from "@/lib/constants";
import { cn, getImageURL } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "@/components/common/ScrollToTop";

import { motion, AnimatePresence } from 'framer-motion';


// Variants for each child item
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const RecommendationList = ({ className, list, catagoryType="movies"}) => {
  const navigate = useNavigate();

  const onClickNavigate = (ele)=>{
    if(ele.id && catagoryType === "movies") navigate(`/movies/${ele.id}`)
    else if(ele.id && catagoryType === "tvshows") navigate(`/tvshows/${ele.id}`)
  }

  
  return (
    <div className={cn("", className)}>
      <ScrollToTop />
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4"
        initial="hidden"
        whileInView="visible"
        // viewport={{margin: "-150px 0px" }}
        variants={{
          hidden: {},
          visible: {
            // delay:1,
            transition: {
              staggerChildren: 0.1, 
            },
          },
        }}  
      >
        {/* {loading &&
          Array.from({ length: 20 }, (_, i) => (
            <SkeletonLoader1 key={`sk1-${i}`} className="size-full" />
          ))
        } */}

        {
          list?.map((ele, index) => (
            <motion.div 
              key={`recommend-${ele?.id}-${index}`} 
              className="w-full" 
              variants={itemVariants}
            >
              <MediaCard
                className="size-full shadow-2xl"
                onClickNavigate={()=>onClickNavigate(ele)}
                data={{
                  backdrop_path: getImageURL(ele?.backdrop_path) || null,
                  poster_path: getImageURL(ele?.poster_path) || null,
                  // poster_path: index%2 ?`${IMG_BASE_URL}/original/${ele.poster_path}`:"",
                  id: ele.id,
                  title: catagoryType == "movies" ? ele.title : (catagoryType== "tvshows" ? ele.name :""),
                  overview: ele.overview,
                  media_type: ele.media_type,
                  original_language: ele.original_language,
                  vote_average: ele.vote_average,
                  genre_ids: ele.genre_ids,
                  popularity: ele.popularity,
                  release_date: catagoryType == "movies" ? ele.release_date : (catagoryType== "tvshows" ? ele.first_air_date :"") ,
                }}
              />
            </motion.div>
          ))}
      </motion.div>
    </div>
  );
};

export default RecommendationList;
