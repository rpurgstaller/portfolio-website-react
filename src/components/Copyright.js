import React from "react";
import { TfiArrowUp } from "react-icons/tfi";

const ScrollToTopText = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <p className="back-to-top-txt" onClick={scrollToTop}>
      <TfiArrowUp /> Back to Top
    </p>
  );
};

export default function Copyright() {
  return (
    <div className="copyright-container">
      <div className="copyright-txt">
        <p>© Roman Purgstaller</p>
      </div>
      <div className="copyright-btn">
        <ScrollToTopText />
      </div>
    </div>
  );
}
