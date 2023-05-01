import { React } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import './Item.scss';

function Item(props) {
  const bidToDollars = function (value) {
    return (value / 100).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  return (
    <>
      <img className='item-image' src={props.photo} alt={props.title} />
      {props.bid && <span className='bid-price'>{bidToDollars(props.bid.highest_bid)}</span>}
      {props.edit && (
        <span>
          <Link to={`/items/${props.itemId}/edit`}>
            <FontAwesomeIcon
              icon={icon({ name: 'pen-to-square' })}
              className='edit-icon'
              size='xs'
            />
          </Link>
        </span>
      )}
    </>
  );
}

export default Item;
