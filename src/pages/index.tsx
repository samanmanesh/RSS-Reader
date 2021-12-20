
import RssTest from "components/RssTest";
import Sidebar from "components/Sidebar";
import TailwindTemplate from "components/TailwindTemplate";
import { useEffect, useState } from "react";


export default function Home() {

  useEffect(() => {
    if (window) {
      document.documentElement.classList.add("dark");
    }
  }, [])

  return (
    <div className="bg-gray-200 h-full ">
      <main className="container   min-h-screen  ">
        
        {/* <RssTest  /> */}
        <TailwindTemplate  />
        <Sidebar  />
      </main>
    </div>
  );
} 
