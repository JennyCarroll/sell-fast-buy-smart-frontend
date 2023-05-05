import { useState, useEffect, useContext } from 'react';
import './ItemDetail.scss';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import ThumbNail from './ThumbNail';
import Carousel from './Carousel';
import CreateBid from './CreateBid';
import Counter from './general/Counter';
import { loginContext } from '../providers/UserContext';
import Cookies from 'js-cookie';

function ItemDetail(props) {
  const params = useParams();
  const [itemObj, setItemObj] = useState({});
  const [sellerId, setSellerId] = useState({});
  const [currentUserCookie, setCurrentUserCookie] = useState(Cookies.get('userId'));
  const [activeImage, setActiveImage] = useState('');
  const [bidData, setBidData] = useState(itemObj.bid_value);
  const { currentUser } = useContext(loginContext);

  useEffect(() => {
    axios
      .get(`/items/${params.itemId}`)
      .then((res) => {
        setItemObj(res.data[0]);
        setSellerId(res.data[res.data.length - 1].user_id);
      })
      .catch(() => {
        console.log('Error fetching items data');
      });
  }, [params, bidData]);

  useEffect(() => {
    setCurrentUserCookie(Cookies.get('userId'));
  }, [currentUser]);

  const bidToDollars = function () {
    return (itemObj.bid_value / 100).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  // set thumbNails
  const thumbNails = function (itemObj) {
    if (!itemObj.img_url) {
      return;
    }
    return itemObj.img_url.map((image) => {
      return (
        <ThumbNail
          key={image.img_url}
          photo={image.img_url}
          title={itemObj.title}
          setActiveImage={setActiveImage}
        ></ThumbNail>
      );
    });
  };

  return (
    <>
      {itemObj && (
        <div className='top-element '>
          <div className='title-container'>
            <h1 className='title'>{itemObj.title}</h1>
            <span className='hr'>
              <hr />
            </span>
          </div>
          <div className='item-detail'>
            <div className='detail-container'>
              <div className='carousel-image-container'>
                <div className='custom-container'>
                  <div className='images'>
                    <div className='item-container'>
                      {itemObj.img_url && itemObj.img_url.length > 0 && (
                        <Carousel
                          images={itemObj.img_url}
                          title={itemObj.title}
                          active={activeImage}
                        ></Carousel>
                      )}
                    </div>
                    <div className='thumbnails'>{thumbNails(itemObj)}</div>
                  </div>
                </div>
              </div>
              <div className='info-container'>
                <div className='info'>
                  <span className='description'>{itemObj.description}</span>
                  <span className='counter'>
                    {itemObj.end_date && <Counter end_date={itemObj.end_date} />}
                  </span>
                </div>

                <div className='info'>
                  <div className='bidInfo'>
                    <span className='bid-plus-condition'>
                      <span>
                        {Number(itemObj.user_id) === Number(currentUserCookie)
                          ? '👑 You are the highest bidder'
                          : ''}
                      </span>
                      <span>Current Bid: {bidToDollars(itemObj.bid_value)}</span>
                      <span>Condition: {itemObj.condition}</span>
                      <span>
                        <Link to={`/profile/${sellerId}`}>
                          <p className='view-seller'>View This Seller</p>
                        </Link>
                      </span>
                    </span>
                    <span>
                      {currentUserCookie && (
                        <CreateBid
                          item={itemObj}
                          currentBid={itemObj.bid_value}
                          setCurrentBid={setBidData}
                        />
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ItemDetail;
