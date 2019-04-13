import "./actionTypes";
import { REGISTER_USER_SUCCESS, LOGIN_USER_SUCCESS } from "./actionTypes";
import axios from "axios";

export const registerUser = (
  accountAddress,
  email,
  password,
  confirmPassword,
  privateKey
) => async dispatch => {
  console.log(accountAddress, email, password, confirmPassword, privateKey);
  // TODO: Allow admins to signup using referral
  if (password === confirmPassword) {
    const result = await axios.post("/api/auth/signup", {
      accountAddress,
      email,
      password,
      privateKey
    });
    console.log(result.data);
    // TODO: implement error handling
    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: { email: result.data.email, isAdmin: false }
    });
  } else {
    // TODO: notify error to user
  }
};

export const login = (email, password) => async dispatch => {
  const result = await axios.post("/api/auth/login", {
    email,
    password
  });
  console.log(result.data);

  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: { email: result.data.email, isAdmin: result.data.isAdmin }
  });
};
