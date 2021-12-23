
interface IArticle {
  id: string;
  guid: string;
  title: string;
  pubdate: Date;
  link?: string;
  description?: string;
  content?: string;
}

interface IFeed {
  name: string;
  link: string;
}