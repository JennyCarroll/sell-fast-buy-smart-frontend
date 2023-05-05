import { useState, useEffect, createContext } from "react";
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';


export const webSocketContext = createContext();

export default function WebSocketProvider(props) {
  // MANAGE STATE
  const [socket, setSocket] = useState(null);
  const [bidItem, setBidItem] = useState(0);

  useEffect(() => {
    const socket = io('');
    setSocket(socket);

    socket.on('bid', (data) => {
      const price = data.bid.bid_value / 100;
      const userName = data.user.name;
      const itemName = data.item.title;


      setBidItem(data.item.id);
      toast.info(`${userName} bid $${price} for ${itemName}!`, {
        position: "bottom-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });

    //Cleanup
    return () => {
      socket.close();
    };

  }, []);

  // FUNCTIONS
  const socketLogin = (currentUser) => {
    socket.emit('login', currentUser);
  };


  const socketInfo = { socketLogin, bidItem };
  return (
    <webSocketContext.Provider value={socketInfo}>
      {props.children}
    </webSocketContext.Provider>

  );
};