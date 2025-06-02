import React from 'react'
import { cn } from '@/lib/utils';

const SkeletonLoaderPage = ({ className }) => {

  return (
    <div className={cn("animate-pulse container mx-auto px-4 py-8 ", className)} >
      <div className="grid gap-6 md:grid-cols-[300px_1fr] lg:grid-cols-[400px_1fr] lg:gap-12 animate-pulse">
        
        {/* Poster Skeleton */}
        <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-lg bg-slate-300 dark:bg-slate-700" />
    
        {/* Details Skeleton */}
        <div className="space-y-6">
          
          {/* Title & Subtitles */}
          <div className="flex flex-col space-y-4">
            
            {/* Title */}
            <div className="h-8 bg-slate-300 dark:bg-slate-700 rounded w-2/3" />
            
            {/* SubTitle */}
            <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-1/4" />
            
            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              <div className="h-5 w-12 bg-slate-300 dark:bg-slate-700 rounded-md" />
              <div className="h-5 w-12 bg-slate-300 dark:bg-slate-700 rounded-md" />
              <div className="h-5 w-12 bg-slate-300 dark:bg-slate-700 rounded-md" />
            </div>
    
            {/* Rating */}
            <div className="flex items-center gap-2 mt-2.5">
              <div className="h-5 w-5 bg-slate-300 dark:bg-slate-700 rounded-full" />
              <div className="h-5 w-10 bg-slate-300 dark:bg-slate-700 rounded" />
            </div>
    
            {/*
            <div className="flex items-center gap-2 mt-2.5">
              <div className="h-5 w-5 bg-slate-300 dark:bg-slate-700 rounded-full" />
              <div className="h-5 w-20 bg-slate-300 dark:bg-slate-700 rounded" />
            </div> */}
          </div>
    
          {/* Tagline */}
          <div className="h-4 w-1/2 bg-slate-300 dark:bg-slate-700 rounded" />
    
          {/* Overview */}
          <div className="space-y-2">
            {/* <div className="h-5 w-40 bg-slate-300 dark:bg-slate-700 rounded" /> */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-slate-300 dark:bg-slate-700 rounded" />
              <div className="h-4 w-4/5 bg-slate-300 dark:bg-slate-700 rounded" />
              <div className="h-4 w-3/4 bg-slate-300 dark:bg-slate-700 rounded" />
            </div>
          </div>
    
          {/* Buttons */}
          <div className="flex flex-row gap-5 mt-6">
            <div className="flex flex-col items-center min-w-[130px] gap-2">
              <div className="h-10 w-10 bg-slate-300 dark:bg-slate-700 rounded" />
              <div className="h-4 w-24 bg-slate-300 dark:bg-slate-700 rounded" />
            </div>
            <div className="flex flex-col items-center min-w-[130px] gap-2">
              <div className="h-10 w-10 bg-slate-300 dark:bg-slate-700 rounded" />
              <div className="h-4 w-24 bg-slate-300 dark:bg-slate-700 rounded" />
            </div>
          </div>
    
          {/* Extra Info */}
          <div className="grid grid-cols-2  gap-x-5  gap-y-6 md:grid-cols-2 lg:grid-cols-3 mt-4">
            <div className="space-y-2">
              <div className="h-4 w-32 bg-slate-300 dark:bg-slate-700 rounded" />
              <div className="h-4 w-24 bg-slate-300 dark:bg-slate-700 rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-32 bg-slate-300 dark:bg-slate-700 rounded" />
              <div className="h-4 w-24 bg-slate-300 dark:bg-slate-700 rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-32 bg-slate-300 dark:bg-slate-700 rounded" />
              <div className="h-4 w-24 bg-slate-300 dark:bg-slate-700 rounded" />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}



export default SkeletonLoaderPage