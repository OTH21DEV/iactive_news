import { useState, useEffect,useRef } from "react";
import NewsState from "../../store/news";
import NewsContext from "../../context/newsContext/context";


export function NewsProvider({ children }) {
  const [newsData, setNewsData] = useState([]);
  const newsState = useRef(new NewsState()).current;

  useEffect(() => {
    // Add an observer to the newsState instance
    const handleNewsStateUpdate = () => {
      setNewsData(newsState.getState().data);
    };
    newsState.addObserver(handleNewsStateUpdate);

    // Load initial data and start timer
    newsState.load().catch((error) => {
      console.error(error);
    });

    // Clean up observer and stop timer on unmount
    return () => {
      newsState.removeObserver(handleNewsStateUpdate);
      newsState.stopTimer();
    };
  }, []);

  console.log(newsData);

  return <NewsContext.Provider value={{ newsData }}>{children}</NewsContext.Provider>;
}