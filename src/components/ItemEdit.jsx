import React, { useState, Fragment, useContext } from "react";
import { Navigate } from "react-router-dom";

import axios from "axios";

import SelectListOptions from "./general/SelectListOptions";
import Cookies from "js-cookie";

import "./ItemEdit.scss";

function ItemEdit(props) {
  // MANAGE STATE
  const [title, setTitle] = useState(props.item || "");
  const [description, setDescription] = useState(props.item.description || "");
  const [condition, setCondition] = useState(props.item.condition || 1);
  const [category, setCategory] = useState(props.item.category || 1);
  const [endDate, setEndDate] = useState(props.item.endDate || "");
  const [minBid, setMinBid] = useState(props.item.minBid || 0);
  const [imgUrl, setImgUrl] = useState(props.item.imgUrl || "");
  const [imgUrlBlur, setImgUrlBlur] = useState(
    props.item.imgUrl || "https://imgur.com/BDT7VOn.jpg"
  );
  const currentUser = Cookies.get("userId");

  const [newItemId, setNewItemId] = useState(false);

  // SUPPORTING FUNCTIONS:

  // Collects form data from state and submits an axios.post
  const handleSubmit = (event) => {
    event.preventDefault();
    // Data validation - No empty fields allowed.
    if (
      !currentUser ||
      !title ||
      !description ||
      !endDate ||
      !imgUrl ||
      !category ||
      !condition
    ) {
      return;
    }

    const itemData = {
      user_id: currentUser,
      title,
      description,
      endDate,
      imgUrl,
      category: parseInt(category),
      condition: parseInt(condition),
      minBid: parseInt(minBid * 100),
    };

    axios
      .post("/items/new", itemData)
      .then((res) => {
        props.onSubmit(true);
        setNewItemId(res.data.id);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  return (
    <Fragment>
      {newItemId && <Navigate to={"/items/" + newItemId} />}
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className={"itemEdit"}></div>
        <div className={"m-4"}>
          <span className={"strong"}>List a new item:</span>
          <div className={"d-flex"}>
            <div className={"d-flex flex-column"}>
              <img
                className={"imageContainer img-fluid"}
                src={imgUrlBlur ? imgUrlBlur : "https://imgur.com/BDT7VOn.jpg"}
                alt="image_url"
              ></img>
              <div className={"form-group m-1"}>
                <label htmlFor="item-url">Item URL:</label>
                <input
                  className={"form-control"}
                  type="text"
                  name="item-url"
                  value={imgUrl}
                  onChange={(event) => {
                    setImgUrl(event.target.value);
                  }}
                  onBlur={(event) => {
                    setImgUrlBlur(event.target.value);
                  }}
                  placeholder="Item Image Url"
                />
                <div
                  onClick={() => {
                    setImgUrlBlur("https://i.imgur.com/HGJaWYO.jpeg");
                    setImgUrl("https://i.imgur.com/HGJaWYO.jpeg");
                  }}
                >
                  <i>
                    A nice picture of a car: https://i.imgur.com/HGJaWYO.jpeg
                  </i>
                </div>
                <div
                  onClick={() => {
                    setImgUrlBlur("https://i.imgur.com/kwUdo7j.jpeg");
                    setImgUrl("https://i.imgur.com/kwUdo7j.jpeg");
                  }}
                >
                  <i>Or maybe some boots?: https://i.imgur.com/kwUdo7j.jpeg</i>
                </div>
              </div>
            </div>

            <div className={"flex-column col-8"}>
              <div className={"form-group m-1"}>
                <label htmlFor="item-title">Title:</label>
                <input
                  className={"form-control"}
                  type="text"
                  name="item-title"
                  value={title}
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                  placeholder="Item Title"
                />
              </div>
              <div className={"form-group m-1"}>
                <label htmlFor="item-description">Description:</label>
                <textarea
                  className={"form-control"}
                  name="item-description"
                  value={description}
                  placeholder="Item Description"
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                ></textarea>
              </div>
              <div className={"row"}>
                <div className={"form-group col m-1"}>
                  <label htmlFor="item-category">Category:</label>
                  <select
                    className={"form-control"}
                    name="item-category"
                    placeholder="Choose a Category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                  >
                    <SelectListOptions options={props.categories} />
                  </select>
                </div>

                <div className={"form-group col m-1"}>
                  <label htmlFor="item-condition">Condition:</label>
                  <select
                    className={"form-control"}
                    name="item-condition"
                    value={condition}
                    placeholder="Item Condition"
                    onChange={(event) => {
                      setCondition(event.target.value);
                    }}
                  >
                    <SelectListOptions options={props.conditions} />
                  </select>
                </div>
              </div>
              <div className={"form-group m-1"}>
                <label htmlFor="item-bid">Minimum Bid:</label>
                <input
                  className={"form-control"}
                  type="number"
                  name="item-bid"
                  value={minBid}
                  placeholder="Minimum Bid"
                  onChange={(event) => {
                    setMinBid(event.target.value);
                  }}
                />
              </div>
              <div className={"form-group m-1"}>
                <label htmlFor="item-auction">Auction End:</label>
                <input
                  className={"form-control"}
                  type="datetime-local"
                  name="item-auction"
                  value={endDate}
                  placeholder="Auction End"
                  onChange={(event) => {
                    setEndDate(event.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end m-4">
          <button className={"btn btn-dark submit"}>Create Item</button>
        </div>
      </form>
    </Fragment>
  );
}

export default ItemEdit;
