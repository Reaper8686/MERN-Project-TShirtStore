import {API} from "../../backend";

function ImageHelper({product}) {
  let imageUrl = product
    ? `${API}/product/photo/${product._id}`
    : "https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

  return (
    <div>
      <img
        src={imageUrl}
        alt="photo"
        style={{maxHeight: "100%", maxWidth: "100%"}}
        className="card-img-top"
      />
    </div>
  );
}

export default ImageHelper;
