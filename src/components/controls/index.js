import { React, memo, useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import icon_config from "../../assets/icon_config.png";
import icon_list from "../../assets/icon_list.png";
import icon_in from "../../assets/icon_in.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";

import { faStar as full } from "@fortawesome/free-solid-svg-icons";

const Controls = () => {
  const [clicked, setIsClicked] = useState(localStorage.getItem("clicked") === "true");

  useEffect(() => {
    localStorage.setItem("clicked", clicked);
  }, [clicked]);

  const handleClick = () => {
    setIsClicked(!clicked);
  };


  
  const cn = bem("Controls");
  return (
    <nav className={cn("nav")}>
      <ul>
        <li>
          <img src={icon_in} alt="Icon login" />
        </li>
        <li>
          <img src={icon_list} alt="Icon list" />
        </li>
        <li>
          <img src={icon_config} alt="Icon settings" />
        </li>

        <li className={cn("list")} onClick={handleClick}>
          {clicked ? (
    
            <FontAwesomeIcon icon={full} style={{ color: "#0088ee" }} className={cn("icon-full")} />
          ) : (
            <FontAwesomeIcon icon={faStar} className={cn("icon-empty")} />
          )}
        </li>
      </ul>
    </nav>
  );
};

export default memo(Controls);
