import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../actions/productAction";
import ReactStars from "react-rating-stars-component";
import "./productDetails.css";
import Loader from "../layout/loader/Loader";

const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  const options = {
    edit: false,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 20,
    value: product.ratings,
    isHalf: true,
  };
  useEffect(() => {
    if (error) return alert.error(error);
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, error, alert, match.params.id]);

  return (loading) ? (<Loader />) : ( <Fragment>
    <div className="productDetails">
      <div>
        {
          <Carousel>
            {product.images &&
              product.images.map((item, i) => (
                <img
                  src={item.url}
                  alt={`${i} Slide`}
                  className="carouselImage"
                  key={item.url}
                />
              ))}
          </Carousel>
        }
      </div>

      <div>
        <div className="detailsBlock-1">
          <h2>{product.name}</h2>
          <p>Product # {product._id}</p>
        </div>

        <div className="detailsBlock-2">
          <ReactStars {...options} />
          <span>({product.numOfreviews} Reviews)</span>
        </div>

        <div className="detailsBlock-3">
          <h1>{`$${product.price}`}</h1>
          <div className="detailsBlock-3-1">
            <div className="detailsBlock-3-1-1">
              <button>-</button>
              <input type="number" value="1" />
              <button>+</button>
            </div>
            <button>Add to cart</button>
          </div>
          <p>
            Status{" "}
            <b className={product.stock < 1 ? "redColor" : "greenColor"}>
              {product.stock < 1 ? "Out of stock" : "In stock"}{" "}
            </b>
          </p>
        </div>

        <div className="detailsBlock-4">
          Description: <p>{product.description}</p>
        </div>

        <button className="submitReview">Submit</button>
      </div>
    </div>
  </Fragment>)
};

export default ProductDetails;
