import { atom, useRecoilState } from "recoil";
import useLocalStorage from "hooks/useLocalStorage";
import { useEffect } from "react";
import { getRSSFeedData } from "utils/rss.utils";

const articleState = atom({
  key: "articleState",
  default: [],
});

const feedsState = atom({
  key: "feeds",
  default: [],
})

interface IFeed {
  name: string;
  link: string;
}


const useArticles = () => {
  const [articles, setArticles] =
    useRecoilState<IArticle[]>(articleState);
  const [feeds, setFeeds] = useRecoilState<IFeed[]>(feedsState);
  const [localFeeds, setLocalFeeds] = useLocalStorage<IFeed[]>("feeds")

  useEffect(() => {
    if (localFeeds) {
      setFeeds(localFeeds);
    }
      }, []) 

      useEffect( () => {
        // if (feeds.length > 0) {
          
        //   const feed = feeds[0];
        //   const url = feed.link;
        //   const results = await getRSSFeedData(url);
        //   addArticles( results);
        // }
        showArticles();
      }, [feeds]);


      const showArticles = async () =>
      {
        if (feeds.length > 0) {
          feeds.forEach(async (feed) => {
            const url = feed.link;
            const results = await getRSSFeedData(url);
            addArticles(results);
          });
        }
      }
      //         )
      //     const feed = feeds[0];
      //     const url = feed.link;
      //     const results = await getRSSFeedData(url);
      //     addArticles( results);

      //   }
      // }

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
    setFeeds((prev) => [...prev, feed]);
    setLocalFeeds([...feeds, feed]); //! why we add feed to feeds here as it already added feeds in global state?
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
    addFeed,
    localFeeds,
  };
};

export default useArticles;
