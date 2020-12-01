import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

export const orderReducer = (currentState = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...currentState,
        loading: true,
      };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId,
        loading: false,
      };
      return {
        ...currentState,
        loading: false,
        orders: currentState.orders.concat(newOrder),
        purchased: true, //using concat to create a new combining array without mutate the old array
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...currentState,
        loading: false,
      };
    case actionTypes.PURCHASE_INIT:
      return {
        ...currentState,
        purchased: false,
      };
    case actionTypes.FECTCH_ORDERS_START:
      return {
        ...currentState,
        loading: true,
      };
    case actionTypes.FECTCH_ORDERS_SUCCESS:
      return {
        ...currentState,
        orders: action.orders,
        loading: false,
      };
    case actionTypes.FECTCH_ORDERS_FAIL:
      return {
        ...currentState,
        loading: false,
      };
    default:
      return currentState;
  }
};
