import React, { useState, Fragment, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import SelectListOptions from './general/SelectListOptions';
import { stateContext } from '../providers/StateContext';
import Cookies from 'js-cookie';
import './ItemForm.scss';
import { toast } from 'react-toastify';

function ItemEdit() {
  // MANAGE STATE
  const [item, setItem] = useState({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState(1);
  const [category, setCategory] = useState(1);
  const [endDate, setEndDate] = useState('');
  const [minBid, setMinBid] = useState(0);
  const [imgUrl, setImgUrl] = useState('');
  const [imgUrlBlur, setImgUrlBlur] = useState('https://imgur.com/BDT7VOn.jpg');
  const [bidCount, setBidCount] = useState(0);

  const currentUser = parseInt(Cookies.get('userId'));

  const { state, setStateRefresh, setStateLoading } = useContext(stateContext);

  const params = useParams();
  const paramsItemId = parseInt(params.itemId);
  let editButtonRender = false;
  if (paramsItemId) {
    editButtonRender = true;
  }
  const navigate = useNavigate();

  useEffect(() => {
    if (!paramsItemId) {
      return;
    }
    axios.get(`/items/${paramsItemId}`).then((res) => {
      const resItem = res.data[0];
      setItem(resItem);
      setTitle(resItem.title);
      setDescription(resItem.description);
      setCondition(resItem.condition);
      setCategory(resItem.category_id);
      setEndDate(new Date(resItem.end_date).toISOString().slice(0, 16));
      setMinBid(resItem.bid_value / 100);
      setBidCount(res.data.length);

      const image = resItem.img_url[0].img_url;
      if (image) {
        setImgUrl(image);
        setImgUrlBlur(image);
      }
    });
  }, [state]);

  // SUPPORTING FUNCTIONS:

  const toastError = (message) => {
    toast.error(message, {
      position: 'bottom-center',
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
    return;
  };

  const editItem = (event) => {
    event.preventDefault();
    // Data validation - No empty fields allowed.
    if (
      !currentUser ||
      !title ||
      !description ||
      !endDate ||
      !imgUrl ||
      !category ||
      !condition ||
      !minBid
    ) {
      toastError('Errors on the page. Please review your submission');
      return;
    }

    const editData = {
      id: paramsItemId,
      user_id: currentUser,
      title,
      description,
      endDate,
      imgUrl,
      category: parseInt(category),
      condition: parseInt(condition),
      minBid: parseInt(minBid * 100),
    };

    if (currentUser === item.user_id) {
      axios
        .post(`/items/${paramsItemId}/edit`, editData)
        .then((res) => {
          setStateLoading(true);
          navigate(`/items/${paramsItemId}`);
        })
        .catch((error) => {
          console.error('Error submitting form:', error);
        });
    }
  };

  const deleteItem = (event) => {
    event.preventDefault();
    axios
      .post(`/items/${paramsItemId}/delete`, {
        itemId: paramsItemId,
      })
      .then(() => {
        setStateLoading(true);
        navigate(`/profile/${currentUser}`);
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
      });
  };

  const createItem = (event) => {
    event.preventDefault();
    // Data validation - No empty fields allowed.
    if (
      !currentUser ||
      !title ||
      !description ||
      !endDate ||
      !imgUrl ||
      !category ||
      !condition ||
      !minBid
    ) {
      toastError('Errors on the page. Please review your submission');
      return;
    }

    const itemData = {
      user_id: currentUser,
      title,
      description,
      endDate,
      imgUrl,
      category: parseInt(category),
      condition: parseInt(condition),
      minBid: parseInt(minBid * 100),
    };
    axios
      .post('/items/new', itemData)
      .then((res) => {
        setStateLoading(true);
        navigate(`/items/${res.data.id}`);
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
      });
  };

  return (
    <Fragment>
      <form autoComplete='off'>
        <div className={'item-form'}></div>
        <div className={'m-4'}>
          <span className={'strong'}>Edit your item:</span>
          <div className={'d-flex'}>
            <div className={'d-flex flex-column'}>
              <img className={'imageContainer img-fluid'} src={imgUrlBlur} alt='image_url'></img>
              <div className={'form-group m-1'}>
                <label htmlFor='item-url'>Item URL:</label>
                <input
                  className={'form-control'}
                  type='text'
                  name='item-url'
                  value={imgUrl}
                  onChange={(event) => {
                    setImgUrl(event.target.value);
                  }}
                  onBlur={(event) => {
                    setImgUrlBlur(event.target.value);
                  }}
                  placeholder='Item Image Url'
                />
                <div
                  onClick={() => {
                    setImgUrlBlur('https://i.imgur.com/HGJaWYO.jpeg');
                    setImgUrl('https://i.imgur.com/HGJaWYO.jpeg');
                  }}
                >
                  <i>A nice picture of a car: https://i.imgur.com/HGJaWYO.jpeg</i>
                </div>
                <div
                  onClick={() => {
                    setImgUrlBlur('https://i.imgur.com/kwUdo7j.jpeg');
                    setImgUrl('https://i.imgur.com/kwUdo7j.jpeg');
                  }}
                >
                  <i>Or maybe some boots?: https://i.imgur.com/kwUdo7j.jpeg</i>
                </div>
              </div>
            </div>

            <div className={'flex-column col-8'}>
              <div className={'form-group m-1'}>
                <label htmlFor='item-title'>Title:</label>
                <input
                  className={'form-control'}
                  type='text'
                  name='item-title'
                  value={title}
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                  placeholder='Item Title'
                />
              </div>
              <div className={'form-group m-1'}>
                <label htmlFor='item-description'>Description:</label>
                <textarea
                  className={'form-control'}
                  name='item-description'
                  value={description}
                  placeholder='Item Description'
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                ></textarea>
              </div>
              <div className={'row'}>
                <div className={'form-group col m-1'}>
                  <label htmlFor='item-category'>Category:</label>
                  <select
                    className={'form-control'}
                    name='item-category'
                    placeholder='Choose a Category'
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                  >
                    <SelectListOptions options={state.categories} />
                  </select>
                </div>

                <div className={'form-group col m-1'}>
                  <label htmlFor='item-condition'>Condition:</label>
                  <select
                    className={'form-control'}
                    name='item-condition'
                    value={condition}
                    placeholder='Item Condition'
                    onChange={(event) => {
                      setCondition(event.target.value);
                    }}
                  >
                    <SelectListOptions options={state.conditions} />
                  </select>
                </div>
              </div>
              <div className={'form-group m-1'}>
                <label htmlFor='item-bid'>Minimum Bid:</label>
                <input
                  className={'form-control'}
                  type='number'
                  name='item-bid'
                  value={minBid}
                  placeholder='Minimum Bid'
                  onChange={(event) => {
                    setMinBid(event.target.value);
                  }}
                />
              </div>
              <div className={'form-group m-1'}>
                <label htmlFor='item-auction'>Auction End:</label>
                <input
                  className={'form-control'}
                  type='datetime-local'
                  name='item-auction'
                  value={endDate}
                  placeholder='Auction End'
                  onChange={(event) => {
                    setEndDate(event.target.value);
                  }}
                />
              </div>
              <div className='d-flex justify-content-end'>
                {editButtonRender && bidCount === 1 && (
                  <button className={'btn  btn-dark submit m-1'} onClick={editItem}>
                    Save Edit
                  </button>
                )}
                {editButtonRender && (
                  <button className={'btn  btn-danger m-1'} onClick={deleteItem}>
                    Delete Item
                  </button>
                )}
                {!editButtonRender && (
                  <button className={'btn btn-dark submit m-1'} onClick={createItem}>
                    Create Item
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='d-flex justify-content-end m-4 bottom-element'></div>
      </form>
    </Fragment>
  );
}

export default ItemEdit;
