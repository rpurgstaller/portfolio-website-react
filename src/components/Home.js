import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import silhouette from "./../images/silhouette.webP"

export default function Home() {
  return (
    <div className="content-container container-home">
      <div className="introduction-container">
        <div className="introduction-content">
          <p className="introduction-text">
            I'm Roman - a tech lead and product manager <br /> currently based
            in Graz, Austria.
          </p>
          <div className="social-icons-container">
            <a
              href="https://github.com/rpurgstaller"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub className="svg-icon" />
            </a>
            <a
              href="https://linkedin.com/in/roman-purgstaller-828b33229"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin className="svg-icon" />
            </a>
            <a href="mailto:mail@rpurgstaller.app">
              <MdEmail className="svg-icon" />
            </a>
          </div>
        </div>
      </div>
      <div className="silhouette-container">
        <div className="silhouette-img-container">
          <img
            src={silhouette}
            alt="silhouette"
            className="silhouette"
          />
        </div>
      </div>
    </div>
  );
}
