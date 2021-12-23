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
  const uniqueArticles = articles.filter(
    (article, index, self) =>
      index ===
      self.findIndex(
        (a) => a.guid === article.guid
      )
  );

  return uniqueArticles;
};
