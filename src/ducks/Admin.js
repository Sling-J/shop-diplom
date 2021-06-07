const ADD_TO_ORDER = "ADD_TO_ORDER";
const AUTH = "AUTH";

const initialState = {
  orders: [],
  isAuth: false,
};

const admin = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_ORDER:
      return {
        ...state,
        orders: [
          ...state.orders,
          action.payload
        ],
      };

    case AUTH:
      return {
        ...state,
        isAuth: true,
      };

    default:
      return state
  }
};

export default admin

export const addToOrder = data => ({
  type: ADD_TO_ORDER,
  payload: data
});

export const auth = () => ({
  type: AUTH
});