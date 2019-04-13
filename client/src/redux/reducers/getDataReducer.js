import { GET_STATUS } from "../actionTypes";

const initialState = {
  data: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_STATUS:
      console.debug(action.payload);
      return { buyerStatus: action.payload.buyerStatus };
    default:
      return state;
  }
};
