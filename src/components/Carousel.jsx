import React from "react";
import Item from "./Item";

function Carousel(props) {
  return (
    <div id="carouselExample" className="carousel slide">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <Item
            // if there is an active image use that, otherwise use the first image
            photo={props.active ? props.active : props.images[0].img_url}
            title={props.title}
          ></Item>
        </div>
        {props.images.map((image, i) => {
          return (
            <div key={i} className="carousel-item">
              <Item photo={image.img_url} title={props.title}></Item>
            </div>
          );
        })}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Carousel;
