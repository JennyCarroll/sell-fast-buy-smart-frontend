import "./Nav.scss";
import Search from "./Search";
import { Link } from "react-router-dom";
import { useContext, useState, useRef } from "react";
import { loginContext } from "../providers/UserContext";

function Nav(props) {
  let categories = props.categories;

  const [userId, setUserId] = useState(null);
  const { currentUser, login, logout } = useContext(loginContext);

  const inputRef = useRef(null);

  const bringInputToFocus = () => {
    inputRef.current && inputRef.current.focus();
  };

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
        <div className="nav search">
          <Search items={props.items} />
        </div>
        <div className="nav right-nav">
          {currentUser ? (
            <>
              <div className="">
                <Link to={"/items/new"}>
                  <p>Sell</p>
                </Link>
              </div>
              <div className="dropdown">
                <p>Profile</p>
                <div className="dropdown-content">
                  <Link
                    className="btn btn-light optio"
                    to={`/profile/${currentUser}`}
                  >
                    Profile
                  </Link>
                  <Link
                    className="btn btn-light option"
                    to={`/`}
                    onClick={() => logout()}
                  >
                    logout
                  </Link>
                </div>
              </div>
              <div className="">
                <Link to={`bids/${currentUser}`}>
                  <p>Bids</p>
                </Link>
              </div>
            </>
          ) : (
            <div className="dropdown">
              <button
                onMouseEnter={bringInputToFocus}
                className="btn btn-light login login"
              >
                Login / Sign Up
              </button>
              <div className="dropdown-content">
                <input
                  ref={inputRef}
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
          <div>
            <i
              className={
                props.theme ? "bi bi-lightbulb btn" : "bi bi-lightbulb-off btn"
              }
              onClick={() => {
                let theme = !props.theme;
                props.setTheme(theme);
              }}
            ></i>
          </div>
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
