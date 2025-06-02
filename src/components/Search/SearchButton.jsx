import React from 'react'
import { motion } from "motion/react"
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const SearchButton = ({ className, ...props}) => {
  const buttonVariants = {
    initial: { 
      scale: 1,
      backgroundColor: 'rgb(71, 85, 105)' // slate-600
    },
    hover: { 
      scale: 1.05,
      backgroundColor: 'rgb(51, 65, 85)', // slate-700
      transition: {
        scale: {
          type: "spring",
          stiffness: 400,
          damping: 17
        },
        backgroundColor: {
          duration: 0.2
        }
      }
    },
    tap: { 
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17
      }
    }
  };

  const iconVariants = {
    initial: { x: 0 },
    hover: { 
      x: -2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    tap: { 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  const containerVariants = {
    initial: { 
      width: 0,
    },
    hover: { 
      width: "auto",
      transition: {
        duration: 0.2,
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const letterVariants = {
    initial: { 
      opacity: 0,
      y: 10
    },
    hover: { 
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  const gradientVarients = {
    initial: { 
      opacity: 0,
      width: 0
    },
    hover: { 
      opacity: 1,
      width: "75%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  return (
    <motion.button 
      className={cn("relative flex flex-row items-center bg-slate-600 w-fit px-4 py-2 text-sm rounded-2xl font-semibold cursor-pointer  ", className)}
      whileHover="hover"
      whileTap="tap"
      initial="initial"
      variants={buttonVariants}
      {...props}
    >
      <motion.div 
        variants={iconVariants}
      >
        <Search size={16} />
      </motion.div>
      <motion.div 
        className="ml-1 overflow-hidden whitespace-nowrap flex"
        variants={containerVariants}
      >
        {"Search".split('').map((letter, index) => (
          <motion.span
            key={`search-letter-${index}`}
            variants={letterVariants}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
      <motion.div 
        className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent w-3/4 mx-auto " 
        variants={gradientVarients}
      />
      <motion.div 
        className="absolute inset-x-0 bottom-0 h-[4px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent w-3/4 mx-auto blur-sm" 
        variants={gradientVarients}
      />
    </motion.button>
  );
}

export default SearchButton