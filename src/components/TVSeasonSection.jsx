import React, { useCallback, useEffect, useState } from "react";
import { cn, getImageURL } from "@/lib/utils";


import { IMG_BASE_URL } from "@/lib/constants";
import MediaCard2 from "@/components/MediaComponents/MediaCard2";

const TVSeasonSection = ({ className, mediaId, list, currPageSeasonNo }) => {
  return (
    <div className={cn("grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ", className)}>
      {
        list.map((ele, ind)=>{
          // if(currPageSeasonNo && currPageSeasonNo == ele.season_number) return null;
          return (
          <div key={`seasons-${ele.id}-${ind}`} className="">
            <MediaCard2 
              className={"shadow-2xl"} 
              isTV
              diabled={currPageSeasonNo && currPageSeasonNo == ele.season_number}
              link={`/tvshows/${mediaId}/season/${ele.season_number}`}
              item={{
                id: ele.id,
                name: ele.name,
                poster_path: getImageURL(ele?.poster_path) || null,
                season_number: ele.season_number,
                episode_count: ele.episode_count,
                rating: ele.vote_average
              }}
            />
          </div>
          )
        })
      }
    </div>
  );
};

export default TVSeasonSection;
