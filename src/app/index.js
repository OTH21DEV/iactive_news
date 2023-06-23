import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import React from "react";
import News from "./news";
import Favorite from "./favorite";
import store from "../store-redux/store";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<News />} />
            <Route path="/favorite" element={<Favorite />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
};

export default App;
