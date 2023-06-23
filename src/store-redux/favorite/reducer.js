import { SET_FAVORITE } from "./type";

const initialState = {
  data: [],
};

const reducerFavorite = (state = initialState, action) => {
  switch (action.type) {
    case SET_FAVORITE:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default reducerFavorite;
