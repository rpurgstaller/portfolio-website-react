import { bookshelfData } from "./BookshelfData";

function BookshelfEntry({ name, author, labels }) {
  let title = (
    <div className="bookshelf-title-column">
      <span className="bookshelf-title">{name}</span>
      <span className="bookshelf-author"> - {author}</span>
    </div>
  );

  let labels_elem = (
    <div className="label-container">
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
      <h1>Books</h1>
      <div className="content-table">
        {bookshelfData.map((book, index) => (
          <BookshelfEntry
            key={index}
            name={book.name}
            author={book.author}
            labels={book.labels}
          />
        ))}
      </div>
    </div>
  );
}
