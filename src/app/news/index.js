import React, { useEffect, useState } from "react";
import Head from "../../components/head";
import Controls from "../../components/controls";
import LayoutBtns from "../../components/layout-btn";
import PageLayout from "../../components/page-layout";
import SideLayout from "../../components/side-layout";
import NewsState from "../../store/news";
import NewsCard from "../../containers/news-card";
import { NewsProvider } from "../../providers/newsProvider/provider";

const News = () => {
  return (
    <PageLayout>
      <NewsProvider>
        <NewsCard />
      </NewsProvider>
    </PageLayout>
  );
};

export default News;
