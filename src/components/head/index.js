import React from "react";
import { memo } from "react";
// import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons'


const Head = ({ children }) => {
  const cn = bem("Head");

  return <div className={cn('place')}>{children}</div>;
};

export default memo(Head);
