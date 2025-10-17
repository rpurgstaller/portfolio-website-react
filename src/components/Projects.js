import { ExternalLink, ExternalLinkRunningText } from "../utils/Link";
import {FaGithub} from "react-icons/fa";
import React from "react";

function ProjectEntry({ name, desc_text_elem, url, labels = [] }) {
  let name_elem = (
    <div className="project-title-container">
      <h2>{name}</h2>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
      >
        <FaGithub className="svg-icon-small" />
      </a>
    </div>
  );

  let desc_elem = (
    <div className="project-description-container">{desc_text_elem}</div>
  );

  let labels_elem = (
    <div className="label-container">
      {labels.map((label, index) => (
        <span className="label" key={index}>{label}</span>
      ))}
    </div>
  );

  return (
    <div className="project-container">
      {name_elem}
      {labels_elem}
      {desc_elem}
    </div>
  );
}

export default function Projects() {
  let tweepy = ExternalLinkRunningText("https://www.tweepy.org/", "tweepy");
  let sarcasm_desc_elem = (
    <p>
      A sarcasm detector, oh, what a useful invention! For this project I used
      {" "} {tweepy} to access the twitter api and mine german tweets with the
      hashtags #sarcasm and #irony. I made this project a while after the
      european migrant crisis in 2015, hence I found a lot of tweets complaining
      about politicians and journalists. Unfortunately, I can hardly blame the
      dreadful results of this study on the European Union. Working on this
      project was a lot of fun and I got hooked on data analytics. You can read
      more about it in the paper on github.
    </p>
  );

  let fat_cats_desc_elem = (
    <p>
      I wanted a simple script to analyze my monthly expenses to better understand my spending habits.
      Using a basic rule engine, the script categorizes transactions into groups such as groceries, living, leisure, etc.
      Currently, it generates a bar plot of my expenses per category based on the rules I've defined.
    </p>
  );

  return (
    <div className="content-container project-list-container">
      <div>
        <h1 className="project-title">Selected projects</h1>
        <div className="project-list content-table">
          <ProjectEntry
            name="Fat Cats With Polars"
            desc_text_elem={fat_cats_desc_elem}
            labels={["python", "polars", "uv"]}
            url="https://github.com/rpurgstaller/fat-cats-with-polars"
          />
          <ProjectEntry
            name="Sarcasm Detection"
            desc_text_elem={sarcasm_desc_elem}
            labels={["python", "scikit-learn", "nltk"]}
            url="https://github.com/rpurgstaller/sarcasm-detector"
          />
        </div>
      </div>
    </div>
  );
}
