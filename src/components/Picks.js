import { Link } from "react-router-dom";

export default function Projects() {
  return (
    <div className="container picks">
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
