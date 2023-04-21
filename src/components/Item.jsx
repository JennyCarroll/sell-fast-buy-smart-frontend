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

  const onEdit = () => {
    console.log('onEdit, props.itemId', props.itemId);
  };

  return (
    <>
      <img className='item-image' src={props.photo} alt={props.title} />
      {props.bid && <span className='bid-price'>{bidToDollars(props.bid.highest_bid)}</span>}
      {props.edit && (
        <span>
          <FontAwesomeIcon icon={icon({ name: 'pen-to-square' })} className='edit-icon' />
        </span>
      )}
    </>
  );
}

export default Item;
