import {createStore,combineReducers,applyMiddleware} from "redux"
import thunk from "redux-thunk"
import reducerSelect from "./select/reducer"
import reducerFavorite from "./favorite/reducer"

const rootReducer = combineReducers({
    select:reducerSelect,
    favorite:reducerFavorite
})

const store = createStore(rootReducer,applyMiddleware(thunk))

export default store