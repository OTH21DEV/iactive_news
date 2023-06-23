import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import News from "./news";
import Favorite from "./favorite";
// import {persistor, store} from "../store-redux/store";
import store from "../store-redux/store";
  import { Provider } from "react-redux";
  // import { NewsProvider } from "../../providers/newsProvider/provider";


const App = () => {
  return (
    <>
       <Provider store={store}>
        
      <Router>
        <Routes>
          <Route path="/" element={<News />} />
          <Route path="/favorite" element={<Favorite/>} />
        </Routes>
      </Router>
      </Provider>
    </>
  );
};

export default App;
