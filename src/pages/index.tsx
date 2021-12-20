
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

  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div className="bg-gray-200 h-full ">
      <main className="container   min-h-screen  ">
        
        {/* <RssTest  /> */}
        <TailwindTemplate sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </main>
    </div>
  );
} 
