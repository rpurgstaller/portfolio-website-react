import React from "react";
import {FaGithub, FaLinkedin, FaStackOverflow} from "react-icons/fa";
import { FaHackerrank } from "react-icons/fa";
import {MdEmail} from "react-icons/md";


export default function Home() {
  return (
    <div className="container home">
      <p className="introduction-text">
        I'm a tech lead and product manager <br /> currently based in Graz, Austria.
      </p>
      <div className="social-icons-container">
        <a href="https://github.com/rpurgstaller" target="_blank" rel="noreferrer"><FaGithub className="svg-icon"/></a>
        <a href="https://hackerrank.com/romanpurgstaller" target="_blank" rel="noreferrer"><FaHackerrank className="svg-icon" /></a>
        <a href="https://stackoverflow.com/users/1618893/roman-purgstaller?tab=profile" target="_blank" rel="noreferrer"><FaStackOverflow className="svg-icon"/></a>
        <a href="https://linkedin.com/in/roman-purgstaller-828b33229" target="_blank" rel="noreferrer"><FaLinkedin className="svg-icon" /></a>
        <a href="mailto:roman.purgstaller@tuta.com"><MdEmail className="svg-icon" /></a>
      </div>
    </div>
  );
}
