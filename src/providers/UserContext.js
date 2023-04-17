import { createContext, useState, useContext } from 'react';
import { webSocketContext } from '../providers/WebSocketContext';


export const loginContext = createContext();

export default function LoginProvider(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const { socketLogin } = useContext(webSocketContext);

  const login = function (userId) {
    setCurrentUser(userId);
    socketLogin(userId);
  };

  const logout = function () {
    setCurrentUser(null);
  };

  const userInfo = { currentUser, login, logout };

  return (
    <loginContext.Provider value={userInfo}>
      {props.children}
    </loginContext.Provider>
  );
};