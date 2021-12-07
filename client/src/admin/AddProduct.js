import {useEffect, useState} from "react";
import Base from "../core/Base";
import {Link, Redirect} from "react-router-dom";
import {isAuthenticate} from "../auth/helper/index";
import {getAllCategories, createProduct} from "./helper/adminapicall";

function AddProduct() {
  const {token, user} = isAuthenticate();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    photo,
    categories,
    category,
    loading,
    error,
    createdProduct,
    redirect,
    formData,
  } = values;

  useEffect(() => {
    getAllCategories()
      .then((data) => {
        if (data.error) {
          setValues({...values, error: data.error});
        } else {
          setValues({...values, categories: data, formData: new FormData()});
        }
      })
      .catch(console.log("errr"));
  }, []);

  const handleChange = (name) => (event) => {
    let value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({...values, [name]: value});
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({...values, error: "", loading: true});
    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          loading: false,
          redirect: false,
        });
      } else {
        setValues({
          ...values,
          createdProduct: data.name,
          name: "",
          description: "",
          price: "",
          photo: "",
          stock: "",
          error: "",
          formData: "",
          loading: true,
        });
        setTimeout(() => {
          setValues({...values, redirect: true});
        }, 2000);
      }
    });
  };

  const redirectTo = () => {
    if (redirect) {
      return <Redirect to="/admin/products"></Redirect>;
    }
  };

  const successaMessage = () => {
    if (createdProduct && !error)
      return (
        <p className="alert alert-success">
          Product {createdProduct} created succesfully!!
        </p>
      );
  };

  const errorMessage = () => {
    if (error) {
      return <p className="alert alert-danger">{error}</p>;
    }
  };

  const backButton = () => {
    return (
      <Link to="/admin/dashboard">
        <button className="btn btn-warning btn-sm rounded mb-3">back</button>
      </Link>
    );
  };

  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group mb-3">
        <label className="btn btn-block btn-success rounded btn-sm">
          <input
            onChange={handleChange("photo")}
            type="file"
            accept="image"
            required
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group my-3">
        <input
          onChange={handleChange("name")}
          className="form-control w-75"
          placeholder="Name"
          value={name}
          autoFocus
        />
      </div>
      <div className="form-group my-3">
        <textarea
          onChange={handleChange("description")}
          className="form-control w-75"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group my-3">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control w-75"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group my-3">
        <select
          onChange={handleChange("categoryid")}
          className="form-control w-25"
          placeholder="Category"
        >
          <option>Select</option>
          {categories.map((cate, index) => {
            return (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-group my-3">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control w-75"
          placeholder="stocks"
          value={stock}
        />
      </div>

      {loading ? (
        <button className="btn btn-success rounded" type="button" disabled>
          <span
            className="spinner-border spinner-border-sm mx-2"
            role="status"
            aria-hidden="true"
          ></span>
          Loading...
        </button>
      ) : (
        <button
          type="submit"
          onClick={onSubmit}
          className="btn btn-success rounded"
        >
          Create Product
        </button>
      )}
    </form>
  );

  return (
    <Base
      title="Add product"
      description="Add all product for store from here"
      className="container p-5 bg-danger rounded w-75"
    >
      {backButton()}
      <div className="row bg-white rounded p-3">
        <div className="col-8 offset-2">
          {successaMessage()}
          {errorMessage()}
          {redirectTo()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
}

export default AddProduct;
