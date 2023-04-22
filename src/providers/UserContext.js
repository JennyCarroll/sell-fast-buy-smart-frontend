import { createContext, useState, useContext, useEffect } from 'react';
import { webSocketContext } from '../providers/WebSocketContext';
import Cookies from 'js-cookie'


export const loginContext = createContext();

export default function LoginProvider(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const { socketLogin } = useContext(webSocketContext);

  useEffect(() => {
    setCurrentUser(Cookies.get('userId'));
  }, [])

  const login = function (userId) {
    Cookies.set('userId', userId, { expires: 1 })
    setCurrentUser(userId);
    socketLogin(userId);
  };

  const logout = function () {
    Cookies.remove('userId')
    setCurrentUser(null);
  };

  const userInfo = { currentUser, login, logout };

  return (
    <loginContext.Provider value={userInfo}>
      {props.children}
    </loginContext.Provider>
  );
};