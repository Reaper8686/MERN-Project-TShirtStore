import {useState} from "react";
import {Link} from "react-router-dom";
import {signup} from "../auth/helper/index";
import Base from "../core/Base";

function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  let {name, email, password, error, success} = values;

  const handleChange = (name) => (e) => {
    setValues({...values, error: false, [name]: e.target.value});
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({...values, error: false});
    signup({name, email, password})
      .then((data) => {
        if (data.error) {
          setValues({...values, error: data.error, success: false});
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            email: "",
            success: true,
          });
        }
      })
      .catch(console.log("Signup error"));
  };

  const handleSuccess = () => {
    return (
      <div
        className="alert alert-success w-75"
        style={{display: success ? "" : "none"}}
      >
        New account as been created Successfully. Please
        <Link to="/signin">Login here</Link>
      </div>
    );
  };

  const handleError = () => {
    return (
      <div
        className="alert alert-danger w-75"
        style={{display: error ? "" : "none"}}
      >
        {error}
      </div>
    );
  };

  const signUpForm = () => {
    return (
      <div className="row" style={{marginBottom: "5px"}}>
        <div className="col-md-6 offset-sm-4 text-left">
          {handleError()}
          {handleSuccess()}
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                onChange={handleChange("name")}
                className="form-control w-75"
                type="text"
                value={name}
              />
            </div>
            <div className="form-group my-3">
              <label className="text-light">Email</label>
              <input
                onChange={handleChange("email")}
                className="form-control w-75"
                type="email"
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                onChange={handleChange("password")}
                className="form-control w-75"
                type="password"
                value={password}
              />
            </div>
            <div className="d-grid gap-2 w-75">
              <button
                onClick={onSubmit}
                className="btn btn-success my-3 rounded"
                type="button"
              >
                Submit
              </button>
            </div>
          </form>
          <p className="ms-1">
            Already Signedup? signin from <Link to="/signin">here</Link>
          </p>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign up" description="create your account here">
      {signUpForm()}
    </Base>
  );
}

export default Signup;
