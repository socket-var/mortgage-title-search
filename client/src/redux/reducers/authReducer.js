import {
  REGISTER_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS
} from "../actionTypes";

const initialState = {
  isUserLoggedIn: false,
  isApproverLoggedIn: false,
  isAdminLoggedIn: false,
  user: {}
};

const authHandler = action => {
  var { userType } = action.payload;
  console.debug(userType);
  if (userType === "approver") {
    return { isApproverLoggedIn: true, user: action.payload };
  } else if (userType === "admin") {
    return { isAdminLoggedIn: true, user: action.payload };
  } else {
    return { isUserLoggedIn: true, user: action.payload };
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_SUCCESS:
      return authHandler(action);
    case LOGIN_USER_SUCCESS:
      return authHandler(action);
    case LOGOUT_USER_SUCCESS:
      var { userType } = action.payload;
      return {
        isUserLoggedIn: false,
        isApproverLoggedIn: false,
        isAdminLoggedIn: false,
        user: {}
      };
    default:
      return state;
  }
};
