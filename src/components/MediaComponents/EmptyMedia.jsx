import React from "react";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import SearchButton from "@/components/Search/SearchButton";
import { Link, useNavigate, useNavigation } from "react-router-dom";

const EmptyMedia = ({ className,cardKey, title = "", icon,  subTitle = "" }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      key={cardKey || "watchlist-content"}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex justify-center"
    >
      <div className="bg-neutral-900 rounded-xl p-8 text-center max-w-2xl">
        <div className="w-16 h-16 bg-[#8A2BE2]/20 text-[#FF3CAC] rounded-full flex items-center justify-center mx-auto mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-[#E0E0E0] mb-6 max-w-md mx-auto">
          {subTitle}
        </p>
        <motion.div
          initial="initial"
          animate="animate"
          whileHover="hover"
          variants={{
            initial: { y: 0 },
            animate: { y: 0 },
            hover: {
              y: -5,
              transition: { duration: 0.3, type: "spring", stiffness: 300, },
            },
          }}
          onClick={()=>navigate("/movies")}
          className="px-6 py-2 bg-[#8A2BE2] text-white rounded-lg hover:bg-opacity-90 inline-block cursor-pointer shadow-lg shadow-[#8A2BE2]/30"
        >
          <motion.span 
            variants={{
              initial: { y: 0 },
              hover: { y: -5 },
            }}
            transition={{ type: "spring", stiffness: 300 }}>Browse Movies</motion.span>
        </motion.div>
      </div>
    </motion.div>
  );

  // return (
  //   <motion.div
  //     variants={{ initial: { opacity: 0 }, animate: { opacity: 1 } }}
  //     initial="initial"
  //     animate="animate"
  //     transition={{ duration: 0.3 }}
  //     className={cn(
  //       "mt-2 md:p-3 h-[70vh] flex justify-center items-center",
  //       className
  //     )}
  //   >
  //     <motion.div
  //       className="flex flex-col items-center justify-center h-60 text-center space-y-4"
  //       initial="initial"
  //       animate="animate"
  //     >
  //       {title && (
  //         <motion.h2
  //           className="text-lg font-semibold text-slate-300"
  //           variants={{
  //             initial: { opacity: 0 },
  //             animate: {
  //               opacity: 1,
  //               transition: {
  //                 duration: 0.2,
  //                 staggerChildren: 0.04,
  //                 delayChildren: 0.2,
  //               },
  //             },
  //           }}
  //         >
  //           {title.split("").map((ele, ind) => (
  //             <motion.span
  //               key={`letter-st1-${ind}`}
  //               variants={{
  //                 initial: { opacity: 0, y: 10 },
  //                 animate: {
  //                   opacity: 1,
  //                   y: 0,
  //                   transition: { type: "spring", stiffness: 400, damping: 25 },
  //                 },
  //               }}
  //             >
  //               {ele}
  //             </motion.span>
  //           ))}
  //         </motion.h2>
  //       )}

  //       {subTitle && (
  //         <motion.p
  //           className="text-sm text-slate-400"
  //           variants={{
  //             initial: { opacity: 0 },
  //             animate: {
  //               opacity: 1,
  //               transition: {
  //                 duration: 0.2,
  //                 staggerChildren: 0.04,
  //                 delayChildren: 0.2,
  //               },
  //             },
  //           }}
  //         >
  //           {subTitle.split("").map((ele, ind) => (
  //             <motion.span
  //               key={`letter-st2-${ind}`}
  //               variants={{
  //                 initial: { opacity: 0, y: 10 },
  //                 animate: {
  //                   opacity: 1,
  //                   y: 0,
  //                   transition: { type: "spring", stiffness: 400, damping: 25 },
  //                 },
  //               }}
  //             >
  //               {ele}
  //             </motion.span>
  //           ))}
  //         </motion.p>
  //       )}
  //       <SearchButton className="" />
  //     </motion.div>
  //   </motion.div>
  // );
};

export default EmptyMedia;
