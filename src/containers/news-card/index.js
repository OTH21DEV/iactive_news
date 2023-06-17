import React, { useEffect, memo } from "react";
import Head from "../../components/head";
import Controls from "../../components/controls";
import LayoutBtns from "../../components/layout-btn";



import News from "../../components/news";
import { useNews } from "../../context";

const NewsCard = () => {
    // hook useNews to access the NewsContext data
    const { newsData } = useNews();

    console.log( newsData);
  return (
    <>
      <Head>
        <LayoutBtns title={"Левый"} />
        <LayoutBtns title={"Центр"} />
        <LayoutBtns title={"Правый"} />
        <Controls />
      </Head>
      <News />
    </>
  );
};

export default memo(NewsCard);


