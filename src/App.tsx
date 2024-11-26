import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Page from "./pages";

import "./App.css";

function App() {
  return (
    <div style={{ padding: "40px" }}>
      <Router>
        <Routes>
          <Route path="/" element={<Page.Interaction />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
