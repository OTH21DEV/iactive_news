import React, { useEffect, memo, useState, useContext } from "react";
import Head from "../../components/head";
import Controls from "../../components/controls";
import LayoutBtns from "../../components/layout-btn";

import News from "../../components/news";
import { useNews } from "../../context/newsContext/context";
import NewsState from "../../store/news";
// import selectState from "../../store/select";
// import SelectContext from "../../context/selectContext/context"

import { useSelector, useDispatch } from "react-redux";
import { sortByNew, sortByOld } from "../../utils/filterList";

const NewsCard = () => {
  const { newsData } = useNews();

  const state = useSelector((state) => state.select);

  return (
    <>
      <News list={state.value === "newest" ? sortByNew(newsData) : sortByOld(newsData)}>
        <Head>
          <LayoutBtns title={"Левый"} />
          <LayoutBtns title={"Центр"} />
          <LayoutBtns title={"Правый"} />
          {/* <Controls /> */}
        </Head>
      </News>
    </>
  );
};
export default memo(NewsCard);
