export const sortArticles = (
  articles: IArticle[]
) => {
  const sortedArticles = articles.sort((a, b) => {
    return (
      a.pubdate.getTime() - b.pubdate.getTime()
    );
  });

  return sortedArticles;
};

export const removeDuplicateArticles = (
  articles: IArticle[]
) => {
  
  console.debug("Arrticles",articles);
  
  // remove duplicate articles





  // const uniqueArticles = articles.filter(
  //   (article, index, self) =>
  //     index ===
  //     articles.findIndex(
  //       (a) => a.guid === article.guid
  //     )
  // );
return articles;
  
};

// setArticles((prev) => {
//   const newArticlesNoDuplicates =
//     newArticles.filter(
//       (article) => !prev.some(
//           (prevArticle) =>
//             prevArticle.guid === article.guid
//         )
//     );
//   return [
//     ...prev,
//     ...newArticlesNoDuplicates,
//   ];
