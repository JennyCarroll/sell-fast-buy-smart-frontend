import { React } from 'react';
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
      <div className='item-info'>
        {props.bid && <div className='bid-price'>{bidToDollars(props.bid.highest_bid)}</div>}
        {props.edit && (
          <span>
            <FontAwesomeIcon icon={icon({ name: 'pen-to-square' })} className='bid-price' />
          </span>
        )}
      </div>
    </>
  );
}

export default Item;
