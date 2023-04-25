import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Item from "./Item";

import "./Category.scss";

function Category({ categories, items }) {
  const params = useParams();

  const [itemsInCategory, setItemsInCategory] = useState([]);
  const [currentCategory, setCurrentCategory] = useState({});

  useEffect(() => {
    axios
      .get(
        `https://octopus-app-hzms7.ondigitalocean.app/categories/:categoryId`,
        {
          params: {
            id: params.categoryId,
          },
        }
      )
      .then((res) => {
        setItemsInCategory(res.data);
        setCurrentCategory(
          categories.find(
            (category) => category.id === Number(params.categoryId)
          )
        );
      });
  }, [params]);

  console.log(params);
  console.log(currentCategory);
  console.log(itemsInCategory);

  return (
    <>
      <div className="title-container top-element">
        <h1 className="title">
          {currentCategory ? currentCategory.title : "loading..."}
        </h1>
        <span className="hr">
          <hr />
        </span>
      </div>
      <div className="items-container">
        {itemsInCategory.map((item) => {
          let itemBid = items.find((item2) => item2.id === item.id);
          return (
            <div className="item-container" key={item.id}>
              <Link className="item-link" to={`/items/${item.id}`}>
                <Item
                  photo={item.img_url}
                  title={item.title}
                  bid={itemBid}
                ></Item>
              </Link>
            </div>
          );
        })}
      </div>{" "}
    </>
  );
}

export default Category;
