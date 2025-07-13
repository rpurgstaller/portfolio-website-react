import React from 'react';
import {FaGithub, FaLinkedin, FaStackOverflow} from "react-icons/fa";
import {FaHackerrank} from "react-icons/fa";

export default function Home() {
  return (
    <div className="container home">
      <h1>Roman Purgstaller</h1>
      <h3>Tech Lead | Product Manager</h3>
      <h3>currently based in Graz, Austria</h3>
      <div>
        <FaGithub className="svg-icon"/>
        <FaHackerrank className="svg-icon"/>
        <FaStackOverflow className="svg-icon"/>
        <FaLinkedin className="svg-icon"/>
      </div>
    </div>
  );
}
