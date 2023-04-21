import React from "react";
import "./ThumbNail.scss";

function ThumbNail(props) {
  return (
    <img
      onClick={() => {
        props.setActiveImage(props.photo);
      }}
      className="thumbnail"
      src={props.photo}
      alt={props.title}
    />
  );
}

export default ThumbNail;
