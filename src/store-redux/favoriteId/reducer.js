import { SET_LIST_ID } from "./type";

const initialState = {
    list: []
};

const reducerListId = (state = initialState, action) => {
  switch (action.type) {
    case SET_LIST_ID :
      return {
        ...state,
      list: action.payload ,
       
      };
    default:
      return state;
  }
};



  
 
export default reducerListId;