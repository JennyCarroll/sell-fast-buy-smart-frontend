import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { webSocketContext } from '../providers/WebSocketContext';
import Cookies from 'js-cookie'
import { loginContext } from '../providers/UserContext';
import './MyBids.scss'

const MyBids = (props) => {
  const params = useParams();
  const [myBids, setMyBids] = useState([]);
  const [highestBids, setHighestBids] = useState([]);
  const { currentUser } = useContext(loginContext);
  const [ currentUserCookie, setCurrentUserCookie ] = useState(Cookies.get('userId'))
  const { bidData } = useContext(webSocketContext);
  
  
  const bidToDollars = function (value) {
    return (value / 100).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  useEffect(() => {
    setCurrentUserCookie(Cookies.get('userId'))
  }, [currentUser])

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
<>
    <div className="title-container top-element">
    <h1 className="title">
      {Number(currentUserCookie) === Number(params.userId) ? 'Your Bids' : "Users Bids"}
      </h1>
      <span className="hr">
              <hr />
            </span>
  </div>
    <div className="itemsContainer">
      {myBids.map((bid) => {
        const highestBid = highestBids.find(highBid => highBid.item_id === bid.item_id && highBid.highest_bid === bid.highest_bid);
        return (
          <Link className="itemLink" key={bid.item_id} to={`/items/${bid.item_id}`}>
            <div
                style={ {
                  backgroundImage: `url(${bid.img_url})`}}
              className="bids-image"
            ></div>
            <div className='my-bid-price' >{bidToDollars(bid.highest_bid)}</div>
            {highestBid && <div className='highest-bid-price'>{currentUser === params.userId ? '👑 You have the highest bid' : '👑 This user has the highest bid'}</div>}
          </Link>
        );
      })}
    </div>
    </>
  );
};

export default MyBids;
