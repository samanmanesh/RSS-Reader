import RssTest from "components/RssTest";
import { getRSSFeedName } from "utils/rss.utils";
import useArticles from "hooks/useArticles";
import Link from "next/link";
import FeedItem from "components/layout/FeedItem";

const bgColor = `bg-orange-300`;

export default function Home() {
  const { articles } = useArticles();

  const cssTricksRSS =
    "https://css-tricks.com/feed/";
  const joshRSS =
    "https://www.joshwcomeau.com/rss.xml";
  const mediumRSS =
    "https://medium.com/feed/@joshwcomeau";


  return (
    <div className="h-full pt-4 space-y-6">
      {articles.map((item) => {
        return <FeedItem item={item} />;
      })}
    </div>
  );
}
