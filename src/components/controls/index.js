import { React, memo} from "react";
import { cn as bem } from "@bem-react/classname";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as full } from "@fortawesome/free-solid-svg-icons";
import { useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import icon_config from "../../assets/icon_config.png";
import icon_list from "../../assets/icon_list.png";
import icon_in from "../../assets/icon_in.png";
import "./style.css";
// import PropTypes from "prop-types";


const Controls = ({ id}) => {

  const stateListId = useSelector((state) => state.favoriteId);
  const isFavorite = stateListId.list.includes(id);
  let navigate = useNavigate();
  
  function handleNavigate() {
    navigate("/favorite");
  }

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

        <li className={cn("list")}>
          {isFavorite ? (
            <FontAwesomeIcon
              icon={full}
              style={{ color: "#0088ee" }}
              className={cn("icon-full")}
              onClick={(e) => {
                handleNavigate();
              }}
              id={`favorite-icon-${id}`}
            />
          ) : (
            <FontAwesomeIcon icon={faStar} className={cn("icon-empty")} id={`favorite-icon-${id}`} />
          )}
        </li>
      </ul>
    </nav>
  );
};

export default memo(Controls);
