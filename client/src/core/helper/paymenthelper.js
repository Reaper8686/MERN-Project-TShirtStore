import {API} from "../../backend";

export const getBraintreeToken = (useId, token) => {
  return fetch(`${API}/payment/braintree/token/${useId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const createBrainstreePayment = (useId, token, paymentInfo) => {
  return fetch(`${API}/payment/braintree/${useId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(paymentInfo),
  })
    .then((result) => {
      return result.json();
    })
    .catch((err) => console.log(err));
};
