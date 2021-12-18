
import RssTest from "components/RssTest";
import { useEffect } from "react";


export default function Home() {

  useEffect(() => {
    if (window) {
      document.documentElement.classList.add("dark");
    }
  }, [])
  return (
    <div className="bg-gray-200 pt-12">
      <main className="container min-h-screen  ">
        <h1>Hi RSS </h1>
        <RssTest  />
      </main>
    </div>
  );
} 
