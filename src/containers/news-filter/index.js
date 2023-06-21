import { memo, useState, useMemo, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import Select from "../../components/select";
// import "./style.css";

import { useNews } from "../../context/newsContext/context";
import NewsState from "../../store/news";

const NewsFilter = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const options = {
    sort: useMemo(
      () => [
        {
          value: "select",
          title: "Показать",
        },
        {
          value: "newest",
          title: "Сначала новые",
        },
        {
          value: "oldest",
          title: "Сначала старые",
        },
      ],

      []
    ),
  };

  const handleSelect = (value) => {
    setSelectedOption(value); // Update the state with the selected value
  };
  return <Select options={options.sort} value={selectedOption} onSelect={handleSelect}  ></Select>;
};

export default memo(NewsFilter);
