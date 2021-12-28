import RssTest from "components/RssTest";
import { getRSSFeedName } from "utils/rss.utils";
import useArticles from "hooks/useArticles";
import ArticleList from "components/layout/ArticleList";

const bgColor = `bg-orange-300`;

export default function Home() {
  const { searchResults } = useArticles();

  const cssTricksRSS =
    "https://css-tricks.com/feed/";
  const joshRSS =
    "https://www.joshwcomeau.com/rss.xml";
  const mediumRSS =
    "https://medium.com/feed/@joshwcomeau";
  const NewYorkTimesRSS = "https://rss.nytimes.com/services/xml/rss/nyt/World.xml"; 


  return (
    <ArticleList articles={searchResults} /> 
  );
}
