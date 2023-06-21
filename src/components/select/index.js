import { memo, useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import { useSelector, useDispatch } from "react-redux";
import { setSelect } from "../../store-redux/select/action";
// import "./style.css";

import React from "react";

const Select = ({ options, value, onSelect }) => {
  const state = useSelector((state) => state.select);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const value = e.target.value;

    dispatch(setSelect(value));
  };

  console.log(state);

  return (
    <select value={value} onChange={(e) => handleChange(e)}>
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
