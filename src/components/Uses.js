import { Link } from "react-router-dom";


export default function Projects() {
  return (
    <div className="container uses">
      <h1>Uses</h1>
      <h2>Engineering</h2>
      <ul>
        <li>Search Engine: <Link to="https://duckduckgo.com/">DuckDuckGo</Link></li>
        <li>Browser: DuckDuckGo, Chrome for Work</li>
        <li>OS: Ubuntu (personal), Windows (work)</li>
        <li>IDE/Code Editor: <Link to="https://code.visualstudio.com/">VS Code</Link>, <Link to="https://www.jetbrains.com/pycharm/">PyCharm</Link></li>
        <li>API Testing: <Link to="https://www.usebruno.com/">Bruno</Link></li>
        <li>Database: <Link to="https://www.pgadmin.org/">pgAdmin</Link></li>
        <li>Latex: TeXstudio</li>
      </ul>
      <h2>Organize and Manage my Life</h2>
      <ul>
        <li>Email and Calendar: <Link to="https://mail.tutanota.com/">Tuta</Link></li>
        <li><Link to="https://obsidian.md/">Obsidian</Link></li>
        <li><Link to="https://keepass.info/">KeePass</Link></li>
        <li><Link to="https://www.autohotkey.com/">Autohotkey</Link></li>
      </ul>

      checkout https://rusingh.com/uses/#primary-computer-development for additional stuff, also https://fediring.net/
    </div>
  );
}