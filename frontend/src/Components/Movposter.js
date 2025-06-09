import React, { useState } from "react";
import "./movpos.css";

const panels = [
  {
    id: 1,
    video: "/video1.mp4",
    title: "Jurassic World Rebirth",
    placeholder: "/placeholder.jpg",
  },
  {
    id: 2,
    video: "/video2.mp4",
    title: "Superman 2025",
    placeholder: "/placeholder2.jpg",
  },
  {
    id: 3,
    video: "/video3.mp4",
    title: "Fantastic Four",
    placeholder: "/placeholder3.jpg",
  },
  {
    id: 4,
    video: "/video4.mp4",
    title: "Ballerina",
    placeholder: "/placeholder4.jpg",
  },
];

const ExpandingPanels = () => {
  const [hovered, setHovered] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  const handlePlay = (index) => {
    setActiveVideo(index);
  };

  return (
    <div className="movpos">
        <h1 className="movpos-title">Explore Upcoming Movies</h1>
      <div className="panels-container">
        {panels.map((panel, index) => (
          <div
            key={panel.id}
            className={`panel ${
              hovered === index ? "hovered" : hovered !== null ? "shrunk" : ""
            }`}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
          >
            {activeVideo === index ? (
              <video
                src={panel.video}
                controls
                className="panel-video"
                style={{ zIndex: 0 }}
              />
            ) : (
              <>
                <div
                  className="panel-overlay"
                  style={{ backgroundImage: `url(${panel.placeholder})` }}
                />
                <button
                  className="play-button"
                  onClick={() => handlePlay(index)}
                >
                  ▶
                </button>
              </>
            )}
            <div className="panel-title">{panel.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpandingPanels;
