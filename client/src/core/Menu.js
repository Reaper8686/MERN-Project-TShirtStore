import {Fragment} from "react";
import {Link, withRouter} from "react-router-dom";
import {signout, isAuthenticate} from "../auth/helper/index";

function Menu({history}) {
  const currentTab = (history, path) => {
    if (history.location.pathname === path) {
      return {color: "#ee4e4e"};
    } else {
      return {color: "#d1d1d1"};
    }
  };
  return (
    <div>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link
            style={currentTab(history, "/")}
            className="nav-link border-0"
            to="/"
          >
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={currentTab(history, "/cart")}
            className="nav-link border-0"
            to="/cart"
          >
            Cart
          </Link>
        </li>
        {isAuthenticate() && (
          <li className="nav-item">
            <Link
              style={currentTab(history, "/user")}
              className="nav-link border-0"
              to="/user"
            >
              Profile
            </Link>
          </li>
        )}
        {isAuthenticate() && isAuthenticate().user.role === 1 && (
          <li className="nav-item">
            <Link
              style={currentTab(history, "/admin/dashboard")}
              className="nav-link border-0"
              to="/admin/dashboard"
            >
              Admin Dashboard
            </Link>
          </li>
        )}
        {!isAuthenticate() && (
          <Fragment>
            <li className="nav-item">
              <Link
                style={currentTab(history, "/signup")}
                className="nav-link border-0 border-0"
                to="/signup"
              >
                Sign Up
              </Link>
            </li>
            <li className="nav-item">
              <Link
                style={currentTab(history, "/signin")}
                className="nav-link border-0"
                to="/signin"
              >
                Sign In
              </Link>
            </li>
          </Fragment>
        )}
        {isAuthenticate() && (
          <li className="nav-item">
            <span
              onClick={() => {
                signout(() => {
                  history.push("/");
                });
              }}
              className="nav-link border-0 text-warning"
              role="button"
            >
              Sign Out
            </span>
          </li>
        )}
      </ul>
    </div>
  );
}

export default withRouter(Menu);
