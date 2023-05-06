import React from "react";
import { Link } from "react-router-dom";
import Item from "./Item";
import "./Items.scss";

function Items(props) {
  let arrayOfItemPhotos =
    Array.isArray(props.images) &&
    props.images.map((image) => {
      let item = props.items.find((item) => item.id === image.item_id);
      let itemBid = props.items.find((item2) => item2.id === item.id);
      return (
        <div key={image.item_id} className="item-container">
          <Link className="item-link" to={"/items/" + image.item_id}>
            <Item photo={image.img_url} title={item.title} bid={itemBid}></Item>
          </Link>
        </div>
      );
    });

  const bidToDollars = function (value) {
    return (value / 100).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <div className="top-element">
      <h1 className="site-name">Sell Fast Buy Smart</h1>

      <div className="title-container">
        <div className="title">
          <h1>Ending Soon!</h1>
        </div>
        <div className="hr">
          <hr />
        </div>
      </div>

      <div className="ending-soon">
        {Array.isArray(props.endingSoon) &&
          props.endingSoon.slice(0, 8).map((item) => {
            let image = props.images.find((image) => image.item_id === item.id);
            let itemBid = props.items.find((item2) => item2.id === item.id);
            return (
              <Link
                key={item.id}
                className="item-container item-link"
                to={`/items/${item.id}`}
              >
                <div>
                  <img
                    className="featured-image"
                    src={image.img_url}
                    alt={item.title}
                  />
                  <div className="bid-price">
                    {bidToDollars(itemBid.highest_bid)}
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
      <div className="title-container">
        <div className="title">
          <h1>All Items</h1>
        </div>
        <div className="hr">
          <hr />
        </div>
      </div>
      <div className="items-container">{arrayOfItemPhotos}</div>
    </div>
  );
}

export default Items;
