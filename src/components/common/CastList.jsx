import React, { useCallback, useEffect, useState } from "react";
import { cn, getIntialChars, getRandomColor } from "@/lib/utils";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel";

import { IMG_BASE_URL } from "@/lib/constants";
import BlurredImage from "@/components/common/BlurredImage";

const CastList = ({className, list}) => {
  return (
    <div className={cn("flex flex-row flex-nowrap relative ", className)}>
      <Carousel
        opts={{ align: "start", }}
        className="w-full cus-carousel rounded-xl overflow-hidden"
      >
        {/* <div className="absolute rounded-xl left-0 top-0 bottom-0 w-[5%] z-[1] bg-gradient-to-r from-black/60 from-0% to-transparent to-100% " /> */}
        {/* <div className="absolute right-0 top-0 bottom-0 w-[10%] z-[1] bg-gradient-to-l from-black/40 from-0% to-transparent to-100% " /> */}
        <CarouselContent className="w-[95%] ml-0">
          {list?.map((ele, index) => (
            <CarouselItem 
              key={`cast-${index}`}
              className="basis-1/2 sm:basis-1/4 md:basis-1/6  lg:basis-1/7 pl-2"
            >
              <div className="flex flex-col items-center text-center size-full">
                <div className="size-full">
                  { ele.profile_img_url? 
                    <BlurredImage src={ele.profile_img_url} className="rounded-full aspect-square object-cover  hover:border-2 hover:border-slate-400 transition-transform duration-300"  alt="cast profile img" />
                    :
                    <div className={cn("rounded-full flex justify-center items-center text-6xl aspect-square object-cover bg-slate-600 hover:border-2 hover:border-slate-400 transition-transform duration-300", )} >{ getIntialChars(ele.name) }</div>
                  }
                </div>
                <div>
                  <p className="font-medium text-sm">{ele.name}</p>
                  <p className="text-xs text-slate-300">{ele?.character}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-0 cus-carousel-play-btn bg-neutral-200 dark:bg-neutral-800 size-10 cursor-pointer z-[4]" />
        <CarouselNext className="right-0 cus-carousel-play-btn bg-neutral-200 dark:bg-neutral-800 size-10 cursor-pointer z-[4]" />

      </Carousel>

    </div>
  )
}

export default CastList