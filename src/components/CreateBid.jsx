import React, { useState, Fragment, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";

import axios from "axios";
import { loginContext } from "../providers/UserContext";

import "./CreateBid.scss";

const CreateBid = ({ item, onSubmit, currentBid }) => {
  const [userId, setUserId] = useState(null);
  const [itemId, setItemId] = useState(null);
  const [bidValue, setBidValue] = useState(null);
  const { currentUser, login, logout } = useContext(loginContext);

  useEffect(() => {
    setUserId(currentUser);
    setItemId(item.item_id);
    setBidValue("");
  }, [item, currentUser]);

  // values: [bidInfo.user_id, bidInfo.item_id, bidInfo.bid_value],

  // Collects form data from state and submits an axios.post
  const handleSubmit = (event) => {
    event.preventDefault();
    setBidValue("");
    // Data validation - All field must be populated.
    if (bidValue < currentBid || !itemId || !userId) {
      return;
    }

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
        <div className={"d-flex"}>
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
                placeholder="Bid Amount"
                onChange={(event) => {
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
