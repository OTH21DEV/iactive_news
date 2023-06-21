import React, { useEffect, memo, useState, useRef } from "react";
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

function News({ list, children }) {
  const cn = bem("News");
  const [expandedItems, setExpandedItems] = useState([]);

  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem("favorite");

    if (storedData) {
      return JSON.parse(storedData);
    } else {
      return [];
    }
  });

  const state = useSelector((state) => state.favorite);
  const dispatch = useDispatch();

  console.log(state);

  function handleExpand(index) {
    setExpandedItems((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
  }

  function handleClick(e, item) {
    const itemId = item.id;

    // Toggle favorite status of the clicked item
    if (data.includes(itemId)) {
      setData((prevData) => prevData.filter((id) => id !== itemId));
    } else {
      setData((prevData) => [...prevData, itemId]);
    }
  }

  useEffect(() => {
    localStorage.setItem("favorite", JSON.stringify(data));
  }, [data]);

  return (
    <>
      {list.map((item, index) => {
        // console.log([...new Set(list.map(item => item.id))]);
        const isFavorite = data.includes(item.id);
        const maxLength = 250;
        const contentOverMaxLength = item.content.length > maxLength;
        const shortContent = contentOverMaxLength ? `${item.content.slice(0, maxLength)}...` : item.content;

        return (
          <div className={cn()} key={`${item.id}-${index}`}>
            <div className={cn("head-wrapper")}>
              <div className={cn("head")}>
                <img src={user} alt="User avatar" />
                <div>{item.author}</div>
              </div>
              <div className={cn("head-place")}>{children}</div>

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
                    {isFavorite ? <FontAwesomeIcon icon={full} style={{ color: "#0088ee" }} className={cn("icon-full")} /> : <FontAwesomeIcon icon={faStar} className={cn("icon-empty")} />}
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
            <p onClick={(e) => handleClick(e, item)} id={item.id}>
              Добавить в избранное
            </p>
          </div>
        );
      })}
    </>
  );
}
// function News({ list, children }) {
//   const cn = bem("News");
//   const [expandedItems, setExpandedItems] = useState([]);

//   const [id, setId] = useState();
//   // const [data,setData]=useState([])
//   const [data, setData] = useState([]);

//   const state = useSelector((state) => state.favorite);
//   const dispatch = useDispatch();

//   console.log(state);

//   function handleExpand(index) {
//     setExpandedItems((prevState) => {
//       const newState = [...prevState];
//       newState[index] = true;
//       return newState;
//     });
//   }

//   // const [click, setIsClicked] = useState(localStorage.getItem("click") === "true");

//   // useEffect(() => {
//   //   localStorage.setItem("click", click);
//   // }, [click]);

//   function handleClick(e, item,index) {
//     const value = e.currentTarget.id;

//     // Update the data array with previous values and the new one

//     // setData((prevData) => [...prevData, item]);

//     // setData((prevData) => [...prevData, value]);
//     // dispatch(setFavoriteNews(data));
//     // dispatch(setFavoriteNews(data));

//     //test

//     setIsClicked(!clicked);
//     const itemId = item.id;

//     // Toggle favorite status of the clicked item
//     if (data.includes(itemId)) {
//       setData((prevData) => prevData.filter(id => id !== itemId));
//     } else {
//       setData((prevData) => [...prevData, itemId]);
//     }
//   }
//   const [clicked, setIsClicked] = useState(localStorage.getItem("clicked") === "true");

//   useEffect(() => {
//     localStorage.setItem("clicked", clicked);
//   }, [clicked]);

//   return (
//     <>
//       {list.map((item, index) => {
//         const isFavorite = data.includes(item.id);
//         const maxLength = 250;
//         const contentOverMaxLength = item.content.length > maxLength;
//         const shortContent = contentOverMaxLength ? `${item.content.slice(0, maxLength)}...` : item.content;

//         return (
//           <div className={cn()} key={index}>
//             <div className={cn("head-wrapper")}>
//               <div className={cn("head")}>
//                 <img src={user} alt="User avatar" />
//                 <div>{item.author}</div>
//               </div>
//               <div className={cn("head-place")}>{children}</div>
//               {/* <Controls id={item.id} ></Controls> */}

//                <nav className={cn("nav")} key={item.id}>
//                 <ul>
//                   <li>
//                     <img src={icon_in} alt="Icon login" />
//                   </li>
//                   <li>
//                     <img src={icon_list} alt="Icon list" />
//                   </li>
//                   <li>
//                     <img src={icon_config} alt="Icon settings" />
//                   </li>
//                   <li className={cn("list")} id={id}>

//                     {clicked ? (
//                       <FontAwesomeIcon icon={full} style={{ color: "#0088ee" }} className={cn("icon-full")} />
//                     ) : (
//                       <FontAwesomeIcon icon={faStar} className={cn("icon-empty")} />
//                     )}
//                   </li>
//                 </ul>
//               </nav>

//             </div>
//             <div className={cn("content")}>
//               <span>{formatTime(item.date)}</span>
//               <p className={cn("content-text")}>{expandedItems[index] ? item.content : shortContent}</p>
//             </div>
//             {contentOverMaxLength && !expandedItems[index] && (
//               <p className={cn("content-expand")} onClick={() => handleExpand(index)}>
//                 Далее
//               </p>
//             )}

//             <div className={cn("media")}>
//               {item.attachments && (item.attachments[0]?.url.split(".")?.at(-1) === "jpeg" || item.attachments[0]?.url.split(".")?.at(-1) === "jpg") && (
//                 <img src={item.attachments[0]?.url} alt=""></img>
//               )}
//               {item.attachments && item.attachments[0]?.url.split(".")?.at(-1) === "mp4" && (
//                 <video controls>
//                   <source src={item.attachments[0]?.url} type="video/mp4" />
//                 </video>
//               )}
//             </div>
//             {/* <p onClick={(e) => handleClick(e,item)} id={`${index}`}> */}
//             <p onClick={(e) => handleClick(e, item)} id={item.id}>
//               Добавить в избранное
//             </p>
//           </div>
//         );
//       })}
//     </>
//   );
// }

export default memo(News);
