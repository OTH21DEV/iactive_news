import { SET_LIST_ID } from "./type";

const setListId = (list) => {
    return {
      type: SET_LIST_ID,
      payload: list,
    };
  };
  
  export const setListIdNews = (list) => {
    return (dispatch) => {
  
      dispatch(setListId(list));
    };
  };
  