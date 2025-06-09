import React, { useState } from "react";
import "./theatre.css"; // CSS in separate file (or use inline styles)

const panels = [
  { id: 1, image: "/theatre3.jpg" },
  { id: 2, image: "/theatre2.jpg" },
  { id: 3, image: "/theatre5.jpg" },
  { id: 4, image: "/theatre4.jpg" },
];

const Theatre = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="theatre">
      <h1 className="theatre-title">The FILMED FOR IMAX® Collection</h1>
      <div className="panels-container">
        {panels.map((panel, index) => (
          <div
            key={panel.id}
            className={`panel ${
              hovered === index ? "hovered" : hovered !== null ? "shrunk" : ""
            }`}
            style={{ backgroundImage: `url(${panel.image})` }}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="panel-title">{panel.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Theatre;
