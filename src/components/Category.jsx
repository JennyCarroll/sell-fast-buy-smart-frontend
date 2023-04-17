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
      .get(`/categories/:categoryId`, {
        params: {
          id: params.categoryId,
        },
      })
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
      <div className="category-title top-element">
        <h1>
          {currentCategory ? currentCategory.title : "loading..."}
          <hr />
        </h1>
      </div>
      <div className="categoryItemsContainer">
        {itemsInCategory.map((item) => {
          let itemBid = items.find((item2) => item2.id === item.id);
          return (
            <Link className="itemLink" to={`/items/${item.id}`} key={item.id}>
              <Item photo={item.img_url} title={item.title} bid={itemBid} ></Item>
            </Link>
          );
        })}
      </div>{" "}
    </>
  );
}

export default Category;
