import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import redirectURL from "@/redirectURL";
import { Button } from "@/components/ui/button"
import MediaCard from "./MediaCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SkeletonLoader1 from "../common/SkeletonLoader1";

import { IMG_BASE_URL } from "@/lib/constants";
import { useNavigate } from "react-router-dom";

const MediaByGenres = ({ className, catagoryType="movies" }) => {
  const genres = useSelector((state) => {

    if(catagoryType === "tvshows"){
      return state?.genre?.tvshows || [];
    }
    if(catagoryType === "movies"){
      return state?.genre?.movies || [];
    }
    
  });

  const [moviesData, setMoviesData] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [pageNo, setPageNo] = useState(1);
  const [pageLimit, setPageLimit] = useState(1);
  const [loading, setLoading]= useState(false);

  const genreRef = useRef(null);
  const navigate = useNavigate();

  const fetchMediaByGenres = useCallback(async (pageNo, selectedGenre) => {
    let query_params = {
      language: "en-US",
      page: pageNo || 1,
      include_adult: false,
      include_video: false,
      sort_by: "popularity.desc",
      // with_origin_country: "IN",
    };
    if(selectedGenre && selectedGenre !== "All"){
      query_params["with_genres"] = selectedGenre
    }
    setLoading(true);

    let type = catagoryType== "movies" ? "movie" : (catagoryType== "tvshows" && "tv" )
    try{
      let res = await redirectURL.get(`discover/${type}`, { params: query_params })
      if(res.status === 200){
        let data = res.data;
        setMoviesData(data);
        setPageLimit(data.total_pages > 500 ? 500 : data.total_pages);
        setLoading(false);
      }
    }
    catch(err){
      console.log(err);
      setLoading(false);
    }
  }, [ pageNo, selectedGenre ]);

  useEffect(()=>{
    fetchMediaByGenres(pageNo, selectedGenre);
    if(pageNo>1){
      genreRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  },[pageNo, selectedGenre])


  const handlePageChange = (newPage) => {
    // Validate page bounds
    if (newPage < 1 || newPage > pageLimit) return;
    setPageNo(newPage);
  };

  // Calculate which page numbers to show
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (pageLimit <= maxPagesToShow) {
      // Show all pages if total pages is less than or equal to maxPagesToShow
      for (let i = 1; i <= pageLimit; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show the first page
      pageNumbers.push(1);
      
      if (pageNo > 3) {
        pageNumbers.push(null); // Add ellipsis
      }
      
      // Add the current page and adjacent pages
      const startPage = Math.max(2, pageNo - 1);
      const endPage = Math.min(pageLimit - 1, pageNo + 1);
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      if (pageNo < pageLimit - 2) {
        pageNumbers.push(null); // Add ellipsis
      }
      
      // Always show the last page
      pageNumbers.push(pageLimit);
    }
    
    return pageNumbers;
  };
  

  const onClickGenre= (gen)=>{
    // console.log("test", gen)
    setPageNo(1);
    setPageLimit(null)
    setSelectedGenre(gen);
  }

  const onClickNavigate = (ele)=>{
    // console.log("test --on click", ele)
    if(ele.id && catagoryType === "movies") navigate(`/movies/${ele.id}`)
    else if(ele.id && catagoryType === "tvshows") navigate(`/tvshows/${ele.id}`)
  }

  return (
    <div className={cn("", className)} ref={genreRef} id="genre">
      {/* <div className="flex flex-row gap-1.5 overflow-x-auto mx-3 md:mx-14 lg:mx-24 cust-scroll rounded-md md:cus-bg-gradient text-xs md:text-base">
        <span 
          onClick={()=>onClickGenre("All")}
          className={cn("cus-chip my-4 ", selectedGenre === "All" ? "font-semibold border-2 border-slate-600 bg-slate-900!" :"")}
        >
            All
        </span>
        {genres.map((ele) => (
          <span 
            onClick={()=>onClickGenre(ele.id)}
            className={cn("cus-chip my-4 ", selectedGenre === ele.id ? "font-semibold border-2 border-slate-600 bg-slate-900!" :"")}  
            key={`mgenre-${ele.id}`}
          >
            {ele.name}
          </span>
        ))}
      </div> */}
      <div className="flex flex-row justify-between gap-1.5">
       <h4 className="text-lg md:text-xl font-semibold ">Discover</h4>
       <div>
       <select
          className="px-3 py-1.5 cust-scroll border border-gray-600 bg-slate-800 text-white rounded-md outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={selectedGenre}
          onChange={(e)=>onClickGenre(e.target.value)}
        >
          <option value="All">All</option>
          {genres.map((ele) => (
            <option key={`mgenre-${ele.id}`} value={ele.id}>
              {ele.name}
            </option>
          ))}
        </select>
       </div>
      </div>
      <div className="flex flex-col" >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4 mt-6">
          {
            loading &&   Array.from({ length: 20 }, (_, i) => ( <SkeletonLoader1 key={`sk1-${i}`} className="size-full" /> ))
          }

          { !loading && moviesData?.results?.map((ele, index) => (
            <div key={`genre-${pageNo}-${index}`} className="w-full" >
              <MediaCard
                className="size-full"
                onClickNavigate={()=>onClickNavigate(ele)}
                data={{
                  backdrop_path: ele.backdrop_path ? `${IMG_BASE_URL}/original/${ele.backdrop_path}` : null,
                  poster_path: ele.poster_path ? `${IMG_BASE_URL}/original/${ele.poster_path}` : null,
                  // poster_path: index%2 ?`${IMG_BASE_URL}/original/${ele.poster_path}`:"",
                  id: ele.id,
                  title: catagoryType== "movies" ? ele.title : (catagoryType== "tvshows" ? ele.name :""),
                  overview: ele.overview,
                  media_type: ele.media_type,
                  original_language: ele.original_language,
                  vote_average: ele.vote_average,
                  genre_ids: ele.genre_ids,
                  popularity: ele.popularity,
                  release_date: catagoryType == "movies" ? ele.release_date : (catagoryType== "tvshows" ? ele.first_air_date :"") ,
                }}
              />
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={()=> handlePageChange(pageNo-1) } disabled={pageNo<=1} />
              </PaginationItem>

              {getPageNumbers().map((pageNumber, index) => (
              pageNumber === null ? <PaginationItem key={`pagi-${index}`}> <PaginationEllipsis /> </PaginationItem>
               : (
                <PaginationItem key={`pagi-${index}`}>
                  <PaginationLink isActive={pageNumber === pageNo} onClick={(e) => handlePageChange(pageNumber) }> {pageNumber} </PaginationLink>
                </PaginationItem>
              )
            ))}

              <PaginationItem>
                <PaginationNext  onClick={()=> handlePageChange(pageNo+1) } disabled={pageNo<pageLimit ? false : true} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default MediaByGenres;
