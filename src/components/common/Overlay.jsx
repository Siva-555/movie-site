import React from "react";
import { motion } from "framer-motion";

const Overlay = ({ className, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, }}
      animate={{ opacity: 1, backdropFilter: "blur(10px)", }}
      exit={{
        // opacity: 0,
        // transition: { duration: 0.05, },
        backdropFilter: "blur(0px)",
      }}
      transition={{duration:0.2}}
      className={`fixed inset-0 h-full w-full bg-opacity-50 z-8 ${className || ""}`}
      {...props}
    ></motion.div>
  );
};

export default Overlay
