import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';


const CustomModal2 = ({ open, onClose , children, modalBodyClassName=""}) => {
  useEffect(() => {
      // Close on ESC key
      const handleEsc = (e) => {
        if (e.key === "Escape") onClose();
      };
  
      if (open) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
  
      if (open) document.addEventListener("keydown", handleEsc);
      else document.removeEventListener("keydown", handleEsc);
  
      return () => {
        document.removeEventListener("keydown", handleEsc);
        document.body.style.overflow = "auto";
      }
    }, [open, onClose]);
  return (
    <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className={cn("fixed left-1/2 top-1/6 z-50 h-48 w-full max-w-lg -translate-x-1/2 -translate-y-1/6 overflow-hidden rounded-xl bg-slate-700 shadow-xl p-6", modalBodyClassName)}
            >
              {children}
                {/* <button
                  onClick={onClose}
                  className="absolute right-0 top-0 rounded-full bg-black/50 p-1 text-white backdrop-blur-sm transition-colors hover:bg-black/70 cursor-pointer"
                >
                  <X size={16} />
                </button> */}
            </motion.div>
          </>
        )}
      </AnimatePresence>
  )
}

export default CustomModal2