import React, { useCallback, useEffect, useState } from "react";
import { cn , formatRuntime} from "@/lib/utils";
import { FaStar } from "react-icons/fa6";
import { FaBookmark, FaRegBookmark  } from "react-icons/fa";
import { Bookmark, Calendar, Check, Clock, Star } from "lucide-react";
import MoreText from "./MoreText";
import BlurredImage from "@/components/common/BlurredImage";

import { getDataByRecordId, upsertRecord } from "@/services/indexdDB";
import { Badge } from "@/components/ui/badge"


const MovieSummary = ({ className, movieId, title, overview, backdrop_path, poster_path, original_language, budget, revenue, vote_average, genres, runtime, release_date,vote_count, status, tagline}) => {

  const [isBookMarked, setIsBookMarked] = useState(false);
  const [isAlreadyWatched, setIsAlreadyWatched] = useState(false);
  const [expanded, setExpanded] = useState(false);


  useEffect(()=>{
    getDataByRecordId(movieId).then((res)=>{
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

  },[movieId])


  const onClickBookMark = ()=>{
    if(!isBookMarked){
      let payload = { recordId: movieId, title: title, type: "movie", bookMarked: 1, modifiedDate: Date.now(),}

      upsertRecord(payload).then((res)=>{
        if(res.bool) setIsBookMarked(true);
      }).catch((err)=>{
        console.log(err)
      })
    }
    else{
      let payload = { recordId: movieId, bookMarked: 0}

      upsertRecord(payload).then((res)=>{
        if(res.bool) setIsBookMarked(false);
      }).catch((err)=>{
        console.log(err)
      })
    }
  }

  const onClickAlreadyWatched = ()=>{
    if(!isAlreadyWatched){
      let payload = { recordId: movieId, title: title, type: "movie", alreadyWatched: 1, modifiedDate: Date.now()}

      upsertRecord(payload).then((res)=>{
        if(res.bool) setIsAlreadyWatched(true);
      }).catch((err)=>{
        console.log(err)
      })
    }
    else{
      let payload = { recordId: movieId, alreadyWatched: 0}

      upsertRecord(payload).then((res)=>{
        if(res.bool) setIsAlreadyWatched(false);
      }).catch((err)=>{
        console.log(err)
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 md:grid-cols-[300px_1fr] lg:grid-cols-[400px_1fr] lg:gap-12">
        <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-lg">
          <BlurredImage src={poster_path} alt={title} loading="eager" className="size-full rounded-2xl object-cover" />
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              {title}{" "}
              {release_date && (
                <span className="font-normal text-2xl dark:text-slate-200">
                  ({new Date(release_date).getFullYear()})
                </span>
              )}
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              {genres?.map((genre,ind) => (
                <Badge key={`genre-${genre.id}-${ind}`} variant="secondary" className="dark:bg-slate-500">
                  {genre.name}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 font-medium ">{vote_average ? vote_average.toFixed(1) : "N/A"}</span>
              </div>
              {vote_count && <span className="text-sm dark:text-slate-200">({vote_count?.toLocaleString()} votes)</span>}
            </div>
          </div>

          {tagline && <p className="italic dark:text-slate-200">{tagline}</p>}

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Overview</h2>
            <p 
              className={cn("leading-relaxed transition-all duration-300 ease-in-out cursor-pointer ", expanded ? "line-clamp-none " : "line-clamp-3")}
              onClick={() => setExpanded(!expanded)}
            >
              {overview || "No overview available."}
            </p>
          </div>

          <div className="flex flex-row gap-5 mt-6">
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
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <h3 className="text-sm font-medium dark:text-slate-200">Release Date</h3>
              <p>{release_date ? new Date(release_date).toLocaleDateString() : "Unknown"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium dark:text-slate-200">Runtime</h3>
              <p>{runtime ? `${runtime} minutes` : "Unknown"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium dark:text-slate-200">Status</h3>
              <p>{ status || "Unknown"}</p>
            </div>
            {budget > 0 && (
              <div>
                <h3 className="text-sm font-medium dark:text-slate-200">Budget</h3>
                <p>${budget.toLocaleString()}</p>
              </div>
            )}
            {revenue > 0 && (
              <div>
                <h3 className="text-sm font-medium dark:text-slate-200">Revenue</h3>
                <p>${revenue.toLocaleString()}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
};

export default MovieSummary;
