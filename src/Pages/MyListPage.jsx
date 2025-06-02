import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { Link } from 'react-router-dom';
import WatchListMainPage from './WatchListMainPage';
import AlreadyWatchedMainPage from './AlreadyWatchedMainPage';


const Tab = [
  {id:"watchlist", title: "Watchlist"},
  {id:"watched", title: "Watched"},
]

const MyListPage = () => {
  const { watchlist, watchedList } = {watchlist:0, watchedList:0};
  const [activeTab, setActiveTab] = useState('watchlist');
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);
  
  // Find movies from dummy data based on watchlist/watched IDs
  useEffect(() => {
    const allMovies = [];
    
    const filteredWatchlist = allMovies.filter(movie => watchlist.includes(movie.id));
    setWatchlistMovies(filteredWatchlist);
    
    const filteredWatched = allMovies.filter(movie => watchedList.includes(movie.id));
    setWatchedMovies(filteredWatched);
    
    window.scrollTo(0, 0);
  }, [watchlist, watchedList]);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      
      <main className=" pb-16 min-h-screen">
        <div className="container mx-2 md:mx-auto">
          <div className="mb-4">
            <div className="flex border-b border-gray-800 gap-3">
              {
                Tab.map((ele, ind)=>(
                  <motion.button 
                    key={`mylist-tab-${ind}-${ele.id}`}
                    className={`py-3 font-medium relative cursor-pointer ${activeTab === ele.id ? 'text-white ' : 'text-[#A0A0A0]'}`}
                    onClick={() => setActiveTab(ele.id)}
                  >
                    {ele.title}
                    {
                      (activeTab === ele.id) && 
                      <motion.div 
                        layoutId="mylist-tab" 
                        transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                        initial={{ scaleX: 0, width:0}}
                        animate={{ scaleX: 1, width: "100%" }}
                        className='absolute left-0  bottom-0 border-b-2 border-[#8A2BE2] h-2 '  
                      />
                    }
                  </motion.button>
                ))
              }
            </div>
          </div>
          
          <AnimatePresence mode="wait">
            {activeTab === 'watchlist' && (
              <motion.div 
                key="watchlist-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <WatchListMainPage />
              </motion.div>
            )}
            
            {activeTab === 'watched' && (
              <motion.div 
                key="watched-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <AlreadyWatchedMainPage />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      
    </motion.div>
  );
}

export default MyListPage