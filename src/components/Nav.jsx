import './Nav.scss';
import Search from './Search';
import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { loginContext } from '../providers/UserContext';
import Cookies from 'js-cookie'

function Nav(props) {
  let categories = props.categories;

  const [userId, setUserId] = useState(null);
  const [currentUserCookie, setCurrentUserCookie] = useState(Cookies.get('userId'))
  const { currentUser, login, logout } = useContext(loginContext);
  

useEffect(() => {
  setCurrentUserCookie(Cookies.get('userId'))
}, [currentUser])

  const handleChange = (event) => {
    setUserId(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      login(userId);
    }
  };

  return (
    <div className='nav nav-bar'>
      <div className='nav top-nav'>
        <div className='nav logo btn mb1 bg-black'>
          <Link to={'/'}>
            <h1>SFBS</h1>
          </Link>
        </div>
        <div className='fav'>
          sell<br></br>buy
        </div>
        <div className='nav search'>
          <Search items={props.items} />
        </div>
        <div className='nav right-nav'>
          {/* button to deal with dark mode and light mode */}
          <button
            onClick={() => {
              let theme = !props.theme;
              props.setTheme(theme);
            }}
          >
            {props.theme ? 'Dark Mode' : 'Light Mode'}
          </button>
          {currentUserCookie ? (
            <>
              <div className='btn mb1 bg-black'>
                <Link to={'/items/new'}>Sell Now</Link>
              </div>
              <div className='btn mb1 bg-black dropdown'>
                Profile
                <div className='dropdown-content'>
                  <Link to={`/profile/${currentUserCookie}`}>My Profile</Link>
                  <Link to={`/`} onClick={() => logout()}>
                    logout
                  </Link>
                </div>
              </div>
              <div className='btn mb1 bg-black'>
                <Link to={`bids/${currentUserCookie}`}>My Bids</Link>
              </div>
            </>
          ) : (
            <div className='btn dropdown'>
              <h6 className='login'>Login / Sign Up</h6>
              <div className='dropdown-content'>
                <input
                  onKeyDown={handleKeyDown}
                  className='login form-control'
                  placeholder='userId'
                  onChange={handleChange}
                />
                <button id='login' onClick={() => login(userId)}>
                  Login
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='nav bottom-nav'>
        <div className='nav categories'>
          {categories.map((category) => (
            <Link key={category.id} to={`/categories/${category.id}`} className='btn mb1 bg-black'>
              <h2>{category.title}</h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Nav;
