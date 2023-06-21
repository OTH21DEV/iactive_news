import { SET_FAVORITE} from "./type";

const initialState = {
    data: []
};

const reducerFavorite = (state = initialState, action) => {
  switch (action.type) {
    case SET_FAVORITE:
      return {
        ...state,
       data: action.payload = [...new Set(action.payload)],
       
      };
    default:
      return state;
  }
};


  
//   const reducerFavorite = (state = initialState, action) => {
//     switch (action.type) {
//       case SET_FAVORITE:
//         const  id  = action.payload;
//         console.log(id)
//         const favoriteNews = [...state.favoriteNews];
//         console.log(favoriteNews)
//         const index = favoriteNews.indexOf(id);
//         if (index >= 0) {
//           favoriteNews.splice(index, 1);
//         } else {
//           favoriteNews.push(id);
//         }
//         return { ...state, favoriteNews };
//       default:
//         return state;
//     }
//   };
  

  
 
export default reducerFavorite;
