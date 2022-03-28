import * as axios from "axios"
import { ADD_ITEM_TO_CART, REMOVE_CART_ITEM, SAVE_PAYMENT_METHOD, SAVE_SHIPPING_ADDRESS } from '../constants/cartConstants'

export const addToCart = (productId, qty) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`/api/products/${productId}`)
        dispatch({
            type: ADD_ITEM_TO_CART,
            payload: {
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                product: data._id,
                qty: qty,
            }
        });
        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
    } catch (error) {
        console.log(error.message)
    }
}

export const removeCartItem = (productId) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_CART_ITEM,
        payload: productId
    })
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({ type: SAVE_SHIPPING_ADDRESS, payload: data })
    localStorage.setItem("shippingInfo", JSON.stringify(data))
}

export const savePaymentMethod = (data) =>async(dispatch)=> {
    dispatch({type:SAVE_PAYMENT_METHOD,payload:data})
}