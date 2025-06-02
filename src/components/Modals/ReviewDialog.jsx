import React, { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { cn, getRandomColor } from "@/lib/utils";
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger, DialogClose, DialogHeader, DialogTitle, DialogDescription, DialogOverlay } from '@/components/ui/dialog';

import { IMG_BASE_URL } from "@/lib/constants";
import { Star, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ReviewCard from "@/components/MediaComponents/ReviewCard";

import { motion, AnimatePresence } from 'framer-motion';
import CustomModal from "@/components/Modals/CustomModal";


const ReviewDialog = ({selectedReview, setSelectedReview}) => {

  const authorDetails = selectedReview?.author_details || {}
  const rating = authorDetails?.rating
  const avatarPath = authorDetails?.avatar_path ? `${IMG_BASE_URL}/w45/${authorDetails.avatar_path}` : ""

  // Get initials for avatar fallback
  const initials = selectedReview?.author ? selectedReview?.author.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2) : "??"

  // Format date
  const reviewDate = selectedReview?.created_at ? new Date(selectedReview?.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric",}) : "Unknown date"


  const onClose=()=>setSelectedReview(null)
  return (
    <AnimatePresence>
      {selectedReview && (
        <CustomModal open={!!selectedReview} onClose={onClose} layoutId={`card-container-${selectedReview.id}`} >
            <div className="flex flex-row items-start gap-4 space-y-0  pb-2">
              <motion.div layoutId={`card-avatar-${selectedReview.id}`}>
                <Avatar className="h-10 w-10 border">
                  <AvatarImage src={avatarPath || ""} alt={selectedReview.author || "Reviewer"} />
                  <AvatarFallback className={cn("font-semibold", selectedReview.avatarColor)}>{initials}</AvatarFallback>
                </Avatar>
              </motion.div>
              <motion.div layoutId={`card-rating-${selectedReview.id}`} className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium leading-none">{selectedReview.author}</p>
                  <div className="flex flex-row space-x-3">
                    {rating && (
                      <div className="flex items-center">
                        <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{rating.toFixed(1)}</span>
                      </div>
                    )}
                    <button type="button" title="Close" onClick={onClose} className="text-slate-400 hover:text-slate-500 cursor-pointer transition-all duration-75 "><X /></button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{reviewDate}</p>
              </motion.div>
            </div>
          <motion.div  className="prose prose-sm min-h-[100px] dark:prose-invert max-h-52 px-2 max-w-[95%] overflow-x-hidden overflow-y-auto cust-scroll">
            <motion.p initial={{scale:0}} animate={{ scale: 1}} exit={{scale:0}} transition={{ delay: 0.2,  duration: 0.3, ease: "easeInOut", }} layoutId={`card-text-${selectedReview.id}`} className="whitespace-pre-wrap ">
              {selectedReview.content}
            </motion.p>
          </motion.div>
        </CustomModal>
      )}
    </AnimatePresence>

  )
}

export default ReviewDialog