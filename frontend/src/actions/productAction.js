import axios from "axios";
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  CLEAR_ERRORS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
} from "../constants/productConstants";

export const getProducts =
  (
    keyword = "",
    currentPage = 1,
    price = undefined,
    category = undefined,
    ratings = undefined
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALL_PRODUCT_REQUEST,
      });

      currentPage = ratings ? 1 : currentPage;

      let link = `http://localhost:4000/api/v1/products?page=${currentPage}`;

      link = keyword ? link + `&keyword=${keyword}` : link;

      link = price ? link + `&price[gte]=${price[0]}&price[lte]=${price[1]}` : link;

      link = ratings ? link + `&ratings[gte]=${ratings}` : link;

      link = category ? (category !== "All" ? link + `&category=${category}` : link) : link;

      const data = await axios.get(link);

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response
          ? error.response.data.message
          : "Unable to connect with server! please try again later.",
      });
    }
  };

export const getProductDetails = (productID) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    });

    const data = await axios.get(
      `http://localhost:4000/api/v1/product/${productID}`
    );

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response
        ? error.response.data.message
        : "Unable to connect with server! please try again later.",
    });
  }
};

// Clearing all errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
