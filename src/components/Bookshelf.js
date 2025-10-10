import { ExternalLink } from "../utils/Link";

function BookshelfEntry({ name, author, labels }) {
  let title = (
    <div className="bookshelf-title-column">
      <span className="bookshelf-title">{name}</span>
      <span className="bookshelf-author"> - {author}</span>
    </div>
  );

  let labels_elem = (
    <div className="bookshelf-labels-column">
      {labels.map((label, index) => (
        <span key={index}>{label}</span>
      ))}
    </div>
  );

  return (
    <div className="content-table-row">
      {title}
      {labels_elem}
    </div>
  );
}

export default function Bookshelf() {
  return (
    <div className="content-container">
      <div className="content-intro">
        This is a list of my favorite books
      </div>
      <div className="content-table">
        <BookshelfEntry
          name="The Pragmatic Programmer"
          author="Andrew Hunt, David Thomas"
          labels={["non-fiction", "software development"]}
        />
        <BookshelfEntry
          name="Designing Data-Intensive Applications"
          author="Martin Kleppmann"
          labels={["non-fiction", "data engineering"]}
        />
        <BookshelfEntry
          name="The Manager's Path"
          author="Camille Fournier"
          labels={["non-fiction", "management"]}
        />
        <BookshelfEntry
          name="A Thousand Brains"
          author="Jeff Hawkins"
          labels={["non-fiction", "neuroscience"]}
        />
        <BookshelfEntry
          name="Algorithms for Decision Making"
          author="Mykel J. Kochenderfer, Tim A. Wheeler, Kyle H. Wray"
          labels={["non-fiction", "algorithms"]}
        />
        <BookshelfEntry
          name="The Infinite Game"
          author="Simon Sinek"
          labels={["non-fiction", "business"]}
        />
        <BookshelfEntry
          name="Thinking, Fast and Slow"
          author="Daniel Kahneman"
          labels={["non-fiction", "psychology"]}
        />
        <BookshelfEntry
          name="Getting to Yes"
          author="Roger Fisher, William Ury, Bruce Patton"
          labels={["non-fiction", "negotiation"]}
        />
        <BookshelfEntry
          name="Remembrance of Earth's Past series"
          author="Cixin Liu"
          labels={["fiction", "science-fiction"]}
        />
        <BookshelfEntry
          name="Project Hail Mary"
          author="Andy Weir"
          labels={["fiction", "science-fiction"]}
        />
        <BookshelfEntry
          name="Die Schachnovelle"
          author="Stefan Zweig"
          labels={["fiction", "novella"]}
        />
        <BookshelfEntry
          name="A Wild Sheep Chase"
          author="Haruki Murakami"
          labels={["fiction", "novel"]}
        />
        <BookshelfEntry
          name="To Kill a Mockingbird"
          author="Harper Lee"
          labels={["fiction", "novel"]}
        />
        <BookshelfEntry
          name="The Left Hand of Darkness"
          author="Ursula K. Le Guin"
          labels={["fiction", "science-fiction"]}
        />
      </div>
    </div>
  );
}
