import { SET_SELECT_VALUE } from "./type";

const setSelectOption = (value) => {
  return {
    type: SET_SELECT_VALUE,
    payload: value,
  };
};

export const setSelect = (value) => {
  return (dispatch) => {
    localStorage.setItem("selectValue", value);
    dispatch(setSelectOption(value));
  };
};
