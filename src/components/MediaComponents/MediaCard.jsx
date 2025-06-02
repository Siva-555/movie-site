import React from "react";
import { cn } from "@/lib/utils";

import { Info } from 'lucide-react';
import { FaStar } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import BrokenImageIcon from "@/components/common/BrokenImageIcon";
import BlurredImage from "@/components/common/BlurredImage";


const MediaCard = ({ className, data, onClickNavigate=()=>{} }) => {

  return (
    <div className={cn("flex flex-col relative cursor-pointer bg-slate-700 rounded-xl transition-transform duration-300 hover:scale-105", className)} onClick={onClickNavigate} >
      <div className="size-full group rounded-xl relative overflow-hidden ">
        {/* image */}
        {
          data.poster_path ? 
          <BlurredImage src={data.poster_path} loading="eager" className="size-full md:min-h-52 object-contain rounded-lg group-hover:scale-125 transition-all duration-300" alt="poster" /> 
          : 
          <div className="size-full flex items-center justify-center min-h-40 md:min-h-48 bg-slate-900/20">
            {/* <span className="text-center">Poster Not Available</span> */}
            <BrokenImageIcon />
          </div>
        }
      </div>
      <div className="media-gradient rounded-xl absolute inset-0 flex flex-col justify-end p-4 text-sm">
        <h3 
          className="font-semibold line-clamp-3 test-sm md:text-base mb-1 " 
          title={`Title: ${data.title}`}
        >{data.title || "N/A"}</h3>
        <div className="flex flex-row justify-start items-center w-full">

          <div className="flex items-center justify-start">
            <span><FaStar color="#ebcd0e" size={14} /></span>  
            <span>{data?.vote_average?.toFixed(1) || "N/A"}</span>
          </div>

          <GoDotFill className="ml-1" color="#545353" />

          <span className="ml-1" title={`Release date: ${data.release_date}`}>
            {data.release_date? data.release_date.split("-")[0] : ""}
          </span>

        </div>
      </div>
      
    </div>
  );
};

export default MediaCard;
