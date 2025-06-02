import React from 'react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'motion/react';
import SearchMediaCard from './SearchMediaCard'

const SearchMediaList = ({className, list, loading, category, serachText, onClick}) => {

  // if(serachText?.length<3){
  //   return <div className={cn("flex items-center justify-center", className)}>Please type at least 3 characters to search</div>
  // }
  // if(!list?.length){
  //   return <div className={cn("flex items-center justify-center ", className)}>No results found.</div>
  // }

  return (
      <motion.div 
        initial={{opacity: 0, height:0, y:10, scale:0.8}}
        animate={{opacity: 1,height:"auto", y:0, scale:1}}
        exit={{opacity: 0,height:0, y:-20, }}
        transition={{duration:0.3}}
        className={cn("pt-2 overflow-y-auto cust-scroll  max-h-[300px]  md:max-h-[450px] z-30 bg-neutral-800/90 rounded-lg top-11", className)}
      >
        {
          loading && <motion.div 
          initial={{opacity: 0, y:10, scale:0.8}}
          animate={{opacity: 1, y:0, scale:1 }}
          exit={{opacity: 0, y:-10, scale:0.8}}
          transition={{duration:0.3}}
          className={cn("flex items-center justify-center  w-full h-[200px] z-10  rounded-lg")}
        >
          <div className="w-10 h-10 border-4 border-t-blue-500 border-slate-300 rounded-full animate-spin" />
        </motion.div>
         }
        {!loading && <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, filter:"blur(0px)" },
            visible: {
              opacity: 1,
              filter:"blur(0px)",
              backdropFilter:"blur(20px)",
              transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1
              }
            }
          }}
          className='flex flex-col gap-1.5 pb-4 '
        >
          {
            list.map((ele, ind)=>{
              return <SearchMediaCard key={`search-list-${ind}-${ele?.id}`} className={""} item={ele} category={ele.media_type} onClick={()=> onClick(ele.media_type, ele.id)} />
            })
          }
        </motion.div>}
      </motion.div>
  )
}

export default SearchMediaList