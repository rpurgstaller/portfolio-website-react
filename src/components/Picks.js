import {ExternalLink, ExternalLinkRunningText} from "../utils/Link";

// ExternalLink elements matched to RadarData entries
const link_vs_code = ExternalLink("https://code.visualstudio.com/", "VS Code");
const link_pycharm = ExternalLink("https://www.jetbrains.com/pycharm/", "PyCharm");
const link_bruno = ExternalLink("https://www.usebruno.com/", "Bruno");
const link_pgadmin = ExternalLink("https://www.pgadmin.org/", "pgAdmin");
const link_tuta = ExternalLink("https://mail.tutanota.com/", "Tuta");
const link_obsidian = ExternalLink("https://obsidian.md/", "Obsidian");
const link_keepass = ExternalLink("https://keepass.info/", "KeePass");
const link_autohotkey = ExternalLink("https://www.autohotkey.com/", "Autohotkey");
const link_syncthing = ExternalLink("https://syncthing.net/", "Syncthing");
const link_stackoverflow_podcast = ExternalLink("https://stackoverflow.blog/podcast/", "The Stack Overflow Podcast");
const link_pragmatic_engineer = ExternalLink("https://www.pragmaticengineer.com/", "The Pragmatic Engineer");
const link_darknet_diaries = ExternalLink("https://darknetdiaries.com/", "Darknet Diaries");

function PickEntry({ labels, name, url, desc_txt_elem }) {
  let name_elem = (
    <div className="picks-name-column">
      {url ? ExternalLink(url, name) : <span>{name}</span>}
    </div>
  );

  let labels_elem = (
    <div className="label-container picks-label-column">
      {labels.map((label, index) => (
        <span key={index}>{label}</span>
      ))}
    </div>
  );

  let description = (
    <div className="picks-description-column">{desc_txt_elem}</div>
  );

  return (
    <div className="content-table-row">
      {name_elem}
      {labels_elem}
      {description}
    </div>
  );
}

export default function Picks() {
  let link_autokey = ExternalLinkRunningText("https://github.com/autokey/autokey", "autokey");

  let desc_keepass = (
    <span>
      My go-to password manager for years. I prefer KeePass's local-first
      approach. Syncing between devices requires a bit of manual effort, but it
      works smoothly when combined with Syncthing.
    </span>
  );

  let desc_vs_code = (
    <span>
      I use VS Code for most of my daily tasks. For larger projects, though, I
      currently prefer PyCharm.
    </span>
  );

  let desc_pycharm = (
    <span>
      I use PyCharm mostly with my current stack — Python, Angular, and
      PostgreSQL. While I mostly prefer PyCharm for larger projects, I also
      started using it for side projects and smaller experiments.
    </span>
  );

  let bruno_desc = (
    <span>Really cool and lightweight API client. I especially like Bruno because it's Git native. </span>
  );

  let pg_admin_desc = (
    <span>
      While I write most of my queries in PyCharm, I prefer using pgAdmin for
      more complex queries and for analyzing execution plans.
    </span>
  );

  let desc_tutanota = (
    <span>
      I think the focus on privacy and security is really cool. Even though the product is still in its early
      stages, it mostly works for what I need.
    </span>
  );

  let desc_obsidian = (
    <span>
      I use Obsidian for note-taking and organizing my personal life. The way I use obsidian is inspired by the zettelkasten method
      as well as some of the methods and philosophies behind {" "}
      {ExternalLinkRunningText(
        "https://github.com/bramses/bramses-highly-opinionated-vault-2023",
        "bramses highly opinionated vault"
      )}.
    </span>
 );

  let desc_autohotkey = (
    <span>
      Since I use a US keyboard layout, I rely on AutoHotkey primarily for typing German umlauts (ä, ö, ü, ß) on Windows.
      On my personal Linux PC, I use {" "} {link_autokey} for the same purpose.
    </span>
  );

  let desc_syncthing = (
    <span>
      I use Syncthing to sync files between my devices. It's a cool alternative to cloud-services, especially for
      sensitive data like my KeePass database.
    </span>
  );

  let desc_darknet_diaries = (
    <span>
      Darknet Diaries covers topics like hacking, cybercrime, and internet privacy.
      I really like the storytelling style and thriller-like atmosphere of the episodes.
    </span>
  );

  let stack_overflow_podcast_desc = (
    <span>
      I really enjoy listening to the Stack Overflow Podcast from time to time. I've learned a punch of interesting stuff
      about software engineering, especially about team culture and leadership.
    </span>
  );

  let link_seg = ExternalLinkRunningText("https://www.engguidebook.com/", "Software Engineer's Guidebook");

  let desc_pragmatic_engineer = (
    <span>
      The Pragmatic Engineer is a really cool podcast about software engineering, leadership, and career development.
      I also enjoyed the {link_seg} by Gergely Orosz.
    </span>
  );

  return (
    <div className="content-container">
      <h1>
        Picks
      </h1>
      <div className="content-table">
        <PickEntry
          labels={["ide", "development"]}
          name="VS Code"
          url="https://code.visualstudio.com/"
          desc_txt_elem={desc_vs_code}
        />
        <PickEntry
          labels={["ide", "development"]}
          name="PyCharm"
          url="https://www.jetbrains.com/pycharm/"
          desc_txt_elem={desc_pycharm}
        />
        <PickEntry
          labels={["api-testing", "development"]}
          name="Bruno"
          url="https://www.usebruno.com/"
          desc_txt_elem={bruno_desc}
        />
        <PickEntry
          labels={["ide", "database", "development"]}
          name="pgAdmin"
          url="https://www.pgadmin.org/"
          desc_txt_elem={pg_admin_desc}
        />
        <PickEntry
          labels={["email", "calendar"]}
          name="Tuta"
          url="https://mail.tutanota.com/"
          desc_txt_elem={desc_tutanota}
        />
        <PickEntry
          labels={["organization"]}
          name="Obsidian"
          url="https://obsidian.md/"
          desc_txt_elem={desc_obsidian}
        />
        <PickEntry
          labels={["password-manager"]}
          name="KeePass"
          url="https://keepass.info/"
          desc_txt_elem={desc_keepass}
        />
        <PickEntry
          labels={["automation"]}
          name="Autohotkey"
          url="https://www.autohotkey.com/"
          desc_txt_elem={desc_autohotkey}
        />
        <PickEntry
          labels={["sync"]}
          name="Syncthing"
          url="https://syncthing.net/"
          desc_txt_elem={desc_syncthing}
        />
        <PickEntry
          labels={["podcast", "software-engineering"]}
          name="The Stack Overflow Podcast"
          url="https://stackoverflow.blog/podcast/"
          desc_txt_elem={stack_overflow_podcast_desc}
        />
        <PickEntry
          labels={["podcast", "software-engineering"]}
          name="The Pragmatic Engineer"
          url="https://www.pragmaticengineer.com/"
          desc_txt_elem={desc_pragmatic_engineer}
        />
        <PickEntry
          labels={["podcast", "security", "privacy"]}
          name="Darknet Diaries"
          url="https://darknetdiaries.com/"
          desc_txt_elem={desc_darknet_diaries}
        />
      </div>
    </div>
  );
}
