import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import {isAuthenticate} from "../auth/helper/index";
import StripeButton from "react-stripe-checkout";
import {API} from "../backend";
import {cartEmpty} from "./helper/CartHelper";

function StripePayment({products, setReload, reload}) {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const {loading, success, error, address} = data;

  // const {userToken, user} = isAuthenticate();

  const getTotalPrice = () => {
    let sum = 0;
    products.map((p) => {
      sum = sum + p.price;
    });
    return sum;
  };

  const makePayment = (token) => {
    const headers = {"Content-Type": "application/json"};
    const body = {token, products};
    return fetch(`${API}/payment/stripe`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        cartEmpty();
        setReload(!reload);
      })
      .catch((err) => console.log(err));
  };

  const checkoutButton = () => {
    return isAuthenticate() ? (
      <StripeButton
        stripeKey="pk_test_51K2XASSHt8HhsXdhZ5nwfdu5P4ZrqQbtIPYK4SuDFfLcRj4ZaKTUHtQTfokhnYQzLmon2832m2LsGixPwBYfCAe500u6dau2c4"
        token={makePayment}
        amount={products ? getTotalPrice() * 100 : 0}
        name="Buy Tshirt's"
        billingAddress
        shippingAddress
      >
        <button className="btn btn-success rounded btn-md">Stripe pay</button>
      </StripeButton>
    ) : (
      <Link to="/signin" className="btn btn-warning rounded btn-md">
        Signin
      </Link>
    );
  };

  return (
    <div className="text-center">
      <h3>Stripe Method</h3>
      {checkoutButton()}
    </div>
  );
}

export default StripePayment;
