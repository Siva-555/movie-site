import React, { useCallback, useEffect, useState } from "react";
import { cn, getImageURL } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import EpisodeCard from "@/components/MediaComponents/EpisodeCard";

const TVEpisodeSection = ({ className, mediaId, list }) => {
  
   return (
      <div className={cn("flex flex-row flex-nowrap relative ", className)}>
        <Carousel opts={{ align: "start", }} className="w-full cus-carousel rounded-xl overflow-hidden">
          <CarouselContent className="w-[95%] ml-0">
            {list?.map((ele, index) => (
              <CarouselItem  key={`episode-${ele.id}-${index}-${mediaId}`} className="basis-full  md:basis-1/4 ">
                <EpisodeCard className="" item={ele} />
              </CarouselItem>
            ))}
          </CarouselContent>
  
          <CarouselPrevious className="left-0 cus-carousel-play-btn bg-neutral-200 dark:bg-neutral-800 size-10 cursor-pointer z-[4]" />
          <CarouselNext className="right-0 cus-carousel-play-btn bg-neutral-200 dark:bg-neutral-800 size-10 cursor-pointer z-[4]" />
  
        </Carousel>
  
      </div>
    )
};

export default TVEpisodeSection;
