import { GET_BUYER_RECORDS } from "../actionTypes";

const initialState = {
  data: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BUYER_RECORDS:
      return { buyerRecords: action.payload.buyerRecords };
    default:
      return state;
  }
};
