import {ExternalLinkRunningText} from "../utils/Link";

export default function Projects() {
  let tweepy = ExternalLinkRunningText("https://www.tweepy.org/", "tweepy");
  return (
    <div className="container projects">
      <div className="project-list">
        <div className="project-card">
          <h3>Sarcasm Detection</h3>
          <p>
            A sarcasm detector, oh, what a useful invention! For this project I used {tweepy} to access the
            twitter api and mine german tweets with the hashtags #sarcasm and #irony. I made this project a while
            after the european migrant crisis in 2015, hence I found a lot of tweets complaining about politicians and
            journalists. Unfortunately, I can hardly blame the dreadful results of this study on the European Union.
            Working on this project was a lot of fun and I got hooked on data analytics.
            You can read more about it in the paper on the github repo.
          </p>
        </div>
      </div>
    </div>
  );
}
