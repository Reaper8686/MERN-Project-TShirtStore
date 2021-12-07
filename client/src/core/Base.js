import Menu from "./Menu";

function Base({
  title = "My title",
  description = "",
  className = "container text-white p-4",
  children,
}) {
  return (
    <div>
      <Menu />
      <div className="container-fluid">
        <div className="jumbotron text-white text-center py-3">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer className="footer bottom" style={{marginTop: "94px"}}>
        <div className="container-fluid bg-danger text-white text-center py-3">
          <h4>If you got question, feel free to reach out!</h4>
          <button className="bt btn-success btn-md rounded">
            <a href="https://github.com/Reaper8686" className="text-white">
              Contact Us
            </a>
          </button>
        </div>
        <div className="container">
          <span className="text-muted">Copyright © 2021</span>
        </div>
      </footer>
    </div>
  );
}

export default Base;
