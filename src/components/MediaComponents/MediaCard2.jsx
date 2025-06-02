import { cn } from '@/lib/utils'
import { Star, Tv } from 'lucide-react'
import React from 'react'
import { FaStar } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import BrokenImageIcon from '@/components/common/BrokenImageIcon'
import BlurredImage from "@/components/common/BlurredImage";

const MediaCard2 = ({ className, link, item, isTV, diabled=false }) => {
  return (
    <Link to={link} className={cn("block ", diabled ? "pointer-events-none":"" )} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <div className={cn("transition-transform duration-300 hover:scale-105 relative aspect-[2/3] overflow-hidden rounded-xl ", className)}>
        { item?.poster_path ? 
          <BlurredImage src={item.poster_path} alt={item.name} className="h-full w-full object-cover" />
          : 
          <div className="size-full flex items-center justify-center min-h-40 md:min-h-48 bg-slate-900/20">
            <BrokenImageIcon />
          </div>
        }
        <div className="media-gradient absolute inset-0 flex flex-col justify-end p-4">
          <h3 className={cn("text-base font-semibold text-white ", diabled ? "text-slate-500" : "")}>{item.name}</h3>
          <div className="mt-1 flex items-center space-x-2">
            <div className="flex items-center space-x-1 ">
              <FaStar color={diabled ? "#847513" : "#ebcd0e"} size={14} />
              <span className={cn('text-sm ', diabled ? "text-slate-500" : "")}>{item.rating.toFixed(1)}</span>
            </div>
            {isTV && (
              <>
                <span className={cn(" ", diabled ? "text-slate-500" : "")}>•</span>
                <div className={cn("flex items-center space-x-1 text-sm text-gray-300 ", diabled ? "text-slate-500" : "")}>
                  <Tv size={14} />
                  <span>{item.episode_count} Ep</span>
                </div>
              </>
            )}
          </div>
         {
         item?.genres?.length>0 && 
          <div className="mt-2 flex flex-wrap gap-2">
            {item?.genres?.slice(0, 2).map((genre) => (
              <span key={genre} className="rounded-full bg-gray-800/80 px-2 py-1 text-xs text-gray-300">
                {genre}
              </span>
            ))
            }
          </div>
          }
        </div>
      </div>
    </Link>
  )
}

export default MediaCard2