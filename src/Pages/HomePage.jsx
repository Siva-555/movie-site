import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import movie_bg from "@/assets/movie-bg.png";
import { ArrowDown, ArrowRight, Bookmark, Film, Import, PlayCircle, Search, Shield } from "lucide-react";
import withHomepageLayout from "@/components/layouts/withHomepageLayout";
import { cn } from "@/lib/utils";
import { useState } from "react";

const FeatureCardSection = ({className, items})=>{
  const [hoveredIndex, setHoveredIndex] = useState(null);
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
      {
        items.map((ele, ind)=>(
          <motion.div key={`feature-${ind}-`} className="relative p-2" onMouseEnter={() => setHoveredIndex(ind)}  onMouseLeave={() => setHoveredIndex(null)}>
            {/* Card */}
            <motion.div
              className="bg-[#1E1E1E] p-6 rounded-xl z-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + ind*0.1 }}
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#8A2BE2] to-[#FF3CAC] flex items-center justify-center text-white mb-4">
                {ele.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">{ele.title}</h3>
              <p className="text-[#E0E0E0]">{ele.description}</p>
            </motion.div>
            {/* Hover effect */}
            <AnimatePresence>
              {hoveredIndex===ind && (
                <motion.span
                  className="absolute  inset-0 h-full w-full bg-gradient-to-br from-[#892be237] to-[#ff3caa2b] block  rounded-3xl -z-[1] "
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.4 },
                  }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        ))
      }
    </div>
  )
}

const Features = [
  {
    icon: <Film size={20} />,
    title: "Extensive Library",
    description: "Browse top-rated and trending movies/tv shows across all genres, from classics to new releases.",
    // description: "Access thousands of movies and TV shows across all genres, from classics to the latest releases.",
  },
  {
    icon: <Search size={20} />,
    title: "Smart Search",
    // description: "Find exactly what you want with our powerful search by title, genre, or popularity.",
    description: "Find movies and tv shows quickly by searching titles directly.",
  },
  {
    icon: <Bookmark size={20} />,
    title: "Personal Watchlist",
    description: "Save movies/tv shows to watch later and mark them as watched - all stored locally in your browser.",
  },
  {
    icon: <PlayCircle size={20} />,
    title: "Instant Previews",
    description: "Watch trailers and clips directly to help you decide what to watch.",
  },
  // {
  //   icon: <ThumbsUp size={20} />,
  //   title: "Content Recommendations",
  //   description: "Get suggestions based on the movie or tv show.",
  // },
  {
    icon: <Import size={20} />,
    title: "Data Portability",
    description: "Export your watchlist to save it or import it when switching devices.",
  },
  {
    icon: <Shield size={20} />,
    title: "Privacy Focused",
    description: "We don't track your viewing habits or collect personal data - your watchlist stays with you.",
  },
];


const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <main className="scroll-smooth">
        {/* Hero Section */}
        <section
          className="relative flex items-center overflow-hidden "
          style={{ height: "calc(100vh)" }}
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-[#121212]/50 to-[#121212]/50"></div>
            <img src={movie_bg} alt="background" className="size-full object-cover" />
          </div>

          <div className="relative z-10 container mx-auto px-4 py-16 flex justify-center">
            <div className="max-w-3xl text-center">
              <motion.span
                className="inline-block bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full text-sm mb-6 text-neutral-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Discover Your Favorite Movie / TV show
              </motion.span>

              <motion.h1
                className="text-4xl md:text-6xl font-['Poppins'] font-bold text-white leading-tight mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Your Ultimate{" "}
                <span className="bg-gradient-to-r from-[#FF3CAC] via-[#784BA0] to-[#8A2BE2] bg-clip-text text-transparent inline-block">
                  Movie Experience
                </span>{" "}
                <br />
                Awaits
              </motion.h1>

              <motion.p
                className="text-lg text-[#E0E0E0] mb-8 "
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                CineVerse gives you access to a world of entertainment.
                <br /> Track your favorite movies, discover new shows, and
                create your personal watchlist - all in one beautifully designed
                platform.
              </motion.p>

              <motion.div
                className="flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <motion.a
                  href="/movies"
                  className="px-8 py-3 bg-white text-neutral-900 font-semibold rounded-full flex items-center shadow-2xl shadow-white relative overflow-hidden group"
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  variants={{
                    initial: { y: 0 },
                    animate: { y: 0 },
                    hover: {
                      y: -5,
                      transition: {
                        duration: 0.3,
                        type: "spring",
                        stiffness: 300,
                      },
                    },
                  }}
                >
                  <motion.span
                     variants={{
                      initial: { y: 0 },
                      hover: { y: -2 },
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >Explore Movies</motion.span>{" "}
                  <motion.span
                    variants={{
                      initial: { x: 0,  rotate:0 },
                      hover: { x: 5, rotate:-30 },
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="ml-2"
                  >
                    <ArrowRight size={20} />
                  </motion.span>
                </motion.a>

                <motion.a
                  href="#learn-more"
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  variants={{
                    initial: { y: 0 },
                    animate: { y: 0 },
                    hover: {
                      y: -5,
                      transition: {
                        duration: 0.3,
                        type: "spring",
                        stiffness: 300,
                      },
                    },
                  }}
                  className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-full hover:bg-white/20 flex items-center"
                >
                  <motion.span
                     variants={{
                      initial: { y: 0 },
                      hover: { y: -2 },
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >Learn More</motion.span>
                </motion.a>
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce text-white/70">
            <span className=" text-sm mb-2">Scroll to explore</span>
            <ArrowDown />
          </div>
        </section>

        {/* Features Section */}
        <section id="learn-more" className="py-20 container mx-auto px-4">
          <div className="text-center mb-8">
            <motion.h2
              className="text-3xl md:text-4xl font-['Poppins'] font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Why Choose{" "}
              <span className="bg-gradient-to-r from-[#FF3CAC] via-[#784BA0] to-[#8A2BE2] bg-clip-text text-transparent inline-block">
                CineVerse
              </span>
            </motion.h2>
            <motion.p
              className="text-xl text-[#E0E0E0] max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Discover all the amazing features that make CineVerse the perfect
              companion for movie enthusiasts.
            </motion.p>
          </div>

          <FeatureCardSection items={Features} className="" />
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-[#1E1E1E]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.h2
                className="text-3xl md:text-4xl font-['Poppins'] font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                How CineVerse Works
              </motion.h2>
              <motion.p
                className="text-xl text-[#E0E0E0] max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Start your movie journey in just a few simple steps.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-[#8A2BE2] to-[#FF3CAC] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  Discover
                </h3>
                <p className="text-[#E0E0E0]">
                  Browse our extensive collection of movies and TV shows.
                </p>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-[#8A2BE2] to-[#FF3CAC] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Save</h3>
                <p className="text-[#E0E0E0]">
                  Add movies to your watchlist with a single click so you never
                  forget what you want to watch.
                </p>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-[#8A2BE2] to-[#FF3CAC] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Enjoy</h3>
                <p className="text-[#E0E0E0]">
                  Watch your movies, mark them as watched, and keep exploring recommended content."
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-[#8A2BE2]/30 to-[#FF3CAC]/30">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-['Poppins'] font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Ready to Start Your Movie Journey?
            </motion.h2>
            <motion.p
              className="text-xl text-[#E0E0E0] max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Join CineVerse today and discover a whole new way to experience
              movies and TV shows.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.a
                  href="/movies"
                  className="px-8 py-3 bg-white text-neutral-900 font-semibold rounded-full inline-flex items-center shadow-2xl shadow-white relative overflow-hidden group"
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  variants={{
                    initial: { y: 0 },
                    animate: { y: 0 },
                    hover: {
                      y: -5,
                      transition: {
                        duration: 0.3,
                        type: "spring",
                        stiffness: 300,
                      },
                    },
                  }}
                >
                  <motion.span 
                    variants={{
                      initial: { y: 0 },
                      hover: { y: -2 },
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Get Started Now
                  </motion.span>{" "}
                  <motion.span
                    variants={{
                      initial: { x: 0,  rotate:0 },
                      hover: { x: 5,  rotate:-30 },
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="ml-2"
                  >
                    <ArrowRight size={20} />
                  </motion.span>
                </motion.a>
            </motion.div>
          </div>
        </section>
      </main>
    </motion.div>
  );
};

export default withHomepageLayout(HomePage);
