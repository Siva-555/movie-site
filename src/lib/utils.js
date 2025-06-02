import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import { IMG_BASE_URL } from "./constants";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatRuntime = (minutes=0) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};


export const getRandomColor = () => {
  const bgColors = [
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-emerald-500",
  ];
  
  const randomIndex = Math.floor(Math.random() * bgColors.length);
  return bgColors[randomIndex];
};

export const getImageURL = (imgPath, formatype="original")=>{
  if(!imgPath) return null;

  return `${IMG_BASE_URL}/${formatype}${imgPath}`
}


export const getIntialChars = (text)=>{
  
  if(!text) return null;

  let chars = text ?text.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2) : "??";

  return chars
}