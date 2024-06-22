import React, { useState, useEffect, useRef } from "react";
import { Container } from "reactstrap";
import "styles/PageHeader.css"; // Adjust the path as needed

export default function PageHeader() {
  const words = ["Artist", "UI Designer", "DevOps"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    // Calculate the width of the longest word
    const longestWord = words.reduce((a, b) => (a.length > b.length ? a : b));
    const span = document.createElement("span");
    span.style.visibility = "hidden";
    span.style.whiteSpace = "nowrap";
    span.style.fontSize = "inherit"; // Ensure font size matches
    span.style.fontWeight = "inherit"; // Ensure font weight matches
    span.innerHTML = longestWord;
    document.body.appendChild(span);
    const width = span.getBoundingClientRect().width + 100;
    document.body.removeChild(span);
    setContainerWidth(width);
  }, [words]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 1000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [words.length]);

  return (
    <div className="page-header header-filter">
      <div className="squares square1" />
      <div className="squares square2" />
      <div className="squares square3" />
      <div className="squares square4" />
      <div className="squares square5" />
      <div className="squares square6" />
      <div className="squares square7" />
      <Container>
        <div className="content-center brand">
          <h1 className="h1-seo">MaltixAI</h1>
          <h3 className="d-none d-sm-block">
            A Workplace to make you become
          </h3>
          <h3 className="d-none d-sm-block rolling-container">
            <span
              className="animated-word-container"
              ref={containerRef}
              style={{ width: `${containerWidth}px` }}
            >
              <span className="animated-word">{words[currentWordIndex]}</span>
            </span>
          </h3>
        </div>
      </Container>
    </div>
  );
}