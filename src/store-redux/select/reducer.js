import { SET_SELECT_VALUE } from "./type";

const initialState = {
  value: "oldest",
};

const reducerSelect = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECT_VALUE:
      return {
        ...state,
        value: action.payload,
      };
    default:
      return state;
  }
};

export default reducerSelect;
