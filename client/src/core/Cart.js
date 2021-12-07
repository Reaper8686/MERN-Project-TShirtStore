import {useEffect, useState} from "react";
import Card from "./Card";
import Base from "./Base";
import {loadCart} from "./helper/CartHelper";
// import StripePayment from "./StripePayment";
import BraintreePayment from "./BraintreePayment";
import {isAuthenticate} from "../auth/helper/index";
import {Link} from "react-router-dom";

function Cart() {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  const {user, token} = isAuthenticate();

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const totalAmount = () => {
    let sum = 0;
    products?.map((p) => (sum += p.price));
    return sum;
  };

  const backButton = () => {
    return (
      <Link to="/admin/dashboard">
        <button className="btn btn-warning btn-sm rounded mb-3">back</button>
      </Link>
    );
  };

  return (
    <Base title="Cart & Payment">
      {backButton()}

      <div className="row" style={{marginBottom: "140px"}}>
        <div className="col-6">
          <div className="row">
            {products?.length > 0 ? (
              products?.map((product, index) => {
                return (
                  <div key={index} className="col-6">
                    <Card
                      product={product}
                      addCart={false}
                      removeCart={true}
                      setReload={setReload}
                      reload={reload}
                    />
                  </div>
                );
              })
            ) : (
              <h1>Cart is Empty!!!</h1>
            )}
          </div>
        </div>
        <div className="col-6 text-center">
          <h3 className="text-center">Total {products?.length} products</h3>
          <div className="m-3 bg-dark p-2 rounded">
            <div className="row border-bottom m-2 border-1 border-light">
              <div className="col-6">
                <h4>Name</h4>
              </div>
              <div className="col-6">
                <h4>Price</h4>
              </div>
            </div>
            {products?.map((p) => {
              return (
                <div className="row border-bottom border-3 border-dark">
                  <div className="col-6">{p.name}</div>
                  <div className="col-6">${p.price}.00</div>
                </div>
              );
            })}
            <div className="row ">
              <div className="col-6 fw-bold p-3">
                <span className="bg-success px-2 py-1 rounded">total:</span>
              </div>
              <div className="col-6 fw-bold p-3">
                <span className="bg-success px-2 py-1 rounded">
                  ${totalAmount()}.00
                </span>
              </div>
            </div>
          </div>
          {user && products?.length > 0 ? (
            <BraintreePayment
              products={products}
              setReload={setReload}
              reload={reload}
            />
          ) : (
            <p>
              Add products to cart or <Link to="/signin">signin</Link>
            </p>
          )}
        </div>
      </div>
    </Base>
  );
}

export default Cart;
