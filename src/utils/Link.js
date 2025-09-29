import { TfiArrowTopRight } from "react-icons/tfi";
import { Link } from "react-router-dom";

export function ExternalLink(url, text) {
  return (
    <Link
      to={url}
      target="_blank"
      rel="noopener noreferrer"
      className="link-border link-external"
    >
      {text} <TfiArrowTopRight className="external-hover-icon" />
    </Link>
  );
}

export function ExternalLinkRunningText(url, text) {
  return (
    <Link
      to={url}
      target="_blank"
      rel="noopener noreferrer"
      className="link-inline"
    >
      {text}
    </Link>
  );
}
