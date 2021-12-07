import {isAuthenticate} from "../auth/helper/index";
import {getAllOrders} from "./helper/adminapicall";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function Order() {
  const [orders, setOrders] = useState([]);
  const [erorr, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const {user, token} = isAuthenticate();

  const loadOrder = () => {
    getAllOrders(user._id, token)
      .then((data) => {
        if (data?.error) {
          console.log("error", data.error);
          setError(data.error);
          setSuccess(false);
        } else {
          console.log("success", data);
          setOrders(data);
          setError(false);
          setSuccess(true);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadOrder();
  }, []);

  const backButton = () => {
    return (
      <Link to="/admin/dashboard">
        <button className="btn btn-warning btn-sm rounded">back</button>
      </Link>
    );
  };

  return (
    <div className="container">
      <div className="bg-light p-4">
        {backButton()}
        <h1 className="text-center">Order Details</h1>
        {orders.map((order, index) => {
          return (
            <div
              className="main p-3 mb-4 rounded  "
              style={{backgroundColor: "#ffe6e6"}}
              key={index}
            >
              <div className="row text-center pb-3 ">
                <div className="col-4 fw-bold">
                  orderid:
                  <span className="bg-success rounded p-1 text-white">
                    {order._id}
                  </span>
                </div>
                <div className="col-4 fw-bold">
                  transactionId:
                  <span className="bg-success rounded p-1 text-white">
                    {order.transactionId}
                  </span>
                </div>
                <div className="col-4 fw-bold">
                  Amount:
                  <span className="bg-success rounded p-1 text-white">
                    ${order.amount}.00
                  </span>
                </div>
              </div>
              <div className="row text-center p-3">
                <div className="col-6 border border-3 border-dark">
                  <h3>products</h3>
                  {order.products.map((pro) => {
                    return (
                      <div className="row m-2">
                        <div className="col-6 fw-bold b">{pro.name}</div>
                        <div className="col-6 fw-bold ">${pro.price}.00</div>
                      </div>
                    );
                  })}
                </div>
                <div className="col-6 fw-bold border border-3 border-dark">
                  <h3>user</h3>
                  <p>
                    Name:
                    <span className="bg-success rounded p-1 text-white">
                      {order.user.name}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Order;
