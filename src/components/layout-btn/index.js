import { React, memo } from "react";
// import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const LayoutBtn = ({ title }) => {
  const cn = bem("LayoutBtn");
  return (
    <div className={cn("container")}>
      <div className={cn("category action")}>
        <label>
          <input type="checkbox" />
          <span>{title}</span>
        </label>
      </div>
    </div>
  );
};

export default memo(LayoutBtn);
