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
  (keyword = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALL_PRODUCT_REQUEST,
      });

      let link = `http://localhost:4000/api/v1/products?keyword=${keyword}`;
      const data = await axios.get(link);

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data.data.products,
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
