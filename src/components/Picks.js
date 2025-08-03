import { Link } from "react-router-dom";

function PickEntry({ labels, name, url }) {
  let name_elem =
    <div className="name-column">
      {url ? (
        <Link to={url} target="_blank" rel="noopener noreferrer">{name}</Link>
      ) : (
        <span>{name}</span>
      )}
    </div>

  let labels_elem =
    <div className="labels-column">
      {labels.map((label, index) => (
        <span key={index}>{label}</span>
      ))}
    </div>


  let description =
    <div className="description-column">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
      dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
    </div>

  return (
    <div className="pick-entry-row">
      {name_elem}{labels_elem}{description}
    </div>
  );
}


export default function Picks() {
  return (
    <div className="picks-container">
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

      checkout https://rusingh.com/uses/#primary-computer-development for
      additional stuff, also https://fediring.net/ also https://www.anh.ng/uses, best: https://www.jasonjun.dev/picks or
      https://jason-blog.netlify.app/about/ - eventually change to "picks" and include podcasts
    </div>
  );
}
