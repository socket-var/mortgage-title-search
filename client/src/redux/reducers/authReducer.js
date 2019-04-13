import { REGISTER_USER_SUCCESS } from "../actionTypes";

const initialState = { isLoggedIn: false, user: {} };
export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_SUCCESS:
      return { isLoggedIn: true, user: action.payload };
    default:
      return state;
  }
};
