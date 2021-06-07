const CLEAR_CART = "CLEAR_CART";
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const CHANGE_ITEM_COUNT = "CHANGE_ITEM_COUNT";

const initialState = {
  items: []
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_CART:
      return {
        ...state,
        items: []
      };

    case ADD_TO_CART:
      const ADDFoundItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      const newItems = [...state.items];

      if (ADDFoundItemIndex !== -1) {
        newItems[ADDFoundItemIndex].count = newItems[ADDFoundItemIndex].count + 1;
      }

      return {
        ...state,
        items: ADDFoundItemIndex !== -1
          ? newItems
          : [
            ...state.items,
            {
              ...action.payload,
              count: 1,
            }
          ]
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };

    case CHANGE_ITEM_COUNT:
      const CHANGEFoundItemIdx = state.items.findIndex(item => item.id === action.payload.id);
      const newItems2 = [...state.items];
      newItems2[CHANGEFoundItemIdx].count = action.payload.count;

      return {
        ...state,
        items: newItems2
      };

    default:
      return state
  }
};

export default cart

export const addToCart = item => ({
  type: ADD_TO_CART,
  payload: item
});

export const removeFromCart = id => ({
  type: REMOVE_FROM_CART,
  payload: id
});

export const changeItemCount = data => ({
  type: CHANGE_ITEM_COUNT,
  payload: data
});

export const clearCart = () => ({
  type: CLEAR_CART
});