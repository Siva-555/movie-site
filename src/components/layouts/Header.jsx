import React, { useEffect, useState }  from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Menu, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CircleHelp, Share2 } from 'lucide-react';
import { useNavigate, Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

import mainLogo from "@/assets/main_logo.svg";
import Logo from "@/assets/Logo.svg";
import SearchField from "../Search/SearchField";

const Header = ({ className }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(()=>{
    setIsSearchOpen(false);
  },[location])

  return (
    <header 
      className={
        cn(
        "sticky top-0 z-50 w-full  bg-slate-950/65 transition-all duration-300",
        isScrolled ? "backdrop-blur-2xl" :"",
        className)
      }
    >
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}

        <Link className="" to={"/"}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center h-8 py-0.5 gap-3 "
          >
            <img src={Logo} alt="logo" className="h-full" />
            <span className="text-2xl font-semibold text-slate-100">CineVerse</span>
          </motion.div>
        </Link>

        

        {/* Search and Mobile Menu Toggle */}
        <div className="flex items-center gap-2">
          <SearchField className={"hidden md:block w-64"} />
           {/* Mobile Search and Menu Toggle */}
           <div className="flex md:hidden items-center gap-1">
            <Button variant="ghost" className={""} size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t "
          >
            <div className="container py-2">
              <SearchField className={"w-full"} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
};

export default Header;
