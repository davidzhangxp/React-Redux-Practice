import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_DETAIL_REQUEST, ORDER_DETAIL_FAIL, ORDER_DETAIL_SUCCESS, ORDER_PAY_REQUEST, ORDER_PAY_FAIL, ORDER_PAY_SUCCESS, ORDER_MINE_LIST_REQUEST, ORDER_MINE_LIST_FAIL, ORDER_MINE_LIST_SUCCESS } from '../constants/orderConstants'
import * as axios from 'axios'
import { CART_EMPTY } from '../constants/cartConstants'

export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order })
    try {
        const { userSignin: { userInfo } } = getState()

        const { data } = await axios.post('/api/orders', order, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order })
        dispatch({ type: CART_EMPTY })
        localStorage.removeItem("cartItems")
    } catch (error) {
        dispatch({ type: ORDER_CREATE_FAIL, payload: error.message && error.response.data.message ? error.response.data.message : error.message })
    }
}

export const detailsOrder = (orderId) => async (dispatch, getState) => {
    dispatch({ type: ORDER_DETAIL_REQUEST })
    try {
        const { userSignin: { userInfo } } = getState()
        const { data } = await axios.get(`/api/orders/detail/${orderId}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: ORDER_DETAIL_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: ORDER_DETAIL_FAIL, payload: error.message && error.response.data.message ? error.response.data.message : error.message })
    }
}

export const payOrder = (order, paymentResult) => async (dispatch, getState) => {
    dispatch({ type: ORDER_PAY_REQUEST })
    const { userSignin: { userInfo } } = getState()
    try {
        const { data } = await axios.put(`/api/orders/${order._id}/pay`, paymentResult, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        })
        dispatch({ type: ORDER_PAY_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({ type: ORDER_PAY_FAIL, payload: message })
    }
}

export const orderListHistory = () => async (dispatch, getState) => {
    dispatch({ type: ORDER_MINE_LIST_REQUEST })
    const { userSignin: { userInfo } } = getState()
    try {
        const { data } = await axios.get('/api/orders/mine', {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        })
        dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({ type: ORDER_MINE_LIST_FAIL, payload: message })
    }
}
