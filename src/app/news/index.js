import React,{memo} from "react";
import PageLayout from "../../components/page-layout";
import NewsCard from "../../containers/news-card";
import { NewsProvider } from "../../providers/newsProvider/provider";
import NewsFilter from "../../containers/news-filter";

const News = () => {
  return (
    <PageLayout>
      <NewsProvider>
        <NewsFilter />
        <NewsCard />
      </NewsProvider>
    </PageLayout>
  );
};

export default memo(News);
