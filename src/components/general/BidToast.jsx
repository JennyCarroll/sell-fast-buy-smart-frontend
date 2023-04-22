//Deprecated? Conflicts with other toasts
// when you click.

import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useContext } from 'react';
import { webSocketContext } from '../../providers/WebSocketContext';

export default function BidToast(props) {
  const { bidItem } = useContext(webSocketContext);

  return (
    <Link to={`/items/${bidItem}`}>
      <ToastContainer />
    </Link>
  );
}
