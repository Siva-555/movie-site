import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import Overlay from "@/components/common/Overlay";
import { cn } from "@/lib/utils";

const backdropVariants = {
  hidden: { opacity: 0 , backdropFilter: "blur(0px)"},
  visible: { opacity: 1,backdropFilter: "blur(10px)" },
  exit: { opacity: 0 , backdropFilter: "blur(0px)"},
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 20 },
};

const CustomModal = ({ open, onClose, children, layoutId }) => {
  useEffect(() => {
    // Close on ESC key
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    // if (open) {
    //   document.body.style.overflow = "hidden";
    // } else {
    //   document.body.style.overflow = "auto";
    // }

    if (open) document.addEventListener("keydown", handleEsc);
    else document.removeEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
      // document.body.style.overflow = "auto";
    }
  }, [open, onClose]);

  return (
    <AnimatePresence propagate>
        {open && 
        <motion.div
          // initial={{  opacity: 0, }}
          // animate={{ opacity: 1, backdropFilter: "blur(10px)", }}
          // exit={{ opacity: 0, transition: { duration: 0.05, }, backdropFilter: "blur(0px)", }}
          className="fixed [perspective:800px] [transform-style:preserve-3d] inset-0 h-full w-full  flex items-center justify-center z-50"
        
          layoutId={layoutId ? layoutId : ""}
        >
          {/* Backdrop */}
          {/* <Overlay onClick={onClose} /> */}
          <motion.div variants={backdropVariants} className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}/>


          <motion.div
            variants={modalVariants}
            transition={{ duration: 0.3, ease: "easeInOut", type: "spring", damping: 20, stiffness: 300  }}
            className="relative z-10 w-full max-w-2xl p-6 rounded-xl  bg-white dark:bg-slate-900/80 shadow-2xl backdrop-blur-3xl"
          >

            {children}
          </motion.div>
        </motion.div>
        }
    </AnimatePresence>
  );
};

export default CustomModal;
