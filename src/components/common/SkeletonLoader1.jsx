import React from "react";
import { cn } from "@/lib/utils";

const SkeletonLoader1 = ({ className }) => {
  return (
    <div className={cn("animate-pulse ", className)}>
      <div className="flex flex-col relative p-2 bg-slate-700/80 rounded-xl animate-pulse">
        {/* Image Placeholder */}
        <div className="size-full rounded-xl bg-slate-300/20 h-48"></div>

        {/* Text Placeholder */}
        <div className="flex flex-col ml-1 mt-2 space-y-2">
          <div className="h-4 w-3/4 bg-slate-300/20 rounded"></div>
          {/* <div className="h-4 w-1/2 bg-slate-300/20 rounded"></div> */}

          {/* Rating and Release Year Placeholder */}
          <div className="flex items-center space-x-2">
            <div className="h-4 w-6 bg-slate-300/20 rounded"></div>
            <div className="h-4 w-10 bg-slate-300/20 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader1;
