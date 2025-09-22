import { ExternalLink } from "../utils/Link";

function PickEntry({ labels, name, url }) {
  let name_elem =
    <div className="picks-name-column">
      {url ? (
        ExternalLink(url, name)
      ) : (
        <span>{name}</span>
      )}
    </div>

  let labels_elem =
    <div className="picks-labels-column">
      {labels.map((label, index) => (
        <span key={index}>{label}</span>
      ))}
    </div>


  let description =
    <div className="picks-description-column">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
      dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
    </div>

  return (
    <div className="content-table-row">
      {name_elem}{labels_elem}{description}
    </div>
  );
}


export default function Picks() {
  return (
    <div className="content-container">
    <PickEntry labels={["search-engine", "browser"]} name="DuckDuckGo" url="https://duckduckgo.com/" />
    <PickEntry labels={["browser"]} name="Firefox" url="https://www.firefox.com/" />
    <PickEntry labels={["os"]} name="Ubuntu" url="" />
    <PickEntry labels={["ide", "development"]} name="VS Code" url="https://code.visualstudio.com/" />
    <PickEntry labels={["ide", "development"]} name="PyCharm" url="https://www.jetbrains.com/pycharm/" />
    <PickEntry labels={["api-testing", "development"]} name="Bruno" url="https://www.usebruno.com/" />
    <PickEntry labels={["ide", "database", "development"]} name="pgAdmin" url="https://www.pgadmin.org/" />
    <PickEntry labels={["ide", "latex", "development"]} name="TeXstudio" url="https://www.texstudio.org/" />

    <PickEntry labels={["email", "calendar"]} name="Tuta" url="https://mail.tutanota.com/" />
    <PickEntry labels={["organization"]} name="Obsidian" url="https://obsidian.md/" />
    <PickEntry labels={["password-manager"]} name="KeePass" url="https://keepass.info/" />
    <PickEntry labels={["automation"]} name="Autohotkey" url="https://www.autohotkey.com/" />
    <PickEntry labels={["sync"]} name="Syncthing" url="https://syncthing.net/" />

    <PickEntry labels={["podcast"]} name="Darknet Diaries" url="https://darknetdiaries.com/" />
    <PickEntry labels={["podcast"]} name="Hardcore History Series" url="https://www.dancarlin.com/hardcore-history-series/" />
    <PickEntry labels={["podcast"]} name="NRD Info: Synapsen (german)" url="https://www.ndr.de/nachrichten/info/synapsen-ein-wissenschaftspodcast,podcast2994.html" />
    </div>
  );
}
