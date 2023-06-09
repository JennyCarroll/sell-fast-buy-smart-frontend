import React, { useState, Fragment, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { stateContext } from '../providers/StateContext';
import axios from 'axios';
import Cookies from 'js-cookie';
import './CreateBid.scss';

const CreateBid = ({ item, onSubmit, currentBid, setCurrentBid }) => {
  const [userId, setUserId] = useState(null);
  const [itemId, setItemId] = useState(null);
  const [bidValue, setBidValue] = useState('');
  const [message, setMessage] = useState('');
  let currentUser = Cookies.get('userId');
  let currentBidInDollars = currentBid / 100;
  const { setStateLoading } = useContext(stateContext);

  //if item of user changes it will reset the currentUser itemId and the bid value to go along with the itemId
  useEffect(() => {
    setUserId(currentUser);
    setItemId(item.item_id);
    setBidValue('');
  }, [item, currentUser]);

  // Collects form data from state and submits an axios.post
  const handleSubmit = (event) => {
    event.preventDefault();
    setBidValue('');
    // Data validation - All field must be populated.
    if (bidValue < currentBidInDollars) {
      toast.warn('Bid too low!', {
        position: 'bottom-center',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      return;
    }

    const bidData = {
      user_id: userId,
      item_id: parseInt(itemId),
      bid_value: parseInt(bidValue.replace('$', '') * 100),
    };

    axios
      .post('/bids/new', bidData)
      .then((res) => {
        setCurrentBid(res.data.bid_value);
        setStateLoading(true);
      })
      .catch((error) => {
        console.error('Error submitting bid:', error);
      });
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit} autoComplete='off'>
        <div className={'d-flex bid-box'}>
          <div className={'d-flex flex-column'}></div>
          <div className={'new-bid'}>
            <p className={'strong'}>Create a new bid:</p>
            <div className={'form-group'}>
              <label htmlFor='new-bid'>What Is Your Bid?</label>
              <div className='dollar-sign'>
                <p>$</p>
                <input
                  className={'form-control'}
                  type='number'
                  name='new-bid'
                  value={bidValue}
                  placeholder={message ? message : 'Bid Amount'}
                  onChange={(event) => {
                    setBidValue(event.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className='bid-button'>
            <button className={'btn btn-dark submit'}>Create Bid</button>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default CreateBid;
