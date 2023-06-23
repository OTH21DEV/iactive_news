import React, { useEffect, memo, useState, useRef ,useCallback,useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getExtension from "../../utils/getExtension";
import { formatTime } from "../../utils/formatTime";
import user from "../../assets/user.svg";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import Head from "../../components/head";
import Controls from "../../components/controls";
import LayoutBtns from "../../components/layout-btn";
import { useSelector, useDispatch } from "react-redux";
import { setFavoriteNews } from "../../store-redux/favorite/action";
import { idGenerator } from "../../utils/idGenerator";
// import Controls from "../../components/controls";
// import uuid from "uuid";
import icon_config from "../../assets/icon_config.png";
import icon_list from "../../assets/icon_list.png";
import icon_in from "../../assets/icon_in.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";

import { faStar as full } from "@fortawesome/free-solid-svg-icons";
import { setListIdNews } from "../../store-redux/favoriteId/action";

function News({ list, children }) {
  const cn = bem("News");
  let navigate = useNavigate();

  const dispatch = useDispatch();

  const stateListId = useSelector((state) => state.favoriteId);
const stateList = useSelector((state) => state.favorite)
  console.log(stateList);

  const [expandedItems, setExpandedItems] = useState([]);

  //test
  const [favoriteListNews, setFavoriteListNews] = useState([]);

  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem("favorite");
    return storedData ? JSON.parse(storedData) : []
  });

  //test

  useEffect(() => {
    const storedData = localStorage.getItem("favorite");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorite", JSON.stringify(data));
  }, [data]);



  function handleClick(e, item) {
    const itemId = item.uuid;
    //Toggle favorite status of the clicked item
    if (data.includes(itemId)) {
      setData((prevData) => prevData.filter((id) => id !== itemId));

      // setFavoriteListNews((prevData) => prevData.filter((favoriteItem) => favoriteItem.uuid !== itemId));
      // setFavoriteListNews((prevData) => prevData ? prevData.filter((favoriteItem) => favoriteItem.uuid !== itemId) : [])
      setFavoriteListNews(prevData => Array.isArray(prevData) ? prevData.filter(favoriteItem => favoriteItem.uuid !== itemId) : []);
    } else {
      setData((prevData) => [...prevData, itemId]);
      setFavoriteListNews((prevData) => [...prevData, item ]);
      // setFavoriteListNews(prevData => {
      //   return prevData.concat(Object.assign({}, item));
      // });
      // setFavoriteListNews(prevData => Array.isArray(prevData) ? prevData.concat(Object.assign({}, item)) : [Object.assign({}, item)]);
    }
    // dispatch(setListIdNews(data));
    // dispatch(setFavoriteNews(favoriteListNews));

  }


useEffect(() => {
  if (data) {
    dispatch(setListIdNews(data));
  }

  if (favoriteListNews.length > 0) {
    dispatch(setFavoriteNews(favoriteListNews));
  }
}, [data, favoriteListNews, dispatch]);


  console.log(data)
  console.log(favoriteListNews)


  function handleExpand(index) {
    setExpandedItems((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
  }




  function handleNavigate() {
    navigate("/favorite");

  }

  return (
    <>
      {list?.map((item, index) => {
        // const isFavorite = data.includes(item.uuid);
        const isFavorite = stateListId.list.includes(item.uuid);
        
        const maxLength = 250;
        const contentOverMaxLength = item.content?.length > maxLength;
        const shortContent = contentOverMaxLength ? `${item.content.slice(0, maxLength)}...` : item.content;

        return (
        
          <div className={cn()} key={`${item.uuid}`}>
            <div className={cn("head-wrapper")}>
              <div className={cn("head")}>
                <img src={user} alt="User avatar" />
                <div>{item.author}</div>
              </div>
              <div className={cn("head-place")}>{children}</div>
              {/* <Controls id={item.uuid}></Controls> */}
              {/* Render favorite icon */}
              <nav className={cn("nav")}>
                <ul>
                  <li>
                    <img src={icon_in} alt="Icon login" />
                  </li>
                  <li>
                    <img src={icon_list} alt="Icon list" />
                  </li>{" "}
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
                        id={`favorite-icon-${item.uuid}`}
                      />
                    ) : (
                      <FontAwesomeIcon icon={faStar} className={cn("icon-empty")} id={`favorite-icon-${item.uuid}`} />
                    )}
                  </li>
                </ul>
              </nav>
            </div>

            <div className={cn("content")}>
              <span>{formatTime(item.date)}</span>
              <p className={cn("content-text")}>{expandedItems[index] ? item.content : shortContent}</p>
            </div>
            {contentOverMaxLength && !expandedItems[index] && (
              <p className={cn("content-expand")} onClick={() => handleExpand(index)}>
                Далее
              </p>
            )}

            <div className={cn("media")}>
              {item.attachments && (item.attachments[0]?.url.split(".")?.at(-1) === "jpeg" || item.attachments[0]?.url.split(".")?.at(-1) === "jpg") && (
                <img src={item.attachments[0]?.url} alt=""></img>
              )}
              {item.attachments && item.attachments[0]?.url.split(".")?.at(-1) === "mp4" && (
                <video controls>
                  <source src={item.attachments[0]?.url} type="video/mp4" />
                </video>
              )}
            </div>

            {/* Render "Add to favorites" button */}

            <p onClick={(e) => handleClick(e, item)} id={item.uuid}>
              Добавить в избранное
            </p>
          </div>
        );
      })}
    </>
  );
}

export default memo(News);
