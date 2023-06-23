import { memo, useState, useMemo } from "react";
// import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import Select from "../../components/select";

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
// Update the state with the selected value
  const handleSelect = (value) => {
    setSelectedOption(value); 
  };
  return <Select options={options.sort} value={selectedOption} onSelect={handleSelect}></Select>;
};

export default memo(NewsFilter);
