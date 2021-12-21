import { atom, useRecoilState } from "recoil";

const articleState = atom({
  key: "articleState",
  default: [],
});

const feedsState = atom({
  key: "feeds",
  default: [],
})

interface IFeed {
  id: string;
  title: string;
  link: string;
  description: string;
  pubDate: Date;
  items: IArticle[];
}

const useArticles = () => {
  const [articles, setArticles] =
    useRecoilState<IArticle[]>(articleState);

  const [feeds, setFeed] = useRecoilState<IFeed[]>(feedsState);


  const addArticles = (newArticles: IArticle[]) => {
    if (!newArticles) {
      console.error('New articles are undefined');
      return;
    }
    setArticles((prev) => {
      const newArticlesNoDuplicates = newArticles.filter(
        (article) => !prev.some((prevArticle) => prevArticle.guid === article.guid)
      );
      return [...prev, ...newArticlesNoDuplicates];
    });
    //adding article to prev articles array
    // console.debug("articles", articles);
    // console.debug("articlesParams", articlesParams);

    // const newArticles = articles.slice();
    // const artPara = articlesParams.slice();
    //newArticles.push(artPara);
    // setArticles(newArticles);
    
 
    // console.debug("articles", articles);
      
  };

  const addFeed = (feed: IFeed) => {
    setFeed((prev) => [...prev, feed]);
  };

  const getFeed = () => {
    const sortedArticles = articles.sort(
      (a, b) => {
        return (
          a.pubdate.getTime() -
          b.pubdate.getTime()
        );
      }
    );

    return sortedArticles;
  };

  return {
    articles,
    addArticles,
    feeds,
    setFeed,
  };
};

export default useArticles;
