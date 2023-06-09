import './Search.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Search(props) {
  const items = props.items;
  const [searchInput, setSearchInput] = useState('');

  const handleBlur = () => {
    setTimeout(() => {
      setSearchInput('');
    }, 100);
  };

  const handleChange = (event) => {
    event.preventDefault();
    setSearchInput(event.target.value);
  };

  let filteredItems = [];
  if (searchInput.length > 0) {
    filteredItems = items.filter((item) => {
      return item.title.toLowerCase().includes(searchInput);
    });
  }

  return (
    <div className='nav search-bar-with-results'>
      <div className='input-group'>
        <input
          id='search-bar'
          className='form-control search-bar'
          type='text'
          placeholder='Search items ...'
          onChange={handleChange}
          value={searchInput}
          onBlur={handleBlur}
        />
        <button className={'btn btn-dark'} type={'submit'}>
          <FontAwesomeIcon icon={icon({ name: 'magnifying-glass' })} />
        </button>
      </div>
      <ul className='results'>
        {filteredItems.map((item) => (
          <Link className='search-result-link' key={item.id} to={`/items/${item.id}`}>
            <div className='search-result'>
              <p className='result-list'>{item.title}</p>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Search;
