export default function Projects() {
  const style_book_container = {
    display: "flex",
    height: "100vh",
    justifyContent: "space-between",
  };
  const style_book_cols = {
    width: "50%",
    padding: "10px",
  };
  return (
    <div className="container bookshelf">
      <h1>Bookshelf</h1>
      <p>Here is a list of books I really enjoyed</p>
      Non-Fiction:
      <ul>
        <li>The pragmatic programmer</li>
        <li>Designing Data-Intensive Applications</li>
        <li>The managers path</li>
        <li>A Thousand Brains</li>
        <li>Algorithm for decision making</li>
        <li>The infinite Game</li>
        <li>Thinking, Fast and Slow</li>
        <li>Getting to Yes</li>
      </ul>
      Fiction:
      <ul>
        <li>Remembrance of Earth's Past series</li>
        <li>Project Hail Mary</li>
        <li>Die Schachnovelle (german)</li>
        <li>A Wild Sheep Chase</li>
        <li>To Kill a Mockingbird</li>
        <li>The Left Hand of Darkness</li>
      </ul>
      <div style={style_book_container}>
        <div style={style_book_cols}>
          <h2>Fiction</h2>
          <div className="book-list">
            <div className="book-card">
              <h3>Atomic Habits</h3>
              <p>by James Clear</p>
              <p>A guide to building good habits and breaking bad ones.</p>
            </div>
          </div>
        </div>
        <div style={style_book_cols}>
          <h3>Non-Fiction</h3>
          <div className="book-list">
            <div className="book-card">
              <h2>Atomic Habits</h2>
              <p>by James Clear</p>
              <p>A guide to building good habits and breaking bad ones.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
