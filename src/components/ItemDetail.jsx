import { useState, useEffect, useContext } from "react";
import "./ItemDetail.scss";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ThumbNail from "./ThumbNail";
import Carousel from "./Carousel";
import CreateBid from "./CreateBid";
import Counter from "./general/Counter";
import { webSocketContext } from "../providers/WebSocketContext";
import { loginContext } from "../providers/UserContext";
import Cookies from "js-cookie";

function ItemDetail(props) {
  // Get the itemId from the URL parameters
  const params = useParams();
  const [itemObj, setItemObj] = useState({});
  const [sellerId, setSellerId] = useState({});
  const [currentUserCookie, setCurrentUserCookie] = useState(
    Cookies.get("userId")
  );
  //create state for the activeImage of the carousel
  const [activeImage, setActiveImage] = useState("");
  const { bidData } = useContext(webSocketContext);
  const { currentUser } = useContext(loginContext);

  useEffect(() => {
    axios
      //fetch item data from the server
      .get(
        `https://octopus-app-hzms7.ondigitalocean.app/items/${params.itemId}`
      )
      .then((res) => {
        // Set the item object state with the response data
        setItemObj(res.data[0]);
        setSellerId(res.data[res.data.length - 1].user_id);
      })
      .catch((error) => {
        console.log(error.response.status);
        console.log(error.response.headers);
        console.log(error.response.data);
      });
  }, [params, bidData]);

  useEffect(() => {
    setCurrentUserCookie(Cookies.get("userId"));
  }, [currentUser]);

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
        <div className="itemDetail top-element ">
          <div className="detailContainer">
            <div className="custom-container">
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
                <span className="counter">
                  {/*It is necessary to only render this once `itemObj.end_date` exists, otherwise the setInterval won't start properly
                   */}
                  {itemObj.end_date && <Counter end_date={itemObj.end_date} />}
                </span>
              </div>
            </div>
            <div className="custom-container">
              <div className="thumbNails">{thumbNails(itemObj)}</div>
              <div className="info">
                <div className="bidInfo">
                  <span className="bid-plus-condition">
                    <span>
                      {Number(itemObj.user_id) === Number(currentUserCookie)
                        ? "👑 You are the highest bidder"
                        : ""}
                    </span>
                    <span>Current Bid: {bidToDollars(itemObj.bid_value)}</span>
                    <span>Condition: {itemObj.condition}</span>
                    <span>
                      <Link to={`/profile/${sellerId}`}>View This Seller</Link>
                    </span>
                  </span>
                  <span className="newBid">
                    {currentUserCookie && (
                      <CreateBid
                        item={itemObj}
                        onSubmit={props.onSubmit}
                        currentBid={itemObj.bid_value}
                      />
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ItemDetail;
