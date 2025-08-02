import { Link } from "react-router-dom";

function PickEntry({ labels, name, url }) {
  let label =
    <div
      className="labels-column"
      style={{
        display: "flex",
        gap: "0.5rem",
        flexWrap: "wrap",
        minWidth: "150px",
      }}
    >
      {labels.map((label, index) => (
        <span
          key={index}
          style={{
            display: "inline-block",
            border: "1px solid lightgrey",
            borderRadius: "12px",
            padding: "4px 8px",
            fontSize: "0.85rem",
            backgroundColor: "#f9f9f9",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
      ))}
    </div>

  let content =
    <div className="name-column" style={{ minWidth: "300px" }}>
      {url ? (
        <a href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#0077cc" }}>
          {name}
        </a>
      ) : (
        <span>{name}</span>
      )}
    </div>


  let description =
    <div className="description-column" style={{ flexGrow: 1 }}>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
      dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
    </div>

  return (

    <div
      className="pick-entry-row"
      style={{
        display: "flex",
        gap: "1rem",
        marginBottom: "0.5rem",
        alignItems: "flex-start",
      }}
    >
      {label}{content}{description}
    </div>
  );
}


export default function Picks() {
  return (
    <div className="container picks">
    <PickEntry labels={["search-engine"]} name="DuckDuckGo" url="https://duckduckgo.com/" />
    <PickEntry labels={["browser"]} name="DuckDuckGo" url="" />
    <PickEntry labels={["browser", "work"]} name="Chrome" url="" />
    <PickEntry labels={["os"]} name="Ubuntu" url="" />
    <PickEntry labels={["os", "work"]} name="Windows" url="" />
    <PickEntry labels={["ide", "code-editor"]} name="VS Code" url="https://code.visualstudio.com/" />
    <PickEntry labels={["ide", "code-editor"]} name="PyCharm" url="https://www.jetbrains.com/pycharm/" />
    <PickEntry labels={["api-testing"]} name="Bruno" url="https://www.usebruno.com/" />
    <PickEntry labels={["ide", "database"]} name="pgAdmin" url="https://www.pgadmin.org/" />
    <PickEntry labels={["ide", "latex"]} name="TeXstudio" url="" />

    <PickEntry labels={["email", "calendar"]} name="Tuta" url="https://mail.tutanota.com/" />
    <PickEntry labels={["organization"]} name="Obsidian" url="https://obsidian.md/" />
    <PickEntry labels={["password-manager"]} name="KeePass" url="https://keepass.info/" />
    <PickEntry labels={["automation"]} name="Autohotkey" url="https://www.autohotkey.com/" />
    <PickEntry labels={["sync"]} name="Syncthing" url="https://syncthing.net/" />

    <PickEntry labels={["podcast"]} name="Darknet Diaries" url="https://darknetdiaries.com/" />
    <PickEntry labels={["podcast"]} name="Hardcore History Series - Dan Carlin" url="https://www.dancarlin.com/hardcore-history-series/" />
    <PickEntry labels={["podcast"]} name="NRD Info: Synapsen (german)" url="https://www.ndr.de/nachrichten/info/synapsen-ein-wissenschaftspodcast,podcast2994.html" />
    <PickEntry labels={["podcast"]} name="Brave new planet (?)" url="" />



      <h2>Engineering</h2>


      <ul>
        <li>
          Search Engine: <Link to="https://duckduckgo.com/">DuckDuckGo</Link>
        </li>
        <li>Browser: DuckDuckGo, Chrome for Work</li>
        <li>OS: Ubuntu (personal), Windows (work)</li>
        <li>
          IDE/Code Editor:{" "}
          <Link to="https://code.visualstudio.com/">VS Code</Link>,{" "}
          <Link to="https://www.jetbrains.com/pycharm/">PyCharm</Link>
        </li>
        <li>
          API Testing: <Link to="https://www.usebruno.com/">Bruno</Link>
        </li>
        <li>
          Database: <Link to="https://www.pgadmin.org/">pgAdmin</Link>
        </li>
        <li>Latex: TeXstudio</li>
      </ul>
      <h2>Organize and Manage my Life</h2>
      <ul>
        <li>
          Email and Calendar: <Link to="https://mail.tutanota.com/">Tuta</Link>
        </li>
        <li>
          <Link to="https://obsidian.md/">Obsidian</Link>
        </li>
        <li>
          <Link to="https://keepass.info/">KeePass</Link>
        </li>
        <li>
          <Link to="https://www.autohotkey.com/">Autohotkey</Link>
        </li>
        <li>
          <Link to="https://syncthing.net/">Syncthing</Link>
        </li>
      </ul>
      <h2>Podcasts</h2>
      <ul>
        <li>
          <Link to="https://darknetdiaries.com/">Darknet Diaries</Link>
        </li>
        <li>
          <Link to="https://www.dancarlin.com/hardcore-history-series/">Hardcore History Series - Dan Carlin</Link>
        </li>
        <li>
          <Link to="https://www.ndr.de/nachrichten/info/synapsen-ein-wissenschaftspodcast,podcast2994.html">NRD Info: Synapsen (german)</Link>
        </li>
        <li>
          Brave new planet (?)
        </li>
      </ul>
      checkout https://rusingh.com/uses/#primary-computer-development for
      additional stuff, also https://fediring.net/ also https://www.anh.ng/uses, best: https://www.jasonjun.dev/picks or
      https://jason-blog.netlify.app/about/ - eventually change to "picks" and include podcasts
    </div>
  );
}
