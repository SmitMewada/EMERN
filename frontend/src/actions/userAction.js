import axios from "axios";
import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `http://localhost:4000/api/v1/login`,
      { email, password },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (err) {
    dispatch({ type: LOGIN_FAIL, payload: err.response.data.message });
  }
};

export const signup = (formData) => async (dispatch) => {
    try {
        const userDetails = { 
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password")
        };
        
        dispatch({type: SIGNUP_REQUEST});

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(`http://localhost:4000/api/v1/register`, userDetails, config);

        console.log(data)

        dispatch({type: SIGNUP_SUCCESS, payload: data});

       

    } catch (err) {
        dispatch({type: SIGNUP_REQUEST, error: err.response.data.message})
    }
}