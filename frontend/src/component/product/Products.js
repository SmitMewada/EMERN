import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProducts } from "../../actions/productAction";
import Product from "../Home/Product";
import Loader from "../layout/loader/Loader";
import Pagination from "react-js-pagination";
import "./Products.css";

const Products = (props) => {
  const { match } = props;
  const dispatch = useDispatch();
  const keyword = match.params.keyword;
  const { data, loading, error } = useSelector((state) => state.products);

  const [currentPage, setCurrentPage ] = useState(1);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e)
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProducts(keyword, currentPage));
  }, [dispatch, error, keyword, currentPage]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {data &&
              data.products.map((product) => (
                <Product product={product} key={product._id} />
              ))}
          </div>
          {/* {
            data && console.log(data)
          } */}
          <div className="paginationBox">
            {data && (
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
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
