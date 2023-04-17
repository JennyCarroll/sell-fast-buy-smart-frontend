import React from 'react';

function SelectListOptions(props) {
  // Support functions
  const options = props.options.map((option) => (
    <option key={option.id} value={option.id}>
      {option.title}
    </option>
  ));

  return options;
}

export default SelectListOptions;
