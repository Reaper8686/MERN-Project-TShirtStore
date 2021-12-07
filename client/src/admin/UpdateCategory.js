import Base from "../core/Base";
import {Redirect} from "react-router-dom";
import {useEffect, useState} from "react";
import {isAuthenticate} from "../auth/helper/index";
import {getCategory, updateCategory} from "./helper/adminapicall";

function UpdateCategory({match}) {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  const {token, user} = isAuthenticate();

  useEffect(() => {
    getCategory(match.params.catagoryId).then((data) => {
      if (data?.error) {
        setName("");
        setError(data.error);
      } else {
        setName(data.name);
        setError(false);
      }
    });
  }, []);

  const handleChange = (event) => {
    setName(event.target.value);
    setError(false);
    setRedirect(false);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    updateCategory(match.params.catagoryId, user._id, token, {name}).then(
      (data) => {
        if (data?.error) {
          setError(data.error);
          setSuccess(false);
          setRedirect(false);
        } else {
          setName("");
          setError(false);
          setSuccess(true);
          setLoading(true);
          setTimeout(() => {
            setRedirect(true);
          }, 2000);
        }
      }
    );
  };

  const successMessage = () => {
    if (success) {
      return (
        <p className="alert alert-success">Category updated successfully!</p>
      );
    }
  };

  const errorMessage = () => {
    if (error) {
      return <p className="alert alert-danger">{error}</p>;
    }
  };

  const redirectTo = () => {
    if (redirect) {
      return <Redirect to="/admin/categories"></Redirect>;
    }
  };

  const categoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <label className="lead">Enter New Category Name</label>
          <input
            type="text"
            className="form-control w-75 mt-2"
            placeholder="For Ex. Summer"
            autoFocus
            required
            onChange={handleChange}
            value={name}
          />
        </div>
        {loading ? (
          <button
            className="btn btn-success btn-outline rounded my-3"
            type="button"
            disabled
          >
            <span
              className="spinner-border spinner-border-sm mx-2"
              role="status"
              aria-hidden="true"
            ></span>
            Loading...
          </button>
        ) : (
          <button
            onClick={onSubmit}
            className="btn btn-success btn-outline rounded my-3"
          >
            Update Category
          </button>
        )}
      </form>
    );
  };

  return (
    <Base
      title="Update Category"
      description="Update existing category here"
      className=" container bg-danger p-5"
    >
      <div className="row bg-white rounded p-4">
        <div className="col-8 offset-md-2">
          {redirectTo()}
          {successMessage()}
          {errorMessage()}
          {categoryForm()}
        </div>
      </div>
    </Base>
  );
}

export default UpdateCategory;
