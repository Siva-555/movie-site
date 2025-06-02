import React, { useCallback, useEffect, useState } from "react";
import { cn , formatRuntime, } from "@/lib/utils";
import { FaStar } from "react-icons/fa6";
import { FaBookmark, FaRegBookmark  } from "react-icons/fa";
import { Bookmark, Calendar, Check, Clock, MonitorPlay, Star } from "lucide-react";
import MoreText from "./MoreText";
import BlurredImage from "@/components/common/BlurredImage";

import { getDataByRecordId, upsertRecord } from "@/services/indexdDB";
import { Badge } from "@/components/ui/badge"


const TVShowSummary = ({ className, mediaId, title, overview, backdrop_path, poster_path, vote_average, genres,vote_count, status, tagline, tvShowType, ...props}) => {

  const [isBookMarked, setIsBookMarked] = useState(false);
  const [isAlreadyWatched, setIsAlreadyWatched] = useState(false);
  const [expanded, setExpanded] = useState(false);


  useEffect(()=>{
    getDataByRecordId(mediaId).then((res)=>{
      // console.log(res)
      if(res.bool && res.data){
        let record = res.data
        setIsBookMarked(record.bookMarked ? true : false)
        setIsAlreadyWatched(record.alreadyWatched ? true : false)
      }
    })
    .catch((error)=>{
      console.log("error - ", error)
    })

  },[mediaId])


  const onClickBookMark = ()=>{
    if(!isBookMarked){
      let payload = { recordId: mediaId, title: title, type: "tvshow", bookMarked: 1, modifiedDate: Date.now(),}

      upsertRecord(payload).then((res)=>{
        if(res.bool) setIsBookMarked(true);
      }).catch((err)=>{
        console.log(err)
      })
    }
    else{
      let payload = { recordId: mediaId, bookMarked: 0}

      upsertRecord(payload).then((res)=>{
        if(res.bool) setIsBookMarked(false);
      }).catch((err)=>{
        console.log(err)
      })
    }
  }

  const onClickAlreadyWatched = ()=>{
    if(!isAlreadyWatched){
      let payload = { recordId: mediaId, title: title, type: "tvshow", alreadyWatched: 1, modifiedDate: Date.now()}

      upsertRecord(payload).then((res)=>{
        if(res.bool) setIsAlreadyWatched(true);
      }).catch((err)=>{
        console.log(err)
      })
    }
    else{
      let payload = { recordId: mediaId, alreadyWatched: 0}

      upsertRecord(payload).then((res)=>{
        if(res.bool) setIsAlreadyWatched(false);
      }).catch((err)=>{
        console.log(err)
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center md:grid md:gap-6 md:grid-cols-[300px_1fr] lg:grid-cols-[400px_1fr] lg:items-start lg:gap-12 ">
        <div className="relative w-[220px] md:w-full aspect-[2/3] overflow-hidden rounded-lg shadow-2xl self-center">
          <BlurredImage src={poster_path} alt={title} loading="eager" className="size-full rounded-2xl object-cover transition-all duration-300" />
        </div>
        <div className="space-y-6 mt-5 md:mt-0">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl flex items-baseline flex-wrap gap-2">
              {title}{" "}
              {(props.first_air_date || props.last_air_date ) && (tvShowType === "tvshow") && (
                <span className="font-normal dark:text-slate-200 text-2xl ">
                  ({ props.first_air_date  ? new Date(props.first_air_date).getFullYear() : "" } - { props.last_air_date  ? new Date(props.last_air_date).getFullYear() : "" })
                </span>
              )}
              {
                props.subTitle && 
                <span className="font-normal dark:text-slate-200 text-lg">
                  {props.subTitle} <span className="text-sm italic">( {props.season_air_date ? new Date(props.season_air_date).getFullYear() : "" } )</span>
                </span>
              }
            </h1>
            {/* geners */}
            <div className="flex flex-wrap items-center gap-2">
              {genres?.map((genre,ind) => (
                <Badge key={`genre-${genre.id}-${ind}`} variant="secondary" className="dark:bg-slate-600">
                  {genre.name}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center gap-2 mt-2.5">
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 font-medium">{vote_average ? vote_average.toFixed(1) : "N/A"}</span>
              </div>
              {vote_count && <span className="text-sm dark:text-slate-200">({vote_count?.toLocaleString()} votes)</span>}
            </div>
            {
              (props.number_of_seasons || props.number_of_episodes) && (tvShowType === "tvshow") &&
              <div className="flex items-center space-x-2 mt-2.5">
                <MonitorPlay size={18}/>
                <span>{props.number_of_seasons} Seasons</span>
                <span>•</span>
                <span>{props.number_of_episodes} Episodes</span>
              </div>
            }
            {
              props.season_no_of_EP &&
              <div className="flex items-center space-x-2 mt-2.5">
                <MonitorPlay size={18}/>
                <span>{props.season_no_of_EP} Episodes</span>
              </div>
            }
          </div>

          {tagline &&  <p className="italic ">{tagline}</p>}

          <div className="space-y-2">
            <h2 className="text-xl font-semibold dark:text-slate-200">Overview</h2>
            <p 
              className={cn("leading-relaxed transition-all duration-300 ease-in-out cursor-pointer ", expanded ? "line-clamp-none " : "line-clamp-3")}
              onClick={() => setExpanded(!expanded)}
            >
              {overview || "No overview available."}
            </p>
          </div>
          {/* buttons */}
          {tvShowType === "tvshow" && <div className="flex flex-row gap-5 mt-6">
            <div className="flex flex-col items-center min-w-[130px]">
                <span className={cn("px-2.5 py-2 rounded-sm cursor-pointer", isBookMarked ? "bg-green-700 hover:bg-green-700/50 text-neutral-100": "bg-neutral-400/20  hover:bg-neutral-400/40") } onClick={onClickBookMark}> 
                    {isBookMarked ? <FaBookmark size={18} strokeWidth={3}  />:  <FaRegBookmark  size={18} strokeWidth={3} /> }
                </span>
                <span className="text-sm mt-1">{isBookMarked ? "Added To Watchlist" :"Add To Watchlist"}</span>
            </div>
            <div className="flex flex-col items-center min-w-[130px]">
                <span className={cn("px-2.5 py-2 rounded-sm cursor-pointer", isAlreadyWatched ? "bg-green-700 hover:bg-green-700/50 text-neutral-100": "bg-neutral-400/20  hover:bg-neutral-400/40") } onClick={onClickAlreadyWatched}> 
                    <Check size={18} strokeWidth={3} />
                </span>
                <span className="text-sm mt-1">{isAlreadyWatched ? "Watched" :"Already Watched"}</span>
            </div>
          </div>}
          {/* Extra info */}
          {tvShowType === "tvshow" &&
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <h3 className="text-sm font-medium dark:text-slate-200">First episode date</h3>
              <p>{props.first_air_date ? new Date(props.first_air_date).toLocaleDateString() : "-"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium dark:text-slate-200">Final episode date</h3>
              <p>{props.last_air_date ? new Date(props.last_air_date).toLocaleDateString() : "-"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium dark:text-slate-200">Status</h3>
              <p>{ status || "Unknown"}</p>
            </div>
          </div>
          }
        </div>
      </div>
    </div>
  )
};

export default TVShowSummary;
