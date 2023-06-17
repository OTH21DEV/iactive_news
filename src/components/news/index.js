import React, { useEffect, memo } from "react";
import Head from "../head";
import Controls from "../controls";
import LayoutBtns from "../layout-btn";

import NewsState from "../../store/news";
import { useNews } from "../../context";


const News = ({ list }) => {

  // const { newsData } = useNews();

  // console.log( newsData);
  return <div></div>;
};

export default memo(News);
