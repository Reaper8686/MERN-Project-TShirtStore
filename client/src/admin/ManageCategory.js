import {useEffect, useState} from "react";
import Base from "../core/Base";
import {Link} from "react-router-dom";
import {deleteCategory, getAllCategories} from "./helper/adminapicall";
import {isAuthenticate} from "../auth/helper/index";

function ManageCategory() {
  const [values, setValues] = useState({
    categories: [],
    error: "",
    success: false,
  });
  const {categories, error, success} = values;

  const {token, user} = isAuthenticate();

  const preload = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        setValues({...values, error: data.error, success: false});
      } else {
        setValues({...values, categories: data, error: false, success: true});
      }
    });
  };
  useEffect(() => {
    preload();
  }, []);

  const deleteThisCategory = (id) => {
    deleteCategory(id, user._id, token).then((data) => {
      if (data?.error) {
        setValues({...values, error: data.error, success: false});
        console.log(error, data.error);
      } else {
        setValues({...values, error: false, success: true});
        preload();
      }
    });
  };

  const tableBody = (index, id, name) => {
    return (
      <div
        className="row text-center p-3 border-bottom border-4 border-light"
        key={index}
      >
        <div className="col-6">
          <h5>{name}</h5>
        </div>
        <div className="col-6">
          <Link to={`/admin/category/update/${id}`}>
            <span className="btn btn-sm btn-success mx-3 rounded">Update</span>
          </Link>
          <span
            className="btn btn-sm btn-danger rounded"
            onClick={() => {
              deleteThisCategory(id);
            }}
          >
            Delete
          </span>
        </div>
      </div>
    );
  };

  const goBackButton = () => {
    return (
      <div>
        <Link
          to="/admin/dashboard"
          className="btn btn-warning rounded btn-sm mb-4"
        >
          Admin home
        </Link>
      </div>
    );
  };

  return (
    <Base
      title="Manage categories"
      description="Manage all categories of product here"
      className="container bg-danger p-5 w-50"
    >
      <h1 className="text-center text-white mb-5">
        Total {categories.length} categories
      </h1>
      {goBackButton()}
      <div className="bg-white p-4">
        <div className="row border-bottom border-3 border-dark text-center">
          <div className="col-6">
            <h3>Name</h3>
          </div>
          <div className="col-6">
            <h3>Update/Delete</h3>
          </div>
        </div>
        {categories.map((category, index) => {
          return tableBody(index, category._id, category.name);
        })}
      </div>
    </Base>
  );
}

export default ManageCategory;
