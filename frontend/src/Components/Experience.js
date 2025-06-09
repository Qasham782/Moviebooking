import React from "react";
import "./exp.css";

export default function Experience() {
  return (
    <div className="comp">
      <h2 className="exp-heading mb-5">
        Experience more of the stories you <br></br> love
      </h2>
      <div>
        <iframe
          width="100%"
          height="500"
          src="https://www.youtube.com/embed/G1VBfMCZVkw?si=pfmVv-bKb6BLXTDa"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
      <div className="exp-heading2 mt-5">
        <h2>FULL FRAMES, FULL IMMERSION. THIS IS IMAX.</h2>
        <p>
          Years of technical development. Miles of film. Countless stories.
          Designed for the world’s best theatres. Learn more about the IMAX
          difference.
        </p>
      </div>
    </div>
  );
}
