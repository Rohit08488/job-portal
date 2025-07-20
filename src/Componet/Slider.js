import React from "react";
import { Carousel } from "react-bootstrap";
import "../css files/Slider.css"; // Add custom CSS

function Slider() {
  return (
    <Carousel interval={8000} controls={false} indicators={false} fade>
      {/* YouTube Slide */}
      <Carousel.Item>
        <div className="video-container">
          <iframe
            src="https://www.youtube.com/embed/BlA6XUhC9J4?autoplay=1&mute=1&loop=1&playlist=BlA6XUhC9J4&controls=0&showinfo=0&rel=0&modestbranding=1"
            title="YouTube video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
      </Carousel.Item>

    
    </Carousel>
  );
}

export default Slider;
