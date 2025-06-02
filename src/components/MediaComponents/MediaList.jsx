import React from "react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useNavigate } from "react-router-dom";

import MediaCard from "./MediaCard";
import SkeletonLoader1 from "../common/SkeletonLoader1";

import { IMG_BASE_URL } from "@/lib/constants";
import { useMobile } from "@/hooks/useMobile";

const MediaList = ({ className, dataList, listType,catagoryType="movies", loading }) => {

  const navigate = useNavigate();
  const isMobile = useMobile();

  if(loading){
    return (
      <div className="flex flex-row flex-wrap ">
       { 
         Array.from({ length: 6 }, 
          (_, i) => 
          <SkeletonLoader1 key={`sk1-${i}`} className="basis-1/2 sm:basis-1/4 md:basis-1/6 pl-2 md:pl-4 pt-4" /> 
          )
        }
      </div>
    )
  }

  const onClickNavigate = (ele)=>{
    if(ele.id) navigate(`/${catagoryType}/${ele.id}`)
  }

  return (
    <div className={cn("flex flex-row flex-nowrap", className)}>
      <Carousel
        opts={{ align: "start", }}
        className="w-full cus-carousel rounded-xl overflow-hidden"
      >
        {/* {!isMobile && <>
          <div className="absolute rounded-xl left-0 top-0 bottom-0 w-[5%] z-[1] bg-gradient-to-r from-black/60 from-0% to-transparent to-100% " />
          <div className="absolute rounded-xl right-0 top-0 bottom-0 w-[5%] z-[1] bg-gradient-to-l from-black/60 from-0% to-transparent to-100% " />
        </>} */}
        <CarouselContent className="w-[95%]">
          {dataList?.map((ele, index) => (
            <CarouselItem key={index} className="basis-1/2 sm:basis-1/4  md:basis-1/5 lg:basis-1/6">
              <MediaCard
                className="size-full"
                onClickNavigate={()=>onClickNavigate(ele)}
                data={{
                  backdrop_path: ele.backdrop_path ? `${IMG_BASE_URL}/original/${ele.backdrop_path}` : null,
                  poster_path: ele.poster_path ? `${IMG_BASE_URL}/original/${ele.poster_path}` : null,
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
            </CarouselItem>
          ))}
        </CarouselContent>

         <CarouselPrevious className="left-0 cus-carousel-play-btn bg-neutral-200 dark:bg-neutral-800 size-10 cursor-pointer z-[4]" />
          <CarouselNext className="right-0 cus-carousel-play-btn bg-neutral-200 dark:bg-neutral-800 size-10 cursor-pointer z-[4]" />

      </Carousel>
    </div>
  );
};

export default MediaList;
