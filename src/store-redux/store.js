import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducerSelect from "./select/reducer";
import reducerFavorite from "./favorite/reducer";
import reducerListId from "./favoriteId/reducer";

const rootReducer = combineReducers({
  select: reducerSelect,
  favorite: reducerFavorite,
  favoriteId: reducerListId,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
