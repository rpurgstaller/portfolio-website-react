import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import Picks from "./components/Picks";
import Bookshelf from "./components/Bookshelf";
import Copyright from "./components/Copyright";
import Practices from "./components/Practices";
import Radar from "./components/Radar";
import RadarQuadrant from "./components/RadarQuadrant";
import Layout from "./Layout";

function App() {
  return (
    <Router>
      <div className="App app-layout">
        <Header />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/picks" element={<Picks />} />
              <Route path="/radar" element={<Radar />} />
              <Route path="/radar/techniques" element={<RadarQuadrant quadrantIdx={0} />} />
              <Route path="/radar/tools" element={<RadarQuadrant quadrantIdx={1} />} />
              <Route path="/radar/resources" element={<RadarQuadrant quadrantIdx={2} />} />
              <Route path="/radar/languages-frameworks" element={<RadarQuadrant quadrantIdx={3} />} />
              <Route path="/bookshelf" element={<Bookshelf />} />
              <Route path="/practices" element={<Practices/>} />
            </Routes>
          </Layout>
        <Copyright />
      </div>
    </Router>
  );
}

export default App;
