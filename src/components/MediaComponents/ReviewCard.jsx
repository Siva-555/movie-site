import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn, getRandomColor } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { IMG_BASE_URL } from "@/lib/constants";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
const MotionCard = motion.create(Card); // turns Card into a motion component

export default function ReviewCard({ className, review, onSelect }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showMoreButton, setShowMoreButton] = useState(false);
    const textRef = useRef(null);

    useEffect(() => {
      if (textRef.current) {
        const lineHeight = parseFloat( getComputedStyle(textRef.current).lineHeight );
        const maxHeight = lineHeight * 3; // Height for 3 lines
        setShowMoreButton(textRef.current.scrollHeight > maxHeight);
      }
    }, [review?.content]);


    const authorDetails = review.author_details || {}
    const rating = authorDetails.rating
    const avatarPath = authorDetails.avatar_path ? `${IMG_BASE_URL}/w45/${authorDetails.avatar_path}` : ""
  
    // Get initials for avatar fallback
    const initials = review.author ? review.author.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2) : "??"
  
    // Format date
    const reviewDate = review.created_at ? new Date(review.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric",}) : "Unknown date"
  

    return (
      <MotionCard layoutId={`card-container-${review.id}`} className={cn("dark:bg-slate-900 dark:border-slate-900 shadow-2xl min-h-[200px] cursor-pointer ", className)} onClick={onSelect}>
        <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2">
          <motion.div layoutId={`card-avatar-${review.id}`}>
            <Avatar className="h-10 w-10 border">
              <AvatarImage src={avatarPath || ""} alt={review.author || "Reviewer"} />
              <AvatarFallback className={cn("font-semibold ", review.avatarColor)}>{initials}</AvatarFallback>
            </Avatar>
          </motion.div>
          <motion.div layoutId={`card-rating-${review.id}`} className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="font-medium leading-none">{review.author}</p>
              {rating && (
                <div className="flex items-center">
                  <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{rating.toFixed(1)}</span>
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{reviewDate}</p>
          </motion.div>
        </CardHeader>
        <CardContent>
          <motion.div  className="prose prose-sm max-w-none dark:prose-invert">
              <motion.p layoutId={`card-text-${review.id}`} ref={textRef} className="line-clamp-3 whitespace-pre-wrap">{review.content}</motion.p>
          </motion.div>
        </CardContent>
      </MotionCard>
    )
}