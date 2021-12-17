import React, { useState } from "react";

interface Props {}
interface IItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  content: string;
}
const RssTest = (props: Props) => {
  const [inputUrl, setInputUrl] = useState("");
  const [rssUrl, setRssUrl] = useState("");
  const [items, setItems] = useState([]);

  const getRss = async (e) => {
    console.debug("get inside the getRss method");
    e.preventDefault();
    const urlRegex =
      /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
    if (!urlRegex.test(rssUrl)) {
      console.debug("url is not valid");
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
    console.debug("feed>>>", feed);
    const items = feed.querySelectorAll("item");
    console.debug("items>>>", items);
    // link: el.querySelector("link").innerHTML,
    // author: el.querySelector("author").innerHTML

    //@ts-ignore
    const feedItems = [...items].map((el) => ({
      title: el.querySelector("title").innerHTML,
      __html: el.querySelector("description")
        .innerHTML,
    }));
    setItems(feedItems);

    console.debug("check2>>>", feedItems);
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
          />
        </div>
        <input type="submit" />
      </form>
      asdfasdf
      
      {items.map((item) => {
        return (
          <div
            className="bg-gray-100 p-2 rounded-sm mb-4"
            key={item.title}
          >
            <h1>{item.title}</h1>
            {/* <p>{item.author}</p> */}
            <p dangerouslySetInnerHTML={item} />
            {/* <a href={item.link}>{item.link}</a> */}
          </div>
        );
      })}
    </div>
  );
};

export default RssTest;