import React, { useState, useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

// Import components:
import Items from './Items';
import Nav from './Nav';
import ItemDetail from './ItemDetail';
import ItemForm from './ItemForm';
import Category from './Category';
import MyBids from './MyBids';
import AllBids from './AllBids';
import MyProfile from './MyProfile';
import BidToast from './general/BidToast';
import Page404 from './Page404';

// Import hooks and helpers:
// import useApplicationData from '../hooks/useApplicationData';
import { stateContext } from '../providers/StateContext';

import Cookies from 'js-cookie';

// Import styling:
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import { Flip, ToastContainer } from 'react-toastify';

// MAIN FUNCTION
export default function App() {
  // State management and functions:
  const currentUser = Cookies.get('userId');
  const { state, stateLoading, setStateRefresh } = useContext(stateContext);
  const [theme, setTheme] = useState(true);

  // console.log('stateLoading', stateLoading);
  return (
    <BrowserRouter>
      {/* create a button that sets this theme set theme  = !theme*/}
      <div className={`${theme ? 'light' : 'dark'}`}>
        <Nav items={state.items} categories={state.categories} theme={theme} setTheme={setTheme} />
        <main className='main'>
          {stateLoading ? (
            <p>LOADING</p>
          ) : (
            <Routes>
              <Route
                path='/'
                element={
                  <Items
                    images={state.images}
                    endingSoon={state.itemsEndingSoon}
                    items={state.items}
                  />
                }
              ></Route>
              <Route
                path='items/:itemId'
                element={<ItemDetail onSubmit={setStateRefresh} />}
              ></Route>
              <Route
                path='/categories/:categoryId'
                element={
                  <Category
                    categories={state.categories}
                    images={state.images}
                    items={state.items}
                  />
                }
              ></Route>
              <Route path='/bids' element={<AllBids />}></Route>
              <Route path='/bids/:userId' element={<MyBids />}></Route>
              <Route
                path='/profile/:userId'
                element={
                  <MyProfile users={state.users} items={state.items} images={state.images} />
                }
              ></Route>
              <Route path='/logout' element={<MyBids />}></Route>
              <Route
                path='items/new'
                element={currentUser ? <ItemForm /> : <Navigate to={'/'} />}
              ></Route>
              <Route path='items/:itemId/edit' element={<ItemForm />}></Route>
              <Route path='*' element={<Page404 />}></Route>
            </Routes>
          )}
          <ToastContainer transition={Flip} />
        </main>
      </div>
    </BrowserRouter>
  );
}
