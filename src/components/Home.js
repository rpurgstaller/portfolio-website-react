import React from "react";
import {FaGithub, FaLinkedin, FaStackOverflow} from "react-icons/fa";
import { FaHackerrank } from "react-icons/fa";
import {MdEmail} from "react-icons/md";


export default function Home() {
  return (
    <div className="content-container container-home">
      <div className="introduction-container">
        <div className="introduction-content">
          <p className="introduction-text">
            I'm Roman - a tech lead and product manager <br /> currently based in Graz, Austria.
          </p>
          <div className="social-icons-container">
            <a href="https://github.com/rpurgstaller" target="_blank" rel="noreferrer"><FaGithub className="svg-icon"/></a>
            <a href="https://hackerrank.com/romanpurgstaller" target="_blank" rel="noreferrer"><FaHackerrank className="svg-icon" /></a>
            <a href="https://stackoverflow.com/users/1618893/roman-purgstaller?tab=profile" target="_blank" rel="noreferrer"><FaStackOverflow className="svg-icon"/></a>
            <a href="https://linkedin.com/in/roman-purgstaller-828b33229" target="_blank" rel="noreferrer"><FaLinkedin className="svg-icon" /></a>
            <a href="mailto:roman.purgstaller@tuta.com"><MdEmail className="svg-icon" /></a>
          </div>
        </div>
      </div>
      <div className="silhouette-container">
        <div className="social-icons-container-mobile">
          <a href="https://github.com/rpurgstaller" target="_blank" rel="noreferrer"><FaGithub className="svg-icon"/></a>
          <a href="https://hackerrank.com/romanpurgstaller" target="_blank" rel="noreferrer"><FaHackerrank className="svg-icon" /></a>
          <a href="https://stackoverflow.com/users/1618893/roman-purgstaller?tab=profile" target="_blank" rel="noreferrer"><FaStackOverflow className="svg-icon"/></a>
          <a href="https://linkedin.com/in/roman-purgstaller-828b33229" target="_blank" rel="noreferrer"><FaLinkedin className="svg-icon" /></a>
          <a href="mailto:roman.purgstaller@tuta.com"><MdEmail className="svg-icon" /></a>
        </div>
        <div className="silhouette-img-container">
          <img src={"/silhouette.webP"} alt="silhouette" className="silhouette"/>
        </div>
      </div>
    </div>
  );
}
