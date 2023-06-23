import React, { memo } from "react";
import { NewsProvider } from "../../providers/newsProvider/provider";
import PageLayout from "../../components/page-layout";
import NewsCard from "../../containers/news-card";
import NewsFilter from "../../containers/news-filter";

const Favorite = () => {
  return (
    <PageLayout>
      <NewsProvider>
        <NewsFilter />
        <NewsCard />
      </NewsProvider>
    </PageLayout>
  );
};

export default memo(Favorite);
