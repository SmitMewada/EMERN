import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProducts } from "../../actions/productAction";
import Product from "../Home/Product";
import Loader from "../layout/loader/Loader";
import "./Products.css";

const Products = (props) => {
  const { match } = props;
  const dispatch = useDispatch();
  const keyword = match.params.keyword;
  const { products, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
   
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProducts(keyword));
  }, [dispatch, error, keyword]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
