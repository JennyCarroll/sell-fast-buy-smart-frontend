import { React } from "react";
import "./Item.scss";

function Item(props) {
  const bidToDollars = function (value) {
    return (value / 100).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <>
      <img className="item-image" src={props.photo} alt={props.title} />
      {props.bid ? (
        <div className="bid-price">{bidToDollars(props.bid.highest_bid)}</div>
      ) : null}
    </>
  );
}

export default Item;
