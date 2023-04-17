import React, { useState, Fragment, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';

import axios from 'axios';
import { loginContext } from "../providers/UserContext";

import "./CreateBid.scss";

const CreateBid = ({item, onSubmit}) => {



  const [userId, setUserId] = useState(null)
  const [itemId, setItemId] = useState(null);
  const [bidValue, setBidValue] = useState(null)
  const { currentUser, login, logout } = useContext(loginContext);


  useEffect(() => {
    setUserId(currentUser)
    setItemId(item.item_id)
  }, [item, currentUser])
  

  // values: [bidInfo.user_id, bidInfo.item_id, bidInfo.bid_value],


  // Collects form data from state and submits an axios.post
  const handleSubmit = (event) => {
    event.preventDefault();

    const bidData = {
      user_id: userId, // HARDCODED USER ID!
      item_id: parseInt(itemId),
      bid_value: parseInt(bidValue),
    };

    axios
      .post('/bids/new', bidData)
      .then((res) => {
        onSubmit(true);
      })
      .catch((error) => {
        console.error('Error submitting bid:', error);
      });
    }
  

  return ( <Fragment>
      {/* {newItemId && <Navigate to={`/items/${itemId}`}} */}

       <form onSubmit={handleSubmit} autoComplete='off'>
         <div className={'m-4'}>
         <div className={'d-flex'}>
             <div className={'d-flex flex-column col-4'}>
            </div>

          <div className={'new-bid'}>
           <p className={'strong'}>Create a new bid:</p>

              <div className={'form-group m-1'}>
                <label htmlFor='new-bid'>What Is Your Bid?</label>
                <input
                  className={'form-control'}
                  type='number'
                  name='new-bid'
                  // value={minBid}
                  placeholder='Bid Amount'
                  onChange={(event) => {
                    setBidValue(event.target.value * 100);
                  }}
                />
                </div>
                
            </div>
            <div className='bid-button'>
          <button className={'btn btn-dark submit'}>Create Bid</button>
        </div>
          </div>
        </div>
      </form>
    </Fragment>
);
    };

export default CreateBid;