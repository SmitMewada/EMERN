import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../actions/productAction";
import "./productDetails.css";

const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    if (error) return alert.error(error);
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, error, alert, match.params.id]);

  return (
    <Fragment>
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
      </div>
    </Fragment>
  );
};

export default ProductDetails;
