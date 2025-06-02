import { IMG_BASE_URL } from '@/lib/constants'
import React from 'react'
import { FaStar } from 'react-icons/fa6'
import BlurredImage from '../common/BlurredImage'
import BrokenImageIcon from '../common/BrokenImageIcon'
import { cn } from '@/lib/utils'

import { motion, AnimatePresence } from 'motion/react';

const SearchMediaCard = ({item, className, category, ...props}) => {

  let typeTitle =  "Movie";
  let title = "";
  let release_date = ""
  
  if(category === "movie") {
    typeTitle = "Movie"
    title = item.title;
    release_date = item.release_date;
  }
  else if(category === "tv") {
    typeTitle = "TV Show";
    title = item.name;
    release_date = item.first_air_date;
  }


  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0,  filter:"blur(10px)" },
        visible: { opacity: 1,  filter:"blur(0px)", transition: { duration:0.3 } }
      }}
    // href={`/${category}/${item.id}`}
      className={cn("flex flex-row p-2 mr-2 rounded-md cursor-pointer transition-all duration-150  hover:bg-neutral-950 hover:bg-gradient-to-r hover:from-neutral-950 hover:to-transparent", className)}
      {...props}
    >
      <div className='h-20 min-w-[55px] rounded-sm overflow-hidden '>
        {
          item.poster_path ? <BlurredImage className='size-full' src={`${IMG_BASE_URL}/original/${item.poster_path}`} />
          :
          <div className="size-full  bg-slate-900/50">
            <BrokenImageIcon width='55' height='80'  />
          </div>
        } 
      </div>
      <div className='px-2  flex flex-col justify-center gap-1.5'>
        <h3 className='text-[14px] line-clamp-2 text-wrap'>{title}</h3>
        <div className="flex flex-row justify-start items-baseline w-full text-[12px] space-x-2 divide-slate-500 divide-x-2">
          <span className="pr-2"> {typeTitle} </span>
          { release_date && <span className="pr-2"> { release_date.split("-")[0]} </span>}
          <div className=" flex items-baseline justify-center gap-0.5">
            <span className="relative top-[1px]"><FaStar color="#ebcd0e" size={14} /></span>
            <span className='leading-none'>{item?.vote_average?.toFixed(1) || "N/A"}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default SearchMediaCard