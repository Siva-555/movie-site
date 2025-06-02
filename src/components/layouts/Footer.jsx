import { href, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Navigation = [
  { href: "/", title:"Home"},
  { href: "/movies", title:"Movies"},
  { href: "/tvshows", title:"TV Shows"},
  { href: "/mylist", title:"My List"},
  { href: "/upcoming", title:"Coming Soon"},
]

const Categories = [
  { href: "/", title: "Action", disabled: true },
  { href: "/", title: "Comedy", disabled: true },
  { href: "/", title: "Drama", disabled: true },
  { href: "/", title: "Horror", disabled: true },
  { href: "/", title: "Sci-Fi", disabled: true }
];

const Legal = [
  { title: "Terms of Service", disabled: true, href:"/" },
  { title: "Privacy Policy", disabled: true, href:"/" },
  { title: "Cookie Policy", disabled: true, href:"/" },
  { title: "GDPR", disabled: true, href:"/" },
];



const Footer = () => {

  const onClickScrollToTop = ()=> window.scrollTo({ top: 0, behavior: 'smooth' }) 
  return (
    <footer className="bg-slate-950 border-t border-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <motion.div 
            className="mb-8 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <a href="/" className="text-2xl font-bold mb-4 block">
              <span className="bg-gradient-to-r from-[#FF3CAC] via-[#784BA0] to-[#8A2BE2] bg-clip-text text-transparent inline-block">
                CineVerse
              </span>
            </a>
            <p className="text-slate-300 max-w-xs mb-4">
              Your personal Movie and TV show companion. Discover, track, and enjoy your entertainment journey.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3  gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-white font-semibold mb-4">Navigation</h3>
              <ul className="space-y-2 text-sm">
                {
                  Navigation.map((ele, ind)=> <li key={`nav-${ele.href}-${ind}`}><StyledLink to={ele.href} title={ele.title} onClick={onClickScrollToTop} /></li>)
                }
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-white font-semibold mb-4">Categories</h3>
              <ul className="space-y-2 text-sm">
                {
                  Categories.map((ele, ind)=> <li key={`cate-${ele.href}-${ind}`}><StyledLink to={ele.href} title={ele.title} onClick={onClickScrollToTop} /></li>)
                }
              </ul>
            </motion.div>
                        
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                {
                  Legal.map((ele, ind)=> <li key={`legal-${ele.href}-${ind}`}><StyledLink to={ele.href} title={ele.title} onClick={onClickScrollToTop} /></li>)
                }   
              </ul>
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-center items-center text-sm text-slate-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p>© {new Date().getFullYear()} CineVerse. All rights reserved.</p>
          {/* <div className="mt-4 md:mt-0">
            <select className="bg-[#1E1E1E] border border-gray-700 rounded px-2 py-1 text-sm">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div> */}
        </motion.div>
      </div>
    </footer>
  );
};


const StyledLink = ({ className, title,  ...props})=>{
  return (
  <motion.div whileHover={{y:-5}} className="group">
    <Link className={cn("text-slate-300 hover:text-white transition-all duration-300 ", className)} {...props}>
    {title}
    </Link>
    <div className="h-[2px] bg-gradient-to-r from-[#FF3CAC] via-[#784BA0] to-[#8A2BE2]  w-0 group-hover:w-full transition-all duration-300 " />
  </motion.div>
  )
}
export default Footer;
