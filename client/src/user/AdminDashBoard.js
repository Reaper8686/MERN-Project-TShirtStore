import React from "react";
import Base from "../core/Base";
import {isAuthenticate} from "../auth/helper/index";
import {Link} from "react-router-dom";

function AdminDashBoard() {
  const {
    user: {name, email, role},
  } = isAuthenticate();

  const adminLeftSide = () => {
    return (
      <div className="card text-center">
        <h4 className="card-header bg-dark text-white">Admin Navigation </h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/category" className="nav-link text-danger">
              Create Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/categories" className="nav-link text-danger">
              Manage Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/product" className="nav-link text-danger">
              Create Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/products" className="nav-link text-danger">
              Manage Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/orders" className="nav-link text-danger">
              Order Details
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">Admin Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge bg-danger m-2">Name:</span>
            {name}
          </li>
          <li className="list-group-item">
            <span className="badge bg-danger m-2">Email:</span>
            {email}
          </li>
          <li className="list-group-item">
            <span className="badge bg-success">Admin Area</span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title="Welcome to Admin area"
      description="Manage all of your products here"
      className="container bg-danger p-4"
    >
      <div className="row">
        <div className="col-3">{adminLeftSide()}</div>
        <div className="col-9">{adminRightSide()}</div>
      </div>
    </Base>
  );
}

export default AdminDashBoard;
