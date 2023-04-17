import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useContext } from 'react';
import { webSocketContext } from '../../providers/WebSocketContext';

export default function BidToast(props) {
  const { bidData } = useContext(webSocketContext);
  console.log(bidData);

  return (
    <Link to={`/items/${bidData.item_id}`}>
      <ToastContainer />
    </Link>
  );
}
