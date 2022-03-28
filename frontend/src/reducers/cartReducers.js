import { ADD_ITEM_TO_CART, CART_EMPTY, REMOVE_CART_ITEM, SAVE_PAYMENT_METHOD, SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case ADD_ITEM_TO_CART:
            const item = action.payload;
            const existItem = state.cartItems.find(x => x._id === item._id)
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x._id === item._id ? item : x)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case REMOVE_CART_ITEM:
            return {
                ...state, cartItems: [...state.cartItems].filter(x => x._id !== action.payload)
            }
        case SAVE_SHIPPING_ADDRESS:
            return {
                ...state, shippingInfo: action.payload
            }
        case SAVE_PAYMENT_METHOD:
            return {
                ...state, paymentMethod: action.payload
            }
        case CART_EMPTY:
            return { ...state, cartItems: [] }
        default:
            return state
    }
}