import {ExternalLink, ExternalLinkRunningText} from "../utils/Link";

function PickEntry({ labels, name, url, desc_txt_elem }) {
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
      {desc_txt_elem}
    </div>

  return (
    <div className="content-table-row">
      {name_elem}{labels_elem}{description}
    </div>
  );
}


export default function Picks() {
  let desc_keepass =
    <span>
      KeePass has been my go-to password manager for years. I really appreciate its simplicity and local-first approach.
      Syncing between devices requires a bit of manual effort, but it works smoothly when combined with Syncthing.
    </span>

  let desc_vs_code =
    <span>
      VS Code has become my editor for... well, (almost) everything! It feels lightweight and intuitive to use,
      which makes it a great fit for most of my daily tasks. For larger projects, though, I currently prefer PyCharm.
    </span>

  let desc_pycharm =
    <span>
      I love using PyCharm with my current stack — Python, Angular, and PostgreSQL. This is where most of my daily programming happens.
      While I mostly prefer PyCharm for larger projects, I also started using it for side projects and smaller experiments.
    </span>

  let desc_bruno =
    <span>
      Best API client out there for me!
    </span>

  let desc_hn = <span></span>

  return (
    <div className="content-container">
    <PickEntry labels={["search-engine", "browser"]} name="DuckDuckGo" url="https://duckduckgo.com/" desc_txt_elem={desc_keepass} />
    <PickEntry labels={["ide", "development"]} name="VS Code" url="https://code.visualstudio.com/" desc_txt_elem={desc_vs_code} />
    <PickEntry labels={["ide", "development"]} name="PyCharm" url="https://www.jetbrains.com/pycharm/" desc_txt_elem={desc_pycharm} />
    <PickEntry labels={["api-testing", "development"]} name="Bruno" url="https://www.usebruno.com/" desc_txt_elem={desc_keepass} />
    <PickEntry labels={["ide", "database", "development"]} name="pgAdmin" url="https://www.pgadmin.org/" desc_txt_elem={desc_keepass} />
    <PickEntry labels={["ide", "latex", "development"]} name="TeXstudio" url="https://www.texstudio.org/" desc_txt_elem={desc_keepass} />

    <PickEntry labels={["email", "calendar"]} name="Tuta" url="https://mail.tutanota.com/" desc_txt_elem={desc_keepass} />
    <PickEntry labels={["organization"]} name="Obsidian" url="https://obsidian.md/" desc_txt_elem={desc_keepass} />
    <PickEntry labels={["password-manager"]} name="KeePass" url="https://keepass.info/" desc_txt_elem={desc_keepass} />
    <PickEntry labels={["automation"]} name="Autohotkey" url="https://www.autohotkey.com/" desc_txt_elem={desc_keepass} />
    <PickEntry labels={["sync"]} name="Syncthing" url="https://syncthing.net/" desc_txt_elem={desc_keepass} />

    <PickEntry labels={["news"]} name="Hacker News" url="https://news.ycombinator.com/" desc_txt_elem={desc_hn} />
    <PickEntry labels={["podcast"]} name="Darknet Diaries" url="https://darknetdiaries.com/" desc_txt_elem={desc_keepass} />
    <PickEntry labels={["podcast"]} name="Hardcore History Series" url="https://www.dancarlin.com/hardcore-history-series/" desc_txt_elem={desc_keepass} />
    <PickEntry labels={["podcast"]} name="NRD Info: Synapsen (german)" url="https://www.ndr.de/nachrichten/info/synapsen-ein-wissenschaftspodcast,podcast2994.html" desc_txt_elem={desc_keepass} />
    </div>
  );
}
