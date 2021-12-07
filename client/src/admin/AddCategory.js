import Base from "../core/Base";
import {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import {isAuthenticate} from "../auth/helper/index";
import {createCategory} from "./helper/adminapicall";

function AddCategory() {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  const {token, user} = isAuthenticate();

  const handleChange = (event) => {
    setError(false);
    setSuccess(false);
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    createCategory(user._id, token, {name})
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setSuccess(false);
        } else {
          setError(false);
          setSuccess(true);
          setName("");
          setLoading(true);
          setTimeout(() => {
            setRedirect(true);
          }, 2000);
        }
      })
      .catch(console.log("error in category"));
  };

  const successMessage = () => {
    if (success) {
      return (
        <p className="alert alert-success">Category created successfully!</p>
      );
    }
  };

  const errorMessage = () => {
    if (error) {
      return <p className="alert alert-danger">Failed to save category!</p>;
    }
  };

  const redirectTo = () => {
    if (redirect) {
      return <Redirect to="/admin/categories"></Redirect>;
    }
  };

  const backButton = () => {
    return (
      <Link to="/admin/dashboard">
        <button className="btn btn-warning btn-sm rounded mb-3">back</button>
      </Link>
    );
  };

  const categoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <label className="lead">Enter Category Name</label>
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
            Create Category
          </button>
        )}
      </form>
    );
  };

  return (
    <Base
      title="Craete a category"
      description="Add a new category for new tshirts"
      className="container p-5 bg-danger rounded"
    >
      {backButton()}
      <div className="row bg-white rounded p-4" style={{marginBottom: "92px"}}>
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

export default AddCategory;
