import { SET_FAVORITE } from "./type";

const setFavorite = (data) => {
  return {
    type: SET_FAVORITE,
    payload: data,
  };
};

export const setFavoriteNews = (data) => {
  return (dispatch) => {

    dispatch(setFavorite(data));
  };
};
