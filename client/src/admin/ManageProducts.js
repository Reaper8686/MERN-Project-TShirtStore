import {useEffect, useState} from "react";
import Base from "../core/Base";
import {isAuthenticate} from "../auth/helper/index";
import {deleteProduct, getAllProducts} from "./helper/adminapicall";
import {Link} from "react-router-dom";

function ManageProduct() {
  const {user, token} = isAuthenticate();

  const [values, setValues] = useState({
    products: [],
    error: false,
    success: false,
  });
  const {products, error, success} = values;

  const preload = () => {
    getAllProducts(user._id, token).then((data) => {
      if (data.error) {
        setValues({...values, error: data.error});
      } else {
        setValues({...values, products: data, error: false});
        console.log(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const tableBody = (index, id, name, price, stock) => {
    return (
      <div
        className="row my-3 border-bottom border-4 border-light text-center"
        key={index}
      >
        <div className="col-3">
          <h5>{name}</h5>
        </div>
        <div className="col-3">
          <h5>${price}</h5>
        </div>
        <div className="col-3">
          <h5>{stock}</h5>
        </div>
        <div className="col-3">
          <Link to={`/admin/product/update/${id}`}>
            <span className="btn btn-success btn-sm mx-4 rounded">Update</span>
          </Link>
          <span
            className="btn btn-danger btn-sm rounded"
            onClick={() => {
              deleteThisProduct(id);
            }}
          >
            Delete
          </span>
        </div>
      </div>
    );
  };

  const deleteThisProduct = (id) => {
    deleteProduct(id, token, user._id).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          success: false,
        });
      } else {
        setValues({...values, error: false, success: true});
        preload();
      }
    });
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
      title="Manage products"
      description="Manage all products here"
      className="container bg-danger p-5 rounded"
    >
      <h1 className="text-center my-4 text-white">
        Total {products.length} Products
      </h1>
      {goBackButton()}
      <div className="rounded bg-white p-4">
        <div className="row border-bottom border-3 border-dark text-center">
          <div className="col-3">
            <h3>Name</h3>
          </div>
          <div className="col-3">
            <h3>Price</h3>
          </div>
          <div className="col-3">
            <h3>Stocks</h3>
          </div>
          <div className="col-3">
            <h3>Update/Delete</h3>
          </div>
          <div className="col-3">
            <h3>
              {products.map((pro) => {
                return pro.category;
              })}
            </h3>
          </div>
        </div>
        {products.map((product, index) => {
          return tableBody(
            index,
            product._id,
            product.name,
            product.price,
            product.stock
          );
        })}
      </div>
    </Base>
  );
}

export default ManageProduct;
