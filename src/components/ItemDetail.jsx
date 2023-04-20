import { useState, useEffect, useContext } from "react";
import "./ItemDetail.scss";
import axios from "axios";
import { useParams } from "react-router-dom";
import ThumbNail from "./ThumbNail";
import Carousel from "./Carousel";
import CreateBid from "./CreateBid";
import Counter from "./general/Counter";
import { loginContext } from '../providers/UserContext';
import { webSocketContext } from '../providers/WebSocketContext';

function ItemDetail(props) {
  // Get the itemId from the URL parameters
  const params = useParams();
  const [itemObj, setItemObj] = useState({});
  const { currentUser, login, logout } = useContext(loginContext);
  //create state for the activeImage of the carousel
  const [activeImage, setActiveImage] = useState("");
  const { bidData } = useContext(webSocketContext);

  useEffect(() => {
    axios
      //fetch item data from the server
      .get(`/items/${params.itemId}`)
      .then((res) => {
        // Set the item object state with the response data
        setItemObj(res.data[0]);
      })
      .catch((error) => {
        console.log(error.response.status);
        console.log(error.response.headers);
        console.log(error.response.data);
      });
  }, [params, bidData]);

  // Helper function to convert bid value to a dollar amount
  const bidToDollars = function (value) {
    return (itemObj.bid_value / 100).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  // set thumbNails
  const thumbNails = function (itemObj) {
    if (!itemObj.img_url) {
      return;
    }
    return itemObj.img_url.map((image) => {
      return (
        <ThumbNail
          photo={image.img_url}
          title={itemObj.title}
          setActiveImage={setActiveImage}
        ></ThumbNail>
      );
    });
  };

  return (
    <>
      {/* check to see if the itemObj exists before rendering the jsx */}
      {itemObj && (
        <div className="itemDetail top-element">
          <div className="images">
            <h1>{itemObj.title}</h1>
            {/* because this data is nested in itemObj and it is an additional async query, it may take longer to load so we check to make sure it exists and has length before rendering */}
            {itemObj.img_url && itemObj.img_url.length > 0 && (
              <Carousel
                images={itemObj.img_url}
                title={itemObj.title}
                active={activeImage}
              ></Carousel>
            )}
          </div>
          <div className="info">
            <hr />
            <span className="description">{itemObj.description}</span>
          </div>
          <div>{thumbNails(itemObj)}</div>
          <div>
          <span>{Number(itemObj.user_id) === Number(currentUser) ? "👑 You are the highest bidder" : ""}</span>
          <br />
            <span>              
              <span>Current Bid: {bidToDollars(itemObj.bid_value)}</span>
              <br />
              {/*It is necessary to only render this once `itemObj.end_date` exists, otherwise the setInterval won't start properly
               */}
              {itemObj.end_date && <Counter end_date={itemObj.end_date} />}
            </span>
            <span>
              {/* <button>BID NOW!</button> */}
              <span>Condition: {itemObj.condition}</span>
            </span>
          </div>
        </div>
      )}
      <CreateBid item={itemObj} onSubmit={props.onSubmit} />
    </>
  );
}

export default ItemDetail;
