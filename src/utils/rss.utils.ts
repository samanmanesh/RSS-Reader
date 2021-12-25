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

const generateId = (title: string, pubdate: Date) => {
  const fixedTitle = title.replaceAll(" ", "-").trim().toLowerCase();
  return `${fixedTitle}-${pubdate.getTime()}`;
};

const convertItemToArticle = (
  item: Element
): IArticle => {
  const article: IArticle = {
    feedName: "",
    id: "",
    guid: "",
    title: "",
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
  article.feedName = getRSSFeedName(article.guid);
  article.id = generateId(article.title, article.pubdate);

  return article;

  // const children: Element[] = Array.from(
  //   item.children
  // );

  // children.forEach((child: Element) => {
  //   const key = child.tagName.toLowerCase();
  //   const value = decodeString(
  //     parseCDATA(child.innerHTML)
  //   );
  //   article[key] = value;
  // });
};

export const validateRSSUrl = (url: string): boolean => {
  const rssRegex =
    /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
  if (rssRegex.test(url)) {
    return true;
  }
  return false;
};

export const getRSSFeed = async (url: string): Promise<IFeed> => {
  
    if (!validateRSSUrl(url)) {
      console.error("invalid url", url);
      return;
    }

    const feed: IFeed = {
      name: getRSSFeedName(url),
      link: url,
    }
    return feed;
  } 




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

    console.debug("items", items);
  const articles = Array.from(items).map(
    convertItemToArticle
  );
// console.debug("articles in rss.utils", articles);
  return articles;
};

export const getRSSFeedName = (
  url: string
) => {
  if (!validateRSSUrl(url)) {
    console.error("invalid url", url);
    return;
  }
  const match = url.match(
    /^(?:https?:)?(?:\/\/)?([^\/\?]+)/i
  );
  const hostname = match && match[1];
  return hostname;
};