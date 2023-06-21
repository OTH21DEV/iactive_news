import React, { useEffect, memo, useState, useRef } from "react";
import getExtension from "../../utils/getExtension";
import { formatTime } from "../../utils/formatTime";
import user from "../../assets/user.svg";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import Head from "../../components/head";
import Controls from "../../components/controls";
import LayoutBtns from "../../components/layout-btn";


function News({ list,children }) {
  const cn = bem("News");
  const [expandedItems, setExpandedItems] = useState([]);

  function handleExpand(index) {
    setExpandedItems((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
  }

  return (
    <>
      {list.map((item, index) => {
        const maxLength = 250;
        const contentOverMaxLength = item.content.length > maxLength;
        const shortContent = contentOverMaxLength ? `${item.content.slice(0, maxLength)}...` : item.content;

        return (
          <div className={cn()}key={index}>
            <div className={cn("head-wrapper")}>
            <div className={cn("head")}>
              <img src={user} alt="User avatar" />
              <div>{item.author}</div>
            </div>
            <div className={cn("head-place")}>{children}</div>
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
          </div>
        );
      })}
    </>
  );
}

export default memo(News);
