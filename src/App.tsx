import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Page from "./pages";
// import Layout from "./layout";

import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div style={{ padding: "40px" }}>
      <Router>
        <Routes>
          <Route path="/" element={<Page.Avatar />}></Route>
          <Route path="/quiz" element={<Page.Quiz />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
