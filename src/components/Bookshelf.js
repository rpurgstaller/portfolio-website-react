export default function Projects() {
  const style_book_container = {
    display: 'flex',
    height: '100vh',
    justifyContent: 'space-between',
  }
  const style_book_cols = {
    width: '50%',
    padding: '10px',
  }
  return (
    <div className="container bookshelf">
      <h1>Bookshelf</h1>
      <p>Here is a list of books I really enjoyed</p>
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