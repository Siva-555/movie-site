import React, { useCallback, useEffect, useState } from "react";
import { cn, getImageURL } from "@/lib/utils";

import { FaStar } from "react-icons/fa6";
import BrokenImageIcon from "../common/BrokenImageIcon";
import BlurredImage from "@/components/common/BlurredImage";

const EpisodeCard = ({className, item}) => {
  const [expanded, setExpanded] = useState(false);


  const poster_path = getImageURL(item.still_path);
  return (
    <div className={cn(" ", className)}>
      <div className="flex flex-col items-center text-center relative rounded-xl overflow-hidden">
        {
        poster_path ? 
          <BlurredImage src={poster_path} className="aspect-video rounded-xl  object-cover transition-transform  duration-300"  alt="cast profile img" />
          : 
          <div className="size-full flex  aspect-video  items-center justify-center min-h-40 md:min-h-48 bg-slate-900">
            <BrokenImageIcon />
          </div>
        }
        {/* Season episode tag */}
        { (item?.season_number || item?.episode_number ) ? 
        <div className="absolute top-2 right-0 text-sm rounded-bl-lg rounded-tl-lg bg-black/60 px-2 pb-1 backdrop-blur-2xl">
          <span> {item?.season_number ?  `S${item?.season_number}`: ""} {item?.episode_number ? `Ep${item?.episode_number}`: ""} </span>
        </div> : null
        }
        {/* run time */}
        {item.runtime ? 
        <div className="absolute top-10 right-0 text-sm rounded-bl-lg rounded-tl-lg  bg-black/60 pt-[1px] px-[9px] pb-[3px]  backdrop-blur-2xl flex items-center gap-1">
          <span> {`${item.runtime} m`} </span>
        </div>:null}
        {/* backdrop - name and rating */}
        <div className="bg-linear-to-t from-15% from-black/60 to-transparent absolute bottom-0 left-0 right-0 ">
          <div className="flex flex-row justify-between p-4">
            <h3 className="text-base font-semibold text-white">{item?.name || "NA"}</h3>
            {
            item?.vote_average ?  <div className="mt-1 flex items-center space-x-2">
                <div className="flex items-center space-x-1 ">
                  <FaStar color="#ebcd0e" size={14} />
                  <span className='text-sm '>{item?.vote_average?.toFixed(1)}</span>
                </div>
              </div>:null
            }
          </div>
        </div>
      </div>
      {item?.overview  ? 
      <p className={cn("text-base transition-all duration-300 ease-in-out cursor-pointer ", expanded ? "line-clamp-none " : "line-clamp-3 text-slate-300")} onClick={() => setExpanded(!expanded)}>
        {item?.overview || "NA"}
      </p>: null}
    </div>
  )
}

export default EpisodeCard