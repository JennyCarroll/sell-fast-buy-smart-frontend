import React from "react";
import Item from "./Item";

function Carousel(props) {
  return (
    <div id="carouselExample" class="carousel slide">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <Item
            // if there is an active image use that, otherwise use the first image
            photo={props.active ? props.active : props.images[0].img_url}
            title={props.title}
          ></Item>
        </div>
        {props.images.map((image) => {
          return (
            <div class="carousel-item">
              <Item photo={image.img_url} title={props.title}></Item>
            </div>
          );
        })}
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Carousel;
