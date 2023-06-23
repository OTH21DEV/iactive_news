import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import { useDispatch } from "react-redux";
import { setSelect } from "../../store-redux/select/action";
// import PropTypes from "prop-types";
import "./style.css";

import React from "react";

const Select = ({ options, value }) => {
  const cn = bem("Select");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const value = e.target.value;
    dispatch(setSelect(value));
  };

  return (
    <select className={cn()} value={value} onChange={(e) => handleChange(e)}>
      {options.map((item) => {
        return (
          <option key={item.value} value={item.value}>
            {item.title}
          </option>
        );
      })}
    </select>
  );
};
export default memo(Select);
