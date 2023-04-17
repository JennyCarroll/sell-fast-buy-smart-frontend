import { useState, useEffect, createContext } from "react";
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';


export const webSocketContext = createContext();

export default function WebSocketProvider(props) {
  // MANAGE STATE
  const [socket, setSocket] = useState(null);
  const [bidData, setBidData] = useState({});

  useEffect(() => {
    const socket = io();
    setSocket(socket);

    socket.on('bid', (data) => {
      const price = data.bid.bid_value / 100;
      const userName = data.name;
      const itemName = data.item.title;


      setBidData(data);
      console.log(data);
      toast.info(`${userName} bid $${price} for ${itemName}!`, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log('someone made a bid!', data);
    });

    //Cleanup
    return () => {
      socket.close();
    };

  }, []);

  // FUNCTIONS
  const socketLogin = (currentUser) => {
    console.log('inside socket Login');
    socket.emit('login', currentUser);
  };


  const socketInfo = { socketLogin, bidData };
  return (
    <webSocketContext.Provider value={socketInfo}>
      {props.children}
    </webSocketContext.Provider>

  );
};