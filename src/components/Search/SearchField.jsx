import React, { useCallback, useEffect, useState, useTransition } from "react";
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Search, X } from 'lucide-react';
import { cn } from "@/lib/utils";
import SearchButton from "./SearchButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import CustomModal2 from "../Modals/CustomModal2";
import redirectURL from "@/redirectURL";
import SearchMediaList from "./SearchMediaList";
import { useNavigate } from "react-router-dom";

const SearchField = ({className}) => {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState(""); 
  const [category, setCategory] = useState("movies"); 
  const [debouncedValue, setDebouncedValue] = useState(""); 

  const [mediaList, setMediaList] = useState([])
  const [loading, setLoading] = useState(false);


  const getMediaInfo = useCallback((value, category="movies") => {
    let query_params = {
      language: "en-US",
      include_adult: false,
      page: 1,
      query: value
    };
    setLoading(true)

    let temp_category = "multi";
    // if(category==="movies") temp_category = "movie"
    // if(category==="tvshows") temp_category = "tv"

    redirectURL.get(`/search/${temp_category}`, { params: query_params })
      .then((res) => {
        if(res.status===200 && res.data.results){
          let results = res.data.results?.filter((ele)=>ele.media_type === "movie" || ele.media_type === "tv")
          setMediaList(results || []);
        }
        else{
          setMediaList([]);
        }
      })
      .catch((err) => console.log(err))
      .finally(()=> setLoading(false) )
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, 500);

    return () => clearTimeout(handler); 
  }, [searchValue]);

  useEffect(() => {
    if (debouncedValue ) {
      getMediaInfo(debouncedValue, category);
    }else{
      setMediaList([]);
    }
  }, [debouncedValue, category]);

  const onClose = ()=>{
    setMediaList([]);
    setDebouncedValue("");
    setSearchValue("");
  }

  const onClick=(type,id)=>{
    if(type === "movie" && id) {
      onClose();
      navigate(`/movies/${id}`);
    }
    else if(type === "tv" && id) {
      onClose();
      navigate(`/tvshows/${id}`);
    }
  }
  return (
    <div className={cn("relative ", className)}>
      <div className={cn("relative w-full")}>
        <input 
          type="text" 
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search Movies, TV shows..." 
          className="bg-neutral-900 placeholder:text-neutral-300 border border-gray-700 rounded-full pl-4 pr-8 py-2 text-sm  w-full focus:outline-none focus:ring-2 focus:ring-cyan-500/50" 
        />
        <AnimatePresence mode="wait">
          {
            !(searchValue.length>0) ? 
            <motion.button
              key={"search-icon"}
              initial={{opacity: 0 , y:10, }}
              animate={{opacity: 1 , y:0,}} 
              exit={{opacity: 0 , y:-10, }} 
              transition={{duration:0.3}}
              className="absolute right-3 top-2.5 text-gray-400 hidden md:block"
            >
              <Search size={18}  />
            </motion.button>
            :
            <motion.button 
              className="cursor-pointer inline-block transition-all duration-300 hover:text-gray-300  absolute right-3 top-2.5 text-gray-400" 
              key={"clear-icon"} 
              initial={{opacity: 0 , y:10, }} 
              animate={{opacity: 1 , y:0,}} 
              exit={{opacity: 0 , y:-10, }} 
              onClick={()=>setSearchValue("")}
            >
              <X size={18} className="" />
            </motion.button>
          }
        </AnimatePresence>
      </div>
      <AnimatePresence mode="wait">
        {debouncedValue && <SearchMediaList 
          serachText={debouncedValue} 
          list={mediaList}
          loading={loading} 
          className={"absolute w-full "} 
          onClick={onClick}
          category={category}
         />}
         
      </AnimatePresence>
    </div>
  )
}

export default SearchField