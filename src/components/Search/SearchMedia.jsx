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

const buttonVariants = {
  initial: { scale: 1, },
  hover: { 
    scale: 1.05,
    transition: { scale: { type: "spring", stiffness: 400, damping: 17 }, }
  },
  tap: { 
    scale: 0.95,
    transition: { type: "spring", stiffness: 400, damping: 17 }
  }
};

const iconVariants = {
  initial: { scale: 1,},
  hover: { 
    scale: 1.05,
    transition: { type: "spring", stiffness: 400, damping: 25 }
  },
  tap: { 
    scale: 0.95,
    transition: { type: "spring", stiffness: 400, damping: 25 }
  }
};

const gradientVarients = {
  initial: { opacity: 0, width: 0 },
  hover: { 
    opacity: 1,
    width: "75%",
    transition: { type: "spring", stiffness: 400, damping: 25 }
  }
};

const SearchMedia = ({ className }) => {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
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

    let temp_category = "movie";
    if(category==="movies") temp_category = "movie"
    if(category==="tvshows") temp_category = "tv"

    redirectURL.get(`/search/${temp_category}`, { params: query_params })
      .then((res) => {
        if(res.status===200 && res.data.results){
          setMediaList(res.data.results);
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
    if (debouncedValue && debouncedValue?.length>=3) {
      console.log(`Searching for "${debouncedValue}" in ${category}`);
      getMediaInfo(debouncedValue, category);
    }else{
      setMediaList([]);
    }
  }, [debouncedValue, category]);

  const onClose = ()=>{
    setOpen(false);
    setMediaList([]);
    setDebouncedValue("");
    setSearchValue("");
  }

  const onClick=(id)=>{
    if(category === "movies" && id) {
      onClose();
      navigate(`/${category}/${id}`);
    }
    else if(category === "tvshows" && id) {
      onClose();
      navigate(`/${category}/${id}`);
    }
  }

  return (
    <div className={cn("", className)}>
      <motion.button 
        className={cn("relative flex flex-row items-center bg-slate-600 w-fit px-4 py-2 text-sm rounded-2xl font-semibold cursor-pointer  ")}
        whileHover="hover"
        whileTap="tap"
        initial="initial"
        variants={buttonVariants}
        onClick={()=>startTransition(()=>setOpen(!open))}
      >
        <motion.div variants={iconVariants}> <Search size={16} /> </motion.div>
        <motion.div className="ml-1 overflow-hidden whitespace-nowrap hidden md:flex"> Search </motion.div>
        <motion.div 
          className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent w-3/4 mx-auto " 
          variants={gradientVarients}
        />
        <motion.div 
          className="absolute inset-x-0 bottom-0 h-[4px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent w-3/4 mx-auto blur-sm" 
          variants={gradientVarients}
        />
      </motion.button>
      {/* Search Modal */}
      <CustomModal2 open={open} onClose={onClose} modalBodyClassName="h-auto max-h-[500px]">
        <div className="relative flex flex-col h-full">
          <div className="relative w-full flex flex-row justify-between gap-3 items-center">
            <div className="relative w-full flex">
              {/* Search Icon */}
              <Search size={18} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-200" />

              {/* Search Input */}
              <input
                type="text"
                placeholder="Search Movies/TV"
                className="w-full p-2 pl-8 text-sm  rounded-md  placeholder:truncate bg-slate-600 text-white placeholder-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-500"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />

            </div>
            <div className=" w-[110px] ">
              <Select className=" text-sm " value={category} onValueChange={(e)=>setCategory(e)} >
                <SelectTrigger className="w-full bg-slate-600!  border-slate-700 text-sm">
                  <SelectValue className="hover:bg-slate-600!"  placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-slate-600 border-slate-600 text-sm" >
                  <SelectItem className="hover:bg-slate-700! active:bg-slate-700! focus:bg-slate-700!" value="movies">Movies</SelectItem>
                  <SelectItem className="hover:bg-slate-700! active:bg-slate-700! focus:bg-slate-700!" value="tvshows">TV Shows</SelectItem>
                </SelectContent>
              </Select>

            </div>

          </div>

          <SearchMediaList serachText={debouncedValue} list={mediaList} loading={loading} className={"flex-1 mt-2 ml-1 min-h-20 max-h-[450px]"} onClick={onClick} category={category}/>

          {/* <button
            onClick={onClose}
            className="absolute right-0 top-0 rounded-full bg-black/50 p-1 text-white backdrop-blur-sm transition-colors hover:bg-black/70 cursor-pointer"
          >
            <X size={16} />
          </button> */}
        </div>
      </CustomModal2>
    </div>
  )
}

export default SearchMedia