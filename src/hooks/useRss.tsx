import React from 'react'
import {atom, useRecoilState} from 'recoil'

interface Props {
  
}

const rssUrlState = atom({
  key: 'rssUrlState',
  default: '',
})

const rssArticleState = atom({
  key: 'rssArticleState',
  default: [],
})

export const useRss = (props: Props) => {
 
  // not sure about these but know need to be two atom for the state to manage the state
  // one for the url and keep track of the urls and one for the articles and keep track of the articles
  const [rssUrl, setRssUrl] = useRecoilState(rssUrlState);
  const [rssArticle, setRssArticle] = useRecoilState(rssArticleState);

  const addArticle = (article: IArticle) => {
    setRssArticle([...rssArticle, article]);
  }



 


  return (
  {

  }  
  )
}
