import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import { getProducts } from "../../actions/productAction";
import MetaData from "../layout/MetaData";
import "./home.css";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/loader/Loader";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) return alert.error(error);

    dispatch(getProducts());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      <MetaData title="Premium Merch." />
      <div className="banner">
        <p>
          Welcome to <span className="company">Premium Merch.</span>
        </p>
        <h1>Browse Amazing merchandise below</h1>

        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>

      <h2 className="homeHeading">Featured Products</h2>

      <div className="container" id="container">
        {loading ? (
          <Loader />
        ) : (
          products &&
          products.map((product) => <Product product={product} key={product._id}></Product>)
        )}
      </div>
    </Fragment>
  );
};

export default Home;
