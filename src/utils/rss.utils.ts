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

const convertItemToArticle = (
  item: Element
): IArticle => {
  const article: IArticle = {
    id: uuidv4(),
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

const validateRSSUrl = (url: string): boolean => {
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
    const match = url.match(/^(?:https?:)?(?:\/\/)?([^\/\?]+)/i);
    const hostname = match && match[1];

    const feed: IFeed = {
      name: hostname,
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

  const articles = Array.from(items).map(
    convertItemToArticle
  );

  return articles;
};
