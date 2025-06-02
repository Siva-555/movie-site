import React, { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel";
import TrailerModal from "@/components/Modals/TrailerModal";
import BlurredImage from "@/components/common/BlurredImage";
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from "lucide-react";


const VideosList = ({className, list}) => {
  const [selectedTrailer, setSelectedTrailer] = useState(null);

    return (
      <div className={cn("flex flex-row flex-nowrap relative ", className)}>
        <Carousel opts={{ align: "start", }} className="w-full cus-carousel rounded-xl overflow-hidden" >
          <CarouselContent className="w-[95%] ml-0">
            {list?.map((ele, index) => (
              <CarouselItem key={`video-${ele?.id}-${index}`} className="basis-full  md:basis-1/3 pl-2" >
                  <motion.button 
                    className="text-left cursor-pointer " 
                    onClick={() => {
                      setSelectedTrailer(ele);
                    }}
                  >
                    <div className="relative aspect-video overflow-hidden rounded-lg ">
                      <BlurredImage 
                        src={ele.thumbnail} 
                        loading="eager" 
                        className="size-full object-cover " 
                        alt="poster" 
                      /> 
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center text-white hover:text-rose-400"
                        initial={{ backgroundColor: "rgba(0, 0, 0, 0.4)"  }}
                        whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.5)", }}
                      >
                        <motion.div
                          initial={{ scale: 1 }}
                          whileHover={{ 
                            scale: 1.1,
                            transition: {
                              duration: 0.3,
                              repeat: Infinity,
                              repeatType: "reverse"
                            }
                          }}
                        >
                          <Play size={48} className="" />
                        </motion.div>
                        </motion.div>
                    </div>
                    {ele.name && <span className="block">{ele.name}</span>}
                    {ele?.type && <span className="block text-xs text-slate-300">{ele?.type}</span>}
                  </motion.button>
              </CarouselItem>
            ))}
          </CarouselContent>
  
          <CarouselPrevious className="left-0 cus-carousel-play-btn bg-neutral-200 dark:bg-neutral-800 size-10 cursor-pointer z-[4]" />
          <CarouselNext className="right-0 cus-carousel-play-btn bg-neutral-200 dark:bg-neutral-800 size-10 cursor-pointer z-[4]" />
  
        </Carousel>
  
        <TrailerModal
          isOpen={selectedTrailer ? true : false}
          onClose={() => { setSelectedTrailer(null);}}
          video_link={selectedTrailer?.video_link}
          thumbnailUrl={selectedTrailer?.thumbnail}
        />
      </div>
    )
  }

export default VideosList