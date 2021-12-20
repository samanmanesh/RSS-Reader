
import RssTest from "components/RssTest";
import Sidebar from "components/layout/navigation/Sidebar";
import TailwindTemplate from "components/TailwindTemplate";
import { useEffect, useState } from "react";


export default function Home() {

  useEffect(() => {
    if (window) {
      document.documentElement.classList.add("dark");
    }
  }, [])

  return (
    <div className="h-full">
        {/* <RssTest  /> */}
        {/* <TailwindTemplate  /> */}
        {/* <Sidebar  /> */}
        We are in index
        
    </div>
  );
} 
