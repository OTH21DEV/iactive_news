import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import News from "./news";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<News />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
