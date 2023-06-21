import {createStore,combineReducers,applyMiddleware} from "redux"
import thunk from "redux-thunk"
import reducerSelect from "./select/reducer"

const rootReducer = combineReducers({
    select:reducerSelect
})

const store = createStore(rootReducer,applyMiddleware(thunk))

export default store