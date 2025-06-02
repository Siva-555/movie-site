import { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider"
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import ErrorComponet from "@/components/layouts/ErrorComponent";

import { setMovieGeners, setTvShowsGenres , setLoadingGenre} from "@/redux/genreSlice";
import redirectURL from "@/redirectURL";
import NavTabs from "@/components/layouts/NavTabs";
import SearchMedia from "@/components/Search/SearchMedia";
import { cn } from "@/lib/utils";

const TAB_URLS = ["/movies", "/tvshows", "/watchlist", "/alreadywatched", "/mylist"]

const LayoutWrapper = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const [hide, setHide]= useState(false);

  const getGenres = useCallback(async () => {
    let query_params = {
      language: "en",
      // page: 1,
    };
    dispatch(setLoadingGenre(true))
   await redirectURL.get("/genre/movie/list", { params: query_params })
      .then((res) => {
        if(res.status===200){
          dispatch(setMovieGeners(res.data?.genres || []));
        }
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(setLoadingGenre(false)))

      dispatch(setLoadingGenre(true))
      
    await redirectURL.get("/genre/tv/list", { params: query_params })
      .then((res) => {
        if(res.status===200){
          dispatch(setTvShowsGenres(res.data?.genres || []));
        }
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(setLoadingGenre(false)))

  }, []);

  useEffect(()=>{
    getGenres();
  }, [])

  useEffect(()=>{
    let temp = TAB_URLS.find(ele=>ele === location.pathname) ? true : false
    setHide(!temp);
  }, [location])



  return (
    <ErrorComponet>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="min-h-screen h-full w-full relative">
          <Header className="" />
          <div className="size-full p-2 md:p-0 min-h-[70vh]">
            <div className={cn("flex items-center justify-between my-4 md:my-8s ", hide ? "hidden" : "visible")}>
              <NavTabs className="ml-1 md:ml-8 " />
            </div>
            <Outlet />
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    </ErrorComponet>
  );
};

export default LayoutWrapper;
