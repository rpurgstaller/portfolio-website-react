import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/app.scss";
import "./styles/header.scss";
import "./styles/home.scss";
import "./styles/picks.scss";
import "./styles/bookshelf.scss";
import "./styles/projects.scss";
import "./styles/about.scss";
import "./styles/copyright.scss";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
