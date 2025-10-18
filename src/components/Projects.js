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
  let sarcasm_detector_github = "https://github.com/rpurgstaller/sarcasm-detector"
  let link_sarcasm_github = ExternalLinkRunningText(sarcasm_detector_github, "github");
  let sarcasm_desc_elem = (
    <p>
      A sarcasm detector, oh, what a useful invention! For this project I used
      {" "} {tweepy} to access the twitter api and mine german tweets with the
      hashtags #sarcasm and #irony. I made this project a while after the
      european migrant crisis in 2015, hence I found a lot of tweets complaining
      about politicians and journalists. Unfortunately, I can hardly blame the
      dreadful results of this study on the European Union. Working on this
      project was a lot of fun though, and I got hooked on data analytics. You can read
      more about it in the paper on {" "} {link_sarcasm_github}.
    </p>
  );

  let fat_cats_desc_elem = (
    <p>
      I wanted a simple script to analyze my monthly expenses to better understand my spending habits.
      Using a basic rule engine, the script categorizes transactions into groups such as groceries, living, leisure, etc.
      Currently, it simply generates a bar plot of my expenses per category based on the rules I've defined.
    </p>
  );

  let python_angular_desc_elem = (
    <p>
      A simple web app built with Angular, Flask, and Neo4j. The app supports user registration, form validation and a admin user panel.
      I wanted to improve my full-stack development skills and dive into graph databases. I really enjoyed working with cypher
      and would love to do another project with neo4j in the future.
    </p>
  );

  let monthly_exp_desc_elem = (
    <p>

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
            labels={["python", "polars", "plotly"]}
            url="https://github.com/rpurgstaller/fat-cats-with-polars"
          />
          <ProjectEntry
            name="Monthly Expense Analyzer"
            desc_text_elem={monthly_exp_desc_elem}
            labels={["python", "pandas", "plotly", "sqlite3"]}
            url="https://github.com/rpurgstaller/monthly-expenses"
          />
          <ProjectEntry
            name="Full Stack CRUD Application with Angular, Python Flask and Neo4j"
            desc_text_elem={python_angular_desc_elem}
            labels={["python", "angular", "flask", "neo4j", "py2neo"]}
            url="https://github.com/rpurgstaller/angular-login-and-signup"
          />
          <ProjectEntry
            name="Sarcasm Detection"
            desc_text_elem={sarcasm_desc_elem}
            labels={["python", "scikit-learn", "nltk"]}
            url={sarcasm_detector_github}
          />
        </div>
      </div>
    </div>
  );
}
