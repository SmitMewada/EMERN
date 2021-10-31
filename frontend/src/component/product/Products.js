import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProducts } from "../../actions/productAction";
import { useAlert } from "react-alert";
import Product from "../Home/Product";
import Loader from "../layout/loader/Loader";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import "./Products.css";
import MetaData from "../layout/MetaData";

const categories = ["All", "Tshirt", "Laptop", "Footwear", "Shirt", "Tops", "Attire"];
const Products = (props) => {
  const { match } = props;
  const alert = useAlert();

  const [price, setPrice] = useState([0, 5000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const dispatch = useDispatch();
  const keyword = match.params.keyword;
  const { data, loading, error } = useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProducts(keyword, currentPage, price, category, ratings));
  }, [dispatch, error, keyword, currentPage, price, alert, category, ratings]);

  return (
    <Fragment>
      <MetaData title="Products - Premium Merch."/>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {data &&
              (data.products.length === 0
                ? "Products not found!"
                : data.products.map((product) => (
                    <Product product={product} key={product._id} />
                  )))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>

            <Slider
              getAriaLabel={() => "Price range"}
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              min={0}
              max={5000}
            />

            <Typography>Category</Typography>

            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="categoryLink"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {" "}
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => setRatings(newRating)}
                aria-labelledby="continous-slider"
                min={0}
                max={5}
                valueLabelDisplay="auto"
              ></Slider>
            </fieldset>
          </div>

          {data && data.resultsPerPage < data.filteredProductCount && (
            <div className="paginationBox">
              {
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={data.resultsPerPage}
                  totalItemsCount={data.productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="1st"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              }
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
