import { useState, useEffect } from 'react';
import NewsState from '../../store/news';
import NewsContext from '../../context';

// Create a NewsProvider that uses the NewsState class for fetching news data

export function NewsProvider({ children }) {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const newsState = new NewsState();
    newsState.load().then(() => {
      setNewsData(newsState.getState().data);
      
    }).catch((error) => {
      console.error(error);
    });
  }, []);
  console.log(newsData)
  return (
    <NewsContext.Provider value={{ newsData }}>
      {children}
    </NewsContext.Provider>
  );
}