import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllBids = (props) => {
  const [allBids, setAllBids] = useState([]);

  useEffect(() => {
    axios.get("/bids", {}).then((res) => {
      setAllBids(res.data);
    });
  }, []);

  return (
    <div className="items-container">
      {allBids.map((bid) => {
        return (
          <Link key={bid.id} to={`/items/${bid.item_id}`}>
            <img
              className="image"
              src={bid.img_url}
              alt={"bid.title we need to add this"}
            />
            <h1>{bid.bid_value}</h1>
          </Link>
        );
      })}
    </div>
  );
};

export default AllBids;
