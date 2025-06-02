import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn, getRandomColor } from "@/lib/utils";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import redirectURL from "@/redirectURL";


import ReviewCard from "@/components/MediaComponents/ReviewCard";
import ReviewDialog from "@/components/Modals/ReviewDialog";

import { motion, AnimatePresence } from 'framer-motion';

const Reviews = ({ className, id }) => {
  const [pageNo, setPageNo] = useState(1);
  const [pageLimit, setPageLimit] = useState(1);
  const [reviewList, setReviewList] = useState([]);
  const [loading, setLoading]= useState(false);
  const [selectedReview, setSelectedReview] = useState(null);


  const getReviews = useCallback( async (id, pageNo) => {
      let query_params = { language: "en-US", page: pageNo };
      try {
        setLoading(true);
        let res = await redirectURL.get(`/movie/${id}/reviews`, {  params: query_params, });
        if(res.status === 200){
          let data = res.data;

          data?.results?.forEach((ele)=>{
            ele.avatarColor = getRandomColor() || "";
          })
          setReviewList(data?.results || []);
          setPageLimit(data.total_pages > 500 ? 500 : data.total_pages);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    },
    [id, pageNo]
  );

  useEffect(()=>{
      getReviews(id, pageNo);
    },[pageNo, id])

  const handlePageChange = (newPage) => {
    // Validate page bounds
    if (newPage < 1 || newPage > pageLimit) return;
    setPageNo(newPage);
  };

  if (reviewList.length === 0 && !loading) {
    return (
      <div>
        <h3 className="text-2xl font-semibold md:px-10 mt-6">Reviews</h3>
        <div className="rounded-lg p-6 text-center">
          <p className="dark:text-slate-300">No reviews available for this movie.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col md:px-10", className)}>
      <h3 className="text-2xl font-semibold  mt-6">Reviews</h3>
      <div className="flex flex-row flex-nowrap relative mt-3">
        <Carousel opts={{ align: "start", }} className="w-full cus-carousel rounded-xl overflow-hidden">
          <CarouselContent className="w-[95%] ml-0">
            {reviewList?.map((ele, index) => (
              <CarouselItem key={`review-${ele.id}-${index}`} className="basis-full  md:basis-1/3 pl-2" >
                 <ReviewCard className={""} review={ele} onSelect={() => setSelectedReview(ele)} isSelected={selectedReview?.id === ele.id} />
              </CarouselItem>
            ))}
          </CarouselContent>
  
          <CarouselPrevious className="left-0 cus-carousel-play-btn bg-neutral-200 dark:bg-neutral-800 size-10 cursor-pointer z-[4]" />
          <CarouselNext className="right-0 cus-carousel-play-btn bg-neutral-200 dark:bg-neutral-800 size-10 cursor-pointer z-[4]" />
  
        </Carousel>
      </div>

      <ReviewDialog selectedReview={selectedReview} setSelectedReview={setSelectedReview} />
    </div>
  );
};




export default Reviews;
