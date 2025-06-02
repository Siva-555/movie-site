import React, { useLayoutEffect, useTransition } from "react";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence  } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Clapperboard, MonitorPlay } from "lucide-react";
import { FaBookmark, FaRegBookmark  } from "react-icons/fa";
import { Bookmark, Check, } from "lucide-react";
import { useMobile } from "@/hooks/useMobile";

const tabs = [
  { id: "movies", label: "Movies", url: "/movies", Icon : Clapperboard},
  { id: "tvshows", label: "TV Shows", url: "/tvshows", Icon: MonitorPlay},
  { id: "mylist", label: "My List", url: "/mylist", Icon: Bookmark },
  // { id: "watchList", label: "My WatchList", url: "/watchlist", Icon: Bookmark },
  // { id: "alreadywatched", label: "Watched", url: "/alreadywatched", Icon: Check },
];

const NavTabs = ({className, tabClassName, activeTabClassName}) => {
  const location = useLocation();
  const navigation = useNavigate();
  const [isPending, startTransition] = useTransition(); 
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const isMobile = useMobile();


  const getActiveTab = () => {
    return tabs.find((ele) => ele?.url === location.pathname)?.id || null;
  };
  const [activeTab, setActiveTab] = useState(getActiveTab);
  
  useEffect(()=>{
    startTransition(()=>{
      setActiveTab(getActiveTab());
    })
  }, [location])


  return (
    <div
      className={cn(
        "flex flex-row items-center justify-start [perspective:1000px] relative w-fit bg-slate-600 py-1.5 px-2 rounded-full",
        className,
        !activeTab ? "hidden": "visible"
      )}
    >
     
      {tabs.map((tab, idx) => (
        <button
          key={`tab-${tab.id}`}
          onClick={() => navigation(tab.url) }
          className={cn("relative px-2.5 py-1.5 rounded-full cursor-pointer flex gap-1.5 items-center ", tabClassName)}
          style={{ transformStyle: "preserve-3d",}}
          onMouseEnter={()=>setHoveredIdx(idx)}
          onMouseLeave={()=>setHoveredIdx(null)}
        >
          {(activeTab === tab.id) && (
            <motion.div
              layoutId={`tab-slider`}
              transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
              className={cn(
                "absolute inset-0 bg-slate-900 rounded-full ",
                activeTabClassName
              )}
            />
          )}
          {hoveredIdx === idx && (
            <motion.div
              layoutId={`tab-hovered`}
              transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
              className={cn(
                "absolute inset-0 bg-slate-900/70 rounded-full ",
                activeTabClassName
              )}
            />
          )}
          <span  className={cn("relative text-white") } >{<tab.Icon size={18} />}</span>
          <motion.span
            className={cn(
              "relative text-white text-xs md:text-sm font-semibold ",
              activeTab === tab.id ? "block" : "hidden md:block"
            )}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -5 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {tab.label}
          </motion.span>
        </button>
      ))}
    </div>
 
  )
};

export default NavTabs;


// export default function NavTabs({className, tabClassName, activeTabClassName}) {
//   const location = useLocation();
//   const navigation = useNavigate();
//   const [isPending, startTransition] = useTransition(); 

//   const getActiveTab = () => {
//     return tabs.find((ele) => ele?.url === location.pathname)?.id || null;
//   };

//   const [indicatorStyle, setIndicatorStyle] = useState({
//     width: 0,
//     left: 0,
//   })
//   const tabRefs = useRef([]);

    
//   const [activeTab, setActiveTab] = useState(getActiveTab);
  
//   useLayoutEffect(()=>{

//     startTransition(()=>{
//       let temp_tab = tabs.find((ele) => ele?.url === location.pathname) || {}
  
//       const activeTabIndex = tabs.findIndex((tab) => tab.id === temp_tab.id)
//       const activeTabElement = tabRefs.current[activeTabIndex]
  
//       if (activeTabElement) {
//         // Set the indicator width and position
//         setIndicatorStyle({
//           width: activeTabElement.offsetWidth,
//           left: activeTabElement.offsetLeft,
//         })
//       }
  
//       setActiveTab(temp_tab.id);

//     })
//   }, [location])


//   return (
//     <div
//       className={cn(
//         "flex flex-row items-center justify-start [perspective:1000px] relative w-fit bg-slate-600 py-1.5 px-2 rounded-full",
//         className,
//         !activeTab ? "hidden": "visible"
//       )}
//     >
//       <div className="flex relative">
//         {tabs.map((tab, index) => (
//           <button
//             key={tab.id}
//             ref={(el) => (tabRefs.current[index] = el)}
//             onClick={() => navigation(tab.url) }
//             // className={`relative z-10 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 dark:text-white `}
//             className={cn("relative  z-10  px-2.5 py-1.5 rounded-full cursor-pointer text-sm transition-all duration-300 font-semibold text-slate-100", tabClassName)}
//             aria-selected={activeTab === tab.id}
//           >
//             {tab.label}
//           </button>
//         ))}

//         {/* <motion.div
//           className="absolute inset-0 bg-gray-200 transition-all duration-300 ease-in-out dark:bg-slate-800 rounded-full "
//           initial={false}
//           animate={{
//             width: indicatorStyle.width,
//             left: indicatorStyle.left,
//           }}
//           transition={{
//             type: "spring",
//             stiffness: 300,
//             damping: 30,
//           }}
//           style={{ height: "80%", top: "10%" }}
//         /> */}
//         <div
//           className={cn("absolute inset-0 bg-gray-200 transition-all duration-300 ease-in-out dark:bg-slate-800 rounded-full ", )}
//           style={{
//             width: `${indicatorStyle.width}px`,
//             left: `${indicatorStyle.left}px`,
//           }}
//         />
//       </div>
//     </div>
//   )
// }

