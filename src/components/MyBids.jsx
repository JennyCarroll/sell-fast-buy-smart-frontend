import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { loginContext } from '../providers/UserContext';
import './MyBids.scss'

const MyBids = (props) => {
  const params = useParams();
  const [myBids, setMyBids] = useState([]);
  const { currentUser, login, logout } = useContext(loginContext);
  
  const bidToDollars = function (value) {
    return (value / 100).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  useEffect(() => {
    axios
      .get("/bids/:userId", {
        params: {
          id: params.userId,
        },
      })
      .then((res) => {
        console.log(res.data)
        setMyBids(res.data);
      });
  }, [params]);

  return (
    <div className="itemsContainer top-element">
      {myBids.map((bid) => {
        return (
          <Link className="itemLink" key={bid.id} to={`/items/${bid.item_id}`}>
            <div
                style={ {
                  backgroundImage: `url(${bid.img_url})`}}
              className="bids-image"
            ></div>
            <div class='my-bid-price' >{bidToDollars(bid.bid_value)}</div>
            <div class='highest-bid-price' >👑 You have the highest bid</div>
          </Link>
        );
      })}
    </div>
  );
};

export default MyBids;
