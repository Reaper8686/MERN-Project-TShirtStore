import {isAuthenticate} from "../auth/helper";
import {useState, useEffect} from "react";
import {loadCart, cartEmpty} from "./helper/CartHelper";
import {createOrder} from "./helper/orderhelper";
import {
  getBraintreeToken,
  createBrainstreePayment,
} from "./helper/paymenthelper";

import DropIn from "braintree-web-drop-in-react";

function BraintreePayment({products, setReload, reload}) {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    error: "",
    clientToken: null,
    instance: {},
  });

  const {token, user} = isAuthenticate();

  const getToken = (id, token) => {
    getBraintreeToken(id, token)
      .then((data) => {
        console.log(data);
        if (data?.error) {
          setInfo({...info, error: data.error});
        } else {
          setInfo({clientToken: data?.clientToken});
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (user) {
      getToken(user._id, token);
    }
  }, []);

  const brainTreeDropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products?.length > 0 ? (
          <div>
            <DropIn
              options={{authorization: info.clientToken}}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button className="btn btn-success rounded" onClick={onPurchase}>
              Buy
            </button>
          </div>
        ) : (
          <h4>Add product to cart</h4>
        )}
      </div>
    );
  };

  const totalAmount = () => {
    let sum = 0;
    products?.map((p) => (sum += p.price));
    return sum;
  };

  const onPurchase = () => {
    setInfo({loading: true});
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const paymentData = {
        token: nonce,
        amount: totalAmount(),
      };
      createBrainstreePayment(user._id, token, paymentData)
        .then((data) => {
          setInfo({...info, success: data, loading: false});
          let proWithCount = products.map((p) => {
            return {...p, count: 1};
          });
          console.log(proWithCount);
          const orderData = {
            products: proWithCount,
            transactionId: data.transaction.id,
            amount: data.transaction.amount,
          };
          createOrder(user._id, token, orderData).then((data) => {
            if (data?.error) {
              console.log(data.error);
            } else {
              console.log(data);
              console.log("Successs");
            }
          });
          cartEmpty();
          setReload(!reload);
        })
        .catch((err) => {
          setInfo({...info, error: err, loading: false});
        });
    });
  };

  return <div className="text-center">{brainTreeDropIn()}</div>;
}

export default BraintreePayment;
