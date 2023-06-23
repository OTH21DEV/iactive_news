import React from "react";
import { memo } from "react";
// import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const Head = ({ children }) => {
  const cn = bem("Head");
  return <div className={cn("place")}>{children}</div>;
};

export default memo(Head);
