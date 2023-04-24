import React, { useState, Fragment, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "axios";
import Cookies from "js-cookie";

import "./CreateBid.scss";

const CreateBid = ({ item, onSubmit, currentBid }) => {
  const [userId, setUserId] = useState(null);
  const [itemId, setItemId] = useState(null);
  const [bidValue, setBidValue] = useState("");
  const [message, setMessage] = useState("");
  let currentUser = Cookies.get("userId");
  let currentBidInDollars = currentBid / 100;

  useEffect(() => {
    setUserId(currentUser);
    setItemId(item.item_id);
    setBidValue("");
  }, [item, currentUser]);

  // values: [bidInfo.user_id, bidInfo.item_id, bidInfo.bid_value],

  // Collects form data from state and submits an axios.post
  const handleSubmit = (event) => {
    event.preventDefault();
    // Data validation - All field must be populated.
    if (bidValue < currentBidInDollars) {
      toast.warn("Bid too low!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    setBidValue("");
    const bidData = {
      user_id: userId,
      item_id: parseInt(itemId),
      bid_value: parseInt(bidValue * 100),
    };

    axios
      .post("/bids/new", bidData)
      .then((res) => {
        onSubmit(true);
      })
      .catch((error) => {
        console.error("Error submitting bid:", error);
      });
  };

  return (
    <Fragment>
      {/* {newItemId && <Navigate to={`/items/${itemId}`}} */}

      <form onSubmit={handleSubmit} autoComplete="off">
        {/* <div className={"m-4"}> */}
        <div className={"d-flex bid-box"}>
          <div className={"d-flex flex-column"}></div>

          <div className={"new-bid"}>
            <p className={"strong"}>Create a new bid:</p>

            <div className={"form-group"}>
              <label htmlFor="new-bid">What Is Your Bid?</label>
              <input
                className={"form-control"}
                type="number"
                name="new-bid"
                value={bidValue}
                placeholder={message ? message : "Bid Amount"}
                onChange={(event) => {
                  //allows the numbers to show up in the input field
                  setBidValue(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="bid-button">
            <button className={"btn btn-dark submit"}>Create Bid</button>
          </div>
        </div>
        {/* </div> */}
      </form>
    </Fragment>
  );
};

export default CreateBid;
