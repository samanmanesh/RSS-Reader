import RssTest from "components/RssTest";
import Sidebar from "components/layout/navigation/Sidebar";
import TailwindTemplate from "components/TailwindTemplate";
import { useEffect, useState } from "react";
import Modal from "components/layout/Modal";
import useModal from "../hooks/useModal";
import { getRSSFeed } from "utils/rss.utils";
import useArticles from "hooks/useArticles";

export default function Home() {
  const { showModal, openModal, closeModal } =
    useModal();
  const { articles, addArticles } = useArticles();
  useEffect(() => {
    if (window) {
      document.documentElement.classList.add(
        "dark"
      );
    }
  }, []);

  const cssTricksRSS =
  "https://css-tricks.com/feed/";
  const joshRSS =
    "https://www.joshwcomeau.com/rss.xml";

  const [rssUrl, setRssUrl] = useState(cssTricksRSS);

  const inputHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRssUrl(e.target.value);
  };

  const handleGetFeed = async (e) => {
    e.preventDefault();
    console.debug("handleGetFeed >>");
    const results = await getRSSFeed(rssUrl);
    console.debug("handleGetFeed <<", results);
    addArticles(results);
    setRssUrl("");
  };

  console.debug('index', articles)

  return (
    <div className="h-full">
      {/* <RssTest /> */}
      {/* <TailwindTemplate  /> */}
      {/* <Sidebar  /> */}
  
      {/* <button onClick={openModal}>
        show modal
      </button> */}
      {
        articles.map(article => (
          <div key={article.guid}>{article.guid}</div>
        ))
      }
      <Modal
        title="hello"
        onClose={closeModal}
        onSubmit={closeModal}
        show={showModal}
      >
        <form onSubmit={handleGetFeed}>
          <div className="flex flex-col space-y-5 justify-items-center">
            <label> Type Your RSS URL </label>

            <input
              type="text"
              onChange={inputHandler}
              value={rssUrl}
              className=" mb-2 border-4 border-gray-400"
            />
            <input
              type="submit"
              className="p-3 m-6 border-solid border-2 border-black"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
