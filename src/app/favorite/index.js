import React, { useEffect, useState,memo } from "react";
import Head from "../../components/head";
import Controls from "../../components/controls";
import LayoutBtns from "../../components/layout-btn";
import PageLayout from "../../components/page-layout";
import SideLayout from "../../components/side-layout";
import NewsState from "../../store/news";
import NewsCard from "../../containers/news-card";
import { NewsProvider } from "../../providers/newsProvider/provider";
import News from "../../components/news";
import NewsFilter from "../../containers/news-filter";
import {persistor, store }from "../../store-redux/store";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { sortByNew, sortByOld } from "../../utils/filterList";
import { useNews } from "../../context/newsContext/context";

const Favorite = () => {
  const stateList = useSelector((state) => state.favorite);
  const state = useSelector((state) => state.select);
  const listId = useSelector((state) => state.favoriteId.list);
  const allStates = useSelector((state) => console.log(state));
  // console.log(stateList.data);

//   console.log(listId);
//  const { newsData } = useNews();

//   const list =[]

//   newsData?.forEach((item)=>{
//    if( listId.includes(item.uuid)){
// list.push(item)
//    }
//   })
//   console.log(newsData)
//   console.log(list)

  return (
    <PageLayout>
      {/* <Provider store={store}> */}
        <NewsProvider>
          <NewsFilter />
          {/* <NewsCard /> */}

          <News list={state.value === "newest" ? sortByNew(stateList?.data) : sortByOld(stateList?.data)}>
            <Head>
              <LayoutBtns title={"Левый"} />
              <LayoutBtns title={"Центр"} />
              <LayoutBtns title={"Правый"} />
              {/* <Controls /> */}
            </Head>
          </News>
        </NewsProvider>
      {/* </Provider> */}
    </PageLayout>
  );
};

export default memo(Favorite);
