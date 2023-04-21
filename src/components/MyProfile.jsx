import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import Item from './Item';
import { loginContext } from '../providers/UserContext';
import Cookies from 'js-cookie';
import Rating from './general/Rating';
import('./MyProfile.scss');

const MyProfile = ({ users, items, images }) => {
  console.log('MyProfile - render');
  const params = useParams();
  const [thisUser, setThisUser] = useState({});
  const currentUser = Cookies.get('userId');

  const userId = Number(params.userId);

  let itemsForUser = items.filter((item) => item.user_id === userId);
  useEffect(() => {
    console.log('MyProfile - UseEffect');
    setThisUser(users.find((user) => user.id === userId));
  }, [params, items]);

  return (
    <body>
      <div className='profile'>
        <div className='profile-photo'>
          {' '}
          <img className='image' src={'https://i.imgur.com/b0h13kE.jpg'} alt='profile picture' />
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
          <div className='titleContainer'>
            <div className='title'>
              <h1>Your Items For Sale</h1>
            </div>
            <div className='hr'>
              <hr />
            </div>
          </div>
        ) : (
          <div className='titleContainer'>
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
      <div className='itemsContainer'>
        {itemsForUser.map((item) => {
          let itemBid = items.find((item2) => item2.id === item.id);
          let img = images.find((image) => image.item_id === item.id);
          return (
            <Link className='itemLink' to={`/items/${item.id}/edit`} key={item.id}>
              <Item photo={img.img_url} title={item.title} bid={itemBid}></Item>
            </Link>
          );
        })}
      </div>
    </body>
  );
};

export default MyProfile;
