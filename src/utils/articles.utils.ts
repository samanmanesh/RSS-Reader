export const sortArticles = (
  articles: IArticle[]
) => {
  const sortedArticles = articles.sort((a, b) => {
    return (
      a.pubdate.getTime() - b.pubdate.getTime()
    );
  });

  return sortedArticles.reverse();
};

export const removeDuplicateArticles = (
  articles: IArticle[]
) => {
  
  // remove duplicate articles
  const uniqueArticles = articles.filter(
    (article, index, self) =>
      index ===
      self.findIndex(
        (a) => a.guid === article.guid
      )
  );
return uniqueArticles;
  
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
