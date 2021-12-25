
interface IArticle {
  feedName?: string;
  id: string;
  guid: string;
  title: string;
  pubdate: Date;
  link?: string;
  description?: string;
  content?: string;
  imageSrc?: string;
}

interface IFeed {
  name: string;
  link: string;
}