import React from "react";
import { Link } from "react-router-dom";
import Item from "./Item";
import "./Items.scss";

function Items(props) {
  // images is an array of objects
  // create array of Item Photos
  let arrayOfItemPhotos = props.images.map((image) => {
    let item = props.items.find((item) => item.id === image.item_id);
    let itemBid = props.items.find((item2) => item2.id === item.id);
    return (
      <div key={image.item_id} className="item-container">
        <Link className="itemLink" to={"/items/" + image.item_id}>
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
        {props.endingSoon.slice(0, 8).map((item) => {
          let image = props.images.find((image) => image.item_id === item.id);
          let itemBid = props.items.find((item2) => item2.id === item.id);
          return (
              <Link className="item-container itemLink" to={`/items/${item.id}`}>
            <div key={item.id} >
                {/* rather than linking to an item or creating a new component, we render an image directly here with a special class to style the photos smaller */}
                <img
                  className="featuredImage"
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
