import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import Picks from "./components/Picks";
import Bookshelf from "./components/Bookshelf";
import Copyright from "./components/Copyright";

function App() {
  return (
    <Router basename="/portfolio-react">
      <div className="App app-layout">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/picks" element={<Picks />} />
          <Route path="/bookshelf" element={<Bookshelf />} />
        </Routes>
        <Copyright />
      </div>
    </Router>
  );
}

export default App;
