import {createStore,combineReducers,applyMiddleware} from "redux"
import thunk from "redux-thunk"
import reducerSelect from "./select/reducer"
import reducerFavorite from "./favorite/reducer"
import reducerListId from "./favoriteId/reducer"


const rootReducer = combineReducers({
    select:reducerSelect,
    favorite:reducerFavorite,
    favoriteId:reducerListId
})

const store = createStore(rootReducer,applyMiddleware(thunk))

export default store

// import { createStore, combineReducers, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import { persistReducer, persistStore } from "redux-persist"; // <-- import these
// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// import reducerSelect from "./select/reducer";
// import reducerFavorite from "./favorite/reducer";
// import reducerListId from "./favoriteId/reducer";

// const rootReducer = combineReducers({
//   select: reducerSelect,
//   favorite: reducerFavorite,
//   favoriteId: reducerListId,
// });

// // 3. Define the persistConfig object that specifies the configuration for persistence.
// const persistConfig = {
//   key: "root",
//   storage,
// };

// // 4. Create a persisted reducer using the persistReducer function.
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // 5. Create the store using the persisted reducer.
// const store = createStore(persistedReducer, applyMiddleware(thunk));

// // 6. Create the persistor using the persistStore function.
// const persistor = persistStore(store);

// export {persistor, store };