import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Item from './Item';
import Cookies from 'js-cookie';
import Rating from './general/Rating';
import('./MyProfile.scss');

const MyProfile = ({ users, items, images }) => {
  const params = useParams();
  const [thisUser, setThisUser] = useState({});
  const currentUser = Cookies.get('userId');

  const userId = Number(params.userId);

  let itemsForUser = items.filter((item) => item.user_id === userId);
  useEffect(() => {
    // console.log("MyProfile - UseEffect");
    setThisUser(users.find((user) => user.id === userId));
  }, [params, items]);

  // console.log("MyProfile - Render");
  return (
    <div>
      <div className='profile'>
        <div className='profile-photo'>
          {' '}
          <img className='image' src={'https://i.imgur.com/b0h13kE.jpg'} alt={thisUser.name} />
          <h2>{thisUser ? thisUser.name : 'Loading...'}</h2>
        </div>
        <div className='personal-info'>
          <p>{thisUser && thisUser.email}</p>
          <p>
            {thisUser && thisUser.city}, {thisUser && thisUser.country}
          </p>
          <p>{thisUser && thisUser.bio}</p>
          <br />
          <Rating user={thisUser}></Rating>
        </div>
      </div>
      <div className='items'>
        {currentUser ? (
          <div className='title-container'>
            <div className='title'>
              <h1>Your Items For Sale</h1>
            </div>
            <span className='hr'>
              <hr />
            </span>
          </div>
        ) : (
          <div className='title-container'>
            <div className='title'>
              <h1>Items For Sale By User</h1>
            </div>
            <div className='hr'>
              <hr />
            </div>
          </div>
        )}
      </div>
      {/* <div className="items-info"> */}
      <div className='items-container'>
        {itemsForUser.map((item) => {
          let itemBid = items.find((item2) => item2.id === item.id);
          let img = images.find((image) => image.item_id === item.id);
          return (
            <Link className='item-link' to={`/items/${item.id}`} key={item.id}>
              <div key={item.id} className='item-container'>
                <Item
                  photo={img.img_url}
                  title={item.title}
                  bid={itemBid}
                  itemId={item.id}
                  edit={true}
                ></Item>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MyProfile;
