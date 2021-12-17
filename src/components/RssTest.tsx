import React, { useState } from "react";

interface Props {}

interface IArticle {
  title?: string;
  link?: string;
  pubDate?: string;
  description?: string;
  content?: string;
}

const podcastRSS =
  "https://feeds.acast.com/public/shows/5ea17537-f11f-4532-8202-294d976b9d5c";
const joshRSS =
  "https://www.joshwcomeau.com/rss.xml";
const RssTest = (props: Props) => {
  const [rssUrl, setRssUrl] = useState(joshRSS);
  const [items, setItems] = useState<IArticle[]>(
    []
  );

  const parseCDATA = (str: string) => {
    const regex = /<!\[CDATA\[(.*?)\]\]>/g;
    const matches = regex.exec(str);
    if (matches) {
      return matches[1];
    }
    return str;
  };

  const parseItem = (item: Element): IArticle => {
    const children: Element[] = Array.from(
      item.children
    );

    const article: IArticle = {};

    children.forEach((child: Element) => {
      const key = child.tagName.toLowerCase();
      const value = parseCDATA(child.innerHTML);
      article[key] = value;
    });

    return article;
  };

  const getRss = async (e) => {
    e.preventDefault();
    const urlRegex =
      /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
    if (!urlRegex.test(rssUrl)) {
      console.error("URL is not valid");
      return;
    }
    const res = await fetch(
      `https://api.allorigins.win/get?url=${rssUrl}`
    );
    const { contents } = await res.json();
    const feed =
      new window.DOMParser().parseFromString(
        contents,
        "text/xml"
      );
    const items = feed.querySelectorAll("item");
    const articles = Array.from(items).map(parseItem);
    
    // const feedItems = Array.from(items).map(
    //   (el) => ({
    //     title:
    //       parseCDATA(
    //         el.querySelector("title").innerHTML
    //       ) || "No title",
    //     link: parseCDATA(
    //       el.querySelector("link").innerHTML
    //     ),
    //     pubDate: parseCDATA(
    //       el.querySelector("pubDate").innerHTML
    //     ),
    //     description: parseCDATA(
    //       el.querySelector("description")
    //         .innerHTML
    //     ),
    //     content:
    //       parseCDATA(
    //         el.querySelector("content")?.innerHTML
    //       ) ?? "no content found",
    //   })
    // );
    // console.debug(
    //   "feedItems>>>",
    //   feedItems[0].content
    // );
    setItems(feedItems);

    setRssUrl("");
  };

  const inputHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRssUrl(e.target.value);
  };
  return (
    <div className="App">
      <form onSubmit={getRss}>
        <div>
          <label> rss url</label>
          <br />
          <input
            type="text"
            onChange={inputHandler}
            value={rssUrl}
            className=" mb-2 border-4 border-gray-400"
          />
        </div>
        <input type="submit" />
      </form>

      {items.map((item) => {
        return (
          <div
            className="bg-gray-100 p-2 rounded-sm mb-4"
            key={item.title}
          >
            <h1>{item.title}</h1>
            <article
              dangerouslySetInnerHTML={{
                __html: item.description,
              }}
            ></article>
            {/* <p>{item.author}</p> */}
            CONTENT:
            <article
              dangerouslySetInnerHTML={{
                __html: item.content,
              }}
              className="whitespace-pre-line"
            />
            {/* <a href={item.link}>{item.link}</a> */}
          </div>
        );
      })}
    </div>
  );
};

export default RssTest;
