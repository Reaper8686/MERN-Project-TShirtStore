import {useState} from "react";
import {signin, authenticate, isAuthenticate} from "../auth/helper";
import {Link, Redirect} from "react-router-dom";
import Base from "../core/Base";

function Signin() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  let {email, password, error, loading, didRedirect} = values;
  let {user} = isAuthenticate();

  const handleChange = (name) => (event) => {
    setValues({...values, error: false, [name]: event.target.value});
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({...values, error: false, loading: true});
    signin({email, password})
      .then((data) => {
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            loading: false,
            didRedirect: false,
          });
        } else {
          authenticate(data, () => {
            setValues({...values, loading: true, didRedirect: true});
          });
        }
      })
      .catch(console.log("errrrr"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard"></Redirect>;
      } else {
        return <Redirect to="/user"></Redirect>;
      }
    }
    if (isAuthenticate()) {
      return <Redirect to="/"></Redirect>;
    }
  };

  const handleLoading = () => {
    return (
      loading && (
        <div className="alert alert-info w-75 text-center">Loading...</div>
      )
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

  const signInForm = () => {
    return (
      <div className="row" style={{marginBottom: "67px"}}>
        <div className="col-md-6 offset-sm-4 text-left">
          {handleError()}
          {handleLoading()}
          {performRedirect()}
          <form>
            <div className="form-group my-3">
              <label className="text-light">Email</label>
              <input
                onChange={handleChange("email")}
                value={email}
                className="form-control w-75"
                type="email"
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                onChange={handleChange("password")}
                value={password}
                className="form-control w-75"
                type="password"
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
          <p>
            Don't have a account? create your account{" "}
            <Link to="/signup">here</Link>
          </p>
        </div>
      </div>
    );
  };
  return (
    <Base title="Sign In" description="signin here">
      {signInForm()}
    </Base>
  );
}

export default Signin;
