import React from "react";
import Base from "../core/Base";
import {useState, useEffect} from "react";
import {getUser, getPurchaseList} from "./helper/userapicalls";
import {isAuthenticate} from "../auth/helper/index";

function Profile() {
  const [aUser, setaUser] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const {user, token} = isAuthenticate();

  const loadUser = () => {
    getUser(user._id, token).then((data) => {
      if (data?.error) {
        console.log("error", data.error);
        setError(data.Error);
        setSuccess(false);
      } else {
        console.log("success", data);
        setaUser(data);
        setError("");
        setSuccess(true);
      }
    });
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <Base title="My Profile" className="container p-4 w-75">
      <div className="row" style={{marginBottom: "190px"}}>
        <div className="col-4">
          <div className="card mb-4">
            <h4 className="card-header">User Info</h4>
            <ul className="list-group">
              <li className="list-group-item fw-bold">
                <span className="badge bg-danger m-2">Name:</span>
                {aUser.name}
              </li>
              <li className="list-group-item  fw-bold">
                <span className="badge bg-danger m-2">Email:</span>
                {aUser.email}
              </li>
            </ul>
          </div>
        </div>
        <div className="col-8">
          <div className="card mb-4">
            <h4 className="card-header">Purchase List</h4>
            <ul className="list-group">
              {aUser.purchases?.map((pur, index) => {
                return (
                  <li className="list-group-item fw-bold" key={index}>
                    <div className="row">
                      <div className="col-4">
                        <span className="">
                          Name:{" "}
                          <span className="badge bg-danger">{pur.name}</span>
                        </span>
                      </div>
                      <div className="col-4">
                        <span className="">
                          Amount:{" "}
                          <span className="badge bg-danger">${pur.amount}</span>
                        </span>
                      </div>
                      <div className="col-4">
                        <span className="">
                          TransID:{" "}
                          <span className="badge bg-danger">
                            {pur.transaction_id}
                          </span>
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </Base>
  );
}

export default Profile;
