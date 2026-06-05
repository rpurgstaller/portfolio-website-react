import { useEffect, useRef, useState } from "react";
import cytoscape from "cytoscape";
import { FaTable, FaNetworkWired } from "react-icons/fa";
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
  const [view, setView] = useState("table");
  const cyRef = useRef(null);
  const graphContainerRef = useRef(null);

  useEffect(() => {
    if (view !== "network") {
      return;
    }

    if (!graphContainerRef.current) {
      return;
    }

    if (cyRef.current) {
      cyRef.current.destroy();
      cyRef.current = null;
    }

    const labelNodes = new Map();
    const elements = [];

    bookshelfData.forEach((book, index) => {
      const bookId = `book-${index}`;
      elements.push({
        data: { id: bookId, label: book.name, type: "book" },
        classes: "book-node",
      });

      book.labels.forEach((label) => {
        const labelId = `label-${label.toLowerCase().replace(/\s+/g, "-")}`;
        if (!labelNodes.has(labelId)) {
          labelNodes.set(labelId, label);
          elements.push({
            data: { id: labelId, label, type: "label" },
            classes: "label-node",
          });
        }

        elements.push({
          data: { id: `${bookId}-${labelId}`, source: bookId, target: labelId },
        });
      });
    });

    const cy = cytoscape({
      container: graphContainerRef.current,
      elements,
      style: [
        {
          selector: "node",
          style: {
            label: "data(label)",
            textValign: "center",
            textHalign: "center",
            textWrap: "wrap",
            textMaxWidth: 120,
            color: "#111",
            fontSize: 12,
            backgroundColor: "#f8f9fa",
            borderWidth: 2,
            borderColor: "#9aa0a6",
            width: "label",
            padding: "12px",
          },
        },
        {
          selector: "node[type='book']",
          style: {
            shape: "roundrectangle",
            backgroundColor: "#ffffff",
            borderColor: "#333",
          },
        },
        {
          selector: "node[type='label']",
          style: {
            shape: "roundrectangle",
            backgroundColor: "#f9f9f9",
            borderColor: "lightgrey",
            borderWidth: 1,
            color: "#111",
            fontSize: 11,
            textWrap: "wrap",
            textMaxWidth: 140,
            textValign: "center",
            textHalign: "center",
            padding: "8px",
          },
        },
        {
          selector: "edge",
          style: {
            width: 2,
            lineColor: "#b8c1cc",
            curveStyle: "bezier",
            targetArrowShape: "none",
          },
        },
      ],
      layout: {
        name: "cose",
        animate: true,
        idealEdgeLength: 60,
        nodeRepulsion: 400000,
        nodeSpacing: 80,
        componentSpacing: 90,
        gravity: 0.25,
      },
    });

    cyRef.current = cy;

    const resizeObserver = new ResizeObserver(() => {
      cy.resize();
      cy.fit();
    });

    resizeObserver.observe(graphContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      if (cyRef.current) {
        cyRef.current.destroy();
        cyRef.current = null;
      }
    };
  }, [view]);

  return (
    <div className="content-container bookshelf-page">
      <div className="bookshelf-view-header">
        <h1>Books</h1>
        <div className="bookshelf-view-toggle">
          <button
            type="button"
            className={view === "table" ? "active" : ""}
            onClick={() => setView("table")}
          >
            <FaTable /> Table view
          </button>
          <button
            type="button"
            className={view === "network" ? "active" : ""}
            onClick={() => setView("network")}
          >
            <FaNetworkWired /> Network view
          </button>
        </div>
      </div>

      {view === "table" ? (
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
      ) : (
        <div className="bookshelf-graph-wrapper">
          <div ref={graphContainerRef} className="bookshelf-graph-container" />
        </div>
      )}
    </div>
  );
}
