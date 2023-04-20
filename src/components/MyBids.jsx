import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { webSocketContext } from '../providers/WebSocketContext';
import Cookies from 'js-cookie'
import './MyBids.scss'

const MyBids = (props) => {
  const params = useParams();
  const [myBids, setMyBids] = useState([]);
  const [highestBids, setHighestBids] = useState([]);
  const currentUser = Cookies.get('userId')
  const { bidData } = useContext(webSocketContext);
  
  
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

console.log(myBids)
console.log(highestBids)

  return (
    <div className="itemsContainer top-element">
      {myBids.map((bid) => {
        const highestBid = highestBids.find(highBid => highBid.item_id === bid.item_id && highBid.highest_bid === bid.highest_bid);
        return (
          <Link className="itemLink" key={bid.item_id} to={`/items/${bid.item_id}`}>
            <div
                style={ {
                  backgroundImage: `url(${bid.img_url})`}}
              className="bids-image"
            ></div>
            <div class='my-bid-price' >{bidToDollars(bid.highest_bid)}</div>
            {highestBid && <div class='highest-bid-price'>{currentUser === params.userId ? '👑 You have the highest bid' : '👑 This user has the highest bid'}</div>}
          </Link>
        );
      })}
    </div>
  );
};

export default MyBids;
