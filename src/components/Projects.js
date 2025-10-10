import { ExternalLink, ExternalLinkRunningText } from "../utils/Link";

function ProjectEntry({ name, desc_text_elem, url, labels = [] }) {
  let name_elem = (
    <div className="project-name-column">
      {url ? ExternalLink(url, name) : <span>{name}</span>}
    </div>
  );

  let desc_elem = (
    <div className="project-description-column">{desc_text_elem}</div>
  );

  let labels_elem = (
    <div className="project-labels-column">
      {labels.map((label, index) => (
        <span key={index}>{label}</span>
      ))}
    </div>
  );

  return (
    <div className="content-table-row">
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
      A sarcasm detector, oh, what a useful invention! For this project I used{" "}
      {tweepy} to access the twitter api and mine german tweets with the
      hashtags #sarcasm and #irony. I made this project a while after the
      european migrant crisis in 2015, hence I found a lot of tweets complaining
      about politicians and journalists. Unfortunately, I can hardly blame the
      dreadful results of this study on the European Union. Working on this
      project was a lot of fun and I got hooked on data analytics. You can read
      more about it in the paper on github.
    </p>
  );

  return (
    <div className="content-container">
      <div className="content-intro">
        Selected projects I've worked on
      </div>
      <div className="project-list content-table">
        <ProjectEntry
          name="Sarcasm Detection"
          desc_text_elem={sarcasm_desc_elem}
          labels={["python", "scikit-learn", "nltk"]}
          url="https://github.com/rpurgstaller/sarcasm-detector"
        />
      </div>
    </div>
  );
}
