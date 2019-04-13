import "./actionTypes";
import {
  REGISTER_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  GET_BC_DATA,
  GET_BUYER_RECORDS,
  GET_STATUS
} from "./actionTypes";
import axios from "axios";

export const registerUser = (
  email,
  password,
  confirmPassword
) => async dispatch => {
  // TODO: Allow admins to signup using referral
  if (password === confirmPassword) {
    const result = await axios.post("/api/auth/signup", {
      email,
      password
    });
    console.log(result.data);
    // TODO: implement error handling
    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: {
        email: result.data.email,
        isAdmin: false,
        userType: result.data.user.userType
      }
    });
  } else {
    // TODO: notify error to user
  }
};

export const loginUser = (email, password) => async dispatch => {
  const result = await axios.post("/api/auth/login", {
    email,
    password
  });
  console.log(result.data);

  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: {
      email: result.data.email,
      isAdmin: result.data.isAdmin,
      userType: result.data.user.userType
    }
  });
};

export const signoutUser = () => ({
  type: LOGOUT_USER_SUCCESS,
  payload: {}
});

export const getBCData = ownerName => async dispatch => {
  const result = await axios.post("/api/employee/get_data", {
    ownerName
  });
  console.log(result.data);
  // TODO: implement error handling
  dispatch({
    type: GET_BC_DATA,
    payload: { data: result.data }
  });
};

export const getBuyerRecords = ownerName => async dispatch => {
  const result = await axios.get("/api/employee/getBuyerRecords");
  console.log(result.data);
  // TODO: implement error handling
  dispatch({
    type: GET_BUYER_RECORDS,
    payload: { buyerRecords: result.data }
  });
};

export const getStatus = ownerName => async dispatch => {
  const result = await axios.post("/api/employee/getStatus", {
    ownerName
  });
  console.log(result.data);
  // TODO: implement error handling
  dispatch({
    type: GET_STATUS,
    payload: { buyerStatus: result.data }
  });
};
