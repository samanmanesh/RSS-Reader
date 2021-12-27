import { v4 as uuidv4 } from "uuid";

const decodeString = (str: string) => {
  str = str.replace(/&lt;/g, "<");
  str = str.replace(/&gt;/g, ">");
  str = str.replace(/&amp;/g, "&");
  return str;
};

const parseCDATA = (str: string) => {
  const regex = /<!\[CDATA\[(.*?)\]\]>/g;
  const matches = regex.exec(str);

  if (matches) {
    //console.info("matches", matches);
    return matches[1];
  }
  //console.error("did not match", str);
  return str;
};

const generateId = (
  title: string,
  pubdate: Date
) => {
  const fixedTitle = title
    .replaceAll(" ", "-")
    .trim()
    .toLowerCase();
  return `${fixedTitle}-${pubdate.getTime()}`;
};

const getImageInContent = (
  content: string
): string => {
  const documentXML =
    new window.DOMParser().parseFromString(
      content,
      "text/html"
    );

  const image = documentXML.querySelector("img");

  if (image) {
    return image.getAttribute("src");
  }

  return "";
};

const convertItemToArticle = (
  item: Element
): IArticle => {
  const article: IArticle = {
    feedName: "",
    id: "",
    guid: "",
    title: "",
    imageSrc: "",
    pubdate: new Date(),
  };

  for (const child of item.children) {
    const key = child.tagName.toLowerCase();

    let value: string | Date = decodeString(
      parseCDATA(child.innerHTML)
    );

    if (key === "pubdate") {
      value = new Date(value);
    }

    article[key] = value;
  }
  // console.debug(">>", item.innerHTML);

  article.imageSrc = getImageInContent(
    article["content:encoded"]
  );

  //? feed name here is differnet with feedname in feed
  article.feedName = getRSSFeedName(article.guid);
  console.debug(">>", article.guid);
  article.id = generateId(
    article.title,
    article.pubdate
  );

  return article;
};

export const validateRSSUrl = (
  url: string
): boolean => {
  const rssRegex =
    /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
  if (rssRegex.test(url)) {
    return true;
  }
  return false;
};

export const getRSSFeed = async (
  url: string
): Promise<IFeed> => {
  if (!validateRSSUrl(url)) {
    console.error("invalid url", url);
    return;
  }

  //! first get GUID from article then
  //!get the name from guid and then assign
  //! it to name in IFeed makes a unique name to search and filter data

  const guid = await getGUID(url);

  const feed: IFeed = {
    name: getRSSFeedName(guid),
    link: url,
  };
  return feed;
};

const getGUID = async (url: string) => {
  const feedArticles = await getRSSFeedData(url);

  return feedArticles[0].guid;
};

export const getRSSFeedData = async (
  url: string
): Promise<IArticle[] | undefined> => {
  if (!validateRSSUrl(url)) {
    console.error("Invalid URL");
    return;
  }

  const res = await fetch(
    `https://api.allorigins.win/get?url=${url}`
  );

  const { contents } = await res.json();

  const documentXML =
    new window.DOMParser().parseFromString(
      contents,
      "text/xml"
    );

  const items =
    documentXML.querySelectorAll("item");

  const articles = Array.from(items).map(
    convertItemToArticle
  );

  return articles;
};

export const getRSSFeedName = (url: string) => {
  if (!validateRSSUrl(url)) {
    console.error("invalid url", url);
    return;
  }
  const match = url.match(
    /^(?:https?:)?(?:\/\/)?([^\/\?]+)/
  );

  const hostname = match && match[1];
  return hostname;
};
