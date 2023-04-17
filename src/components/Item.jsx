import { React } from "react";
import Carousel from "./Carousel";
import "./Item.scss"; //not sure if this is correct
// import classNames from 'classnames';

function Item(props) {

  const bidToDollars = function (value) {
    return (value / 100).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    // d-block w-100 these classes are needed for bootstrap for the Carousel, do not remove
    // <img className="image d-block w-100" src={props.photo} alt={props.title} />
    <><div 
    style={ {
      backgroundImage: `url(${props.photo})`
    }} className="itemImage" ></div>
   {props.bid ? <div class='bid-price'>{bidToDollars(props.bid.highest_bid)}</div> : null}

      </>
  );
}

export default Item;
