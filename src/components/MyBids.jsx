import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { loginContext } from '../providers/UserContext';
import './MyBids.scss'

const MyBids = (props) => {
  const params = useParams();
  const [myBids, setMyBids] = useState([]);
  const [highestBids, setHighestBids] = useState([]);
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
        setMyBids(res.data.bidsForUser);
        setHighestBids(res.data.highestBids)
      });
  }, [params]);

  return (
    <div className="itemsContainer top-element">
      {myBids.map((bid) => {
        const isCurrentUserHighestBidder = highestBids.find(highBid => highBid.item_id === bid.item_id && highBid.highest_bid === bid.bid_value);
        return (
          <Link className="itemLink" key={bid.id} to={`/items/${bid.item_id}`}>
            <div
                style={ {
                  backgroundImage: `url(${bid.img_url})`}}
              className="bids-image"
            ></div>
            <div class='my-bid-price' >{bidToDollars(bid.bid_value)}</div>
            {isCurrentUserHighestBidder && <div class='highest-bid-price'>{currentUser === params.userId ? '👑 You have the highest bid' : '👑 This user has the highest bid'}</div>}
          </Link>
        );
      })}
    </div>
  );
};

export default MyBids;
