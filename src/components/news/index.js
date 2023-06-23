import React, { useEffect, memo, useState } from "react";
import { formatTime } from "../../utils/formatTime";
import { cn as bem } from "@bem-react/classname";
import { useDispatch } from "react-redux";
import { setFavoriteNews } from "../../store-redux/favorite/action";
import { setListIdNews } from "../../store-redux/favoriteId/action";
import user from "../../assets/user.svg";
import Controls from "../../components/controls";
import "./style.css";

function News({ list, children }) {
  const cn = bem("News");

  const dispatch = useDispatch();

  //Text expand
  const [expandedItems, setExpandedItems] = useState([]);
  //List of favorite news {}
  const [favoriteListNews, setFavoriteListNews] = useState([]);
  //List of favorite news Id
  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem("favorite");
    return storedData ? JSON.parse(storedData) : [];
  });

  useEffect(() => {
    const storedData = localStorage.getItem("favorite");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorite", JSON.stringify(data));
  }, [data]);

  //Toggle favorite status of the clicked item
  function handleClick(e, item) {
    const itemId = item.uuid;
    if (data.includes(itemId)) {
      setData((prevData) => prevData.filter((id) => id !== itemId));

      setFavoriteListNews((prevData) => prevData.filter((favoriteItem) => favoriteItem.uuid !== itemId));
    } else {
      setData((prevData) => [...prevData, itemId]);
      setFavoriteListNews((prevData) => [...prevData, item]);
    }
  }

  useEffect(() => {
    if (data) {
      dispatch(setListIdNews(data));
    }

    if (favoriteListNews.length > 0) {
      dispatch(setFavoriteNews(favoriteListNews));
    }
  }, [data, favoriteListNews, dispatch]);

  console.log(data);
  console.log(favoriteListNews);

  function handleExpand(index) {
    setExpandedItems((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
  }

  let pathName = window.location.pathname.split("/")[1];

  return (
    <>
      {list?.map((item, index) => {
        const maxLength = 250;
        const contentOverMaxLength = item.content?.length > maxLength;
        const shortContent = contentOverMaxLength ? `${item.content.slice(0, maxLength)}...` : item.content;

        return (
          <div className={`${cn()} fade-in`} key={`${item.uuid}`} style={{ animationDelay: `${index * 0.1}s` }}>
            {/* Render "Head" */}
            <div className={cn("head-wrapper")}>
              <div className={cn("head")}>
                <img src={user} alt="User avatar" />
                <div>{item.author}</div>
              </div>
              <div className={cn("favorite")}>
                <div className={cn("head-place")}>{children}</div>
                {/* Render favorite icon */}
                {pathName !== "favorite" && <Controls id={item.uuid}></Controls>}
              </div>
            </div>
            {/* Render "Text expand" */}
            <div className={cn("content")}>
              <span>{formatTime(item.date)}</span>
              <p className={cn("content-text")}>{expandedItems[index] ? item.content : shortContent}</p>
            </div>
            {contentOverMaxLength && !expandedItems[index] && (
              <p className={cn("content-expand")} onClick={() => handleExpand(index)}>
                Далее
              </p>
            )}
            {/* Render "Media" */}
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
            {pathName !== "favorite" && (
              <button
                onClick={(e) => {
                  handleClick(e, item);
                  e.currentTarget.classList.toggle("News-btn-favorite-active");
                }}
                id={item.uuid}
                className={cn("btn-favorite")}
              >
                Добавить в избранное
              </button>
            )}
          </div>
        );
      })}
    </>
  );
}

export default memo(News);
