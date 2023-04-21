import "./Nav.scss";
import Search from "./Search";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { loginContext } from "../providers/UserContext";

function Nav(props) {
  let categories = props.categories;

  const [userId, setUserId] = useState(null);
  const { currentUser, login, logout } = useContext(loginContext);

  const handleChange = (event) => {
    setUserId(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      login(userId);
    }
  };

  console.log("currentUser", currentUser);
  return (
    <div className="nav nav-bar">
      <div className="nav top-nav">
        <div className="nav logo btn">
          <Link to={"/"}>
            <h1>SFBS</h1>
          </Link>
        </div>
        {/* leave this here till the favicon is finalized after we are sure about font
        <div className="fav">
          sell<br></br>buy
        </div> */}
        <div className="nav search">
          <Search items={props.items} />
        </div>
        <div className="nav right-nav">
          {currentUser ? (
            <>
              <div className="btn btn-light">
                <Link to={"/items/new"}>Sell</Link>
              </div>
              <div className="btn btn-light dropdown">
                Profile
                <div className="dropdown-content">
                  <Link
                    class="btn btn-light option"
                    to={`/profile/${currentUser}`}
                  >
                    Profile
                  </Link>
                  <Link
                    class="btn btn-light option"
                    to={`/`}
                    onClick={() => logout()}
                  >
                    logout
                  </Link>
                </div>
              </div>
              <div className="btn btn-light">
                <Link to={`bids/${currentUser}`}>Bids</Link>
              </div>
            </>
          ) : (
            <div className="dropdown">
              <button className="btn btn-light login login">
                Login / Sign Up
              </button>
              <div className="dropdown-content">
                <input
                  onKeyDown={handleKeyDown}
                  className="login form-control option"
                  placeholder="email"
                  onChange={handleChange}
                />
                <button
                  className="btn btn-light option"
                  id="login"
                  onClick={() => login(userId)}
                >
                  Login
                </button>
              </div>
            </div>
          )}
          {/* light bulb deal with dark mode and light mode */}
          <i
            class={props.theme ? "bi bi-lightbulb" : "bi bi-lightbulb-off"}
            onClick={() => {
              let theme = !props.theme;
              props.setTheme(theme);
            }}
          ></i>
        </div>
      </div>
      <div className="nav bottom-nav">
        <div className="nav categories">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/categories/${category.id}`}
              className="category"
            >
              <h2>{category.title}</h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Nav;
