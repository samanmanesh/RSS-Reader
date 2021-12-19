
import RssTest from "components/RssTest";
import TailwindTemplate from "components/TailwindTemplate";
import { useEffect } from "react";


export default function Home() {

  useEffect(() => {
    if (window) {
      document.documentElement.classList.add("dark");
    }
  }, [])
  return (
    <div className="bg-gray-200 ">
      <main className="container   min-h-screen  ">
        
        {/* <RssTest  /> */}
        <TailwindTemplate />

      </main>
    </div>
  );
} 
