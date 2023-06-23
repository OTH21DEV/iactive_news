import React, { memo } from "react";
import { useNews } from "../../context/newsContext/context";
import { useSelector } from "react-redux";
import { sortByNew, sortByOld } from "../../utils/filterList";
import Head from "../../components/head";
import LayoutBtns from "../../components/layout-btn";
import News from "../../components/news";

const NewsCard = () => {
  //Initial news from context
  const { newsData } = useNews();
  //State from redux-store for select and list of favorite news
  const stateSelect = useSelector((state) => state.select);
  const stateFavoriteNews = useSelector((state) => state.favorite);
  const pathName = window.location.pathname.split("/")[1];

  return (
    <>
      {/* Render the list depending on pathName :all items for news page and favorite news in favorite page*/}
      <News list={stateSelect.value === "newest" ? sortByNew(pathName !== "favorite" ? newsData : stateFavoriteNews.data) : sortByOld(pathName !== "favorite" ? newsData : stateFavoriteNews.data)}>
        <Head>
          <LayoutBtns title={"Левый"} />
          <LayoutBtns title={"Центр"} />
          <LayoutBtns title={"Правый"} />
          {/* <Controls stateListId ={stateListId.list}/> */}
        </Head>
      </News>
    </>
  );
};
export default memo(NewsCard);
