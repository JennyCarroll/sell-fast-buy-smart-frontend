import "./Search.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState } from "react";
import { Link } from "react-router-dom";

function Search(props) {
  const items = props.items;

  const [searchInput, setSearchInput] = useState("");

  const handleBlur = (event) => {
    setTimeout(() => {
      setSearchInput("");
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
    <div className="nav search-bar-with-results">
      {/* <div class="input-group ps-5">
    <div id="navbar-search-autocomplete" class="form-outline">
      <input type="search" id="form1" class="form-control" />
      <label class="form-label" for="form1">Search</label>
    </div>
    <button type="button" class="btn btn-primary">
      <i class="fas fa-search"></i>
    </button>
  </div>
</div> */}

      <div className="input-group">
        <input
          id="search-bar"
          className="form-control"
          type="text"
          placeholder="Search items ..."
          onChange={handleChange}
          value={searchInput}
          onBlur={handleBlur}
        />
        <button className={"btn btn-primary mb1 bg-black"} type={"submit"}>
          <FontAwesomeIcon icon={icon({ name: "magnifying-glass" })} />
        </button>
      </div>
      <ul className="results">
        {filteredItems.map((item) => (
          <Link key={item.id} to={`/items/${item.id}`}>
            <p className="result-list">{item.title}</p>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Search;
