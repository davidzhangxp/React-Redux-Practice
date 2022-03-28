import { USER_DETAIL_FAIL, USER_DETAIL_REQUEST, USER_DETAIL_SUCCESS, USER_PROFILE_UPDATE_FAIL, USER_PROFILE_UPDATE_REQUEST, USER_PROFILE_UPDATE_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT } from "../constants/userConstants"
import * as axios from 'axios'

export const userRegisterActions = (name, email, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST })
    try {
        const { data } = await axios.post("/api/users/register", { name, email, password })
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: USER_REGISTER_FAIL, payload: error.message && error.response.data.message ? error.response.data.message : error.message })
    }
}

export const userSigninActions = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST })
    try {
        const { data } = await axios.post("/api/users/signin", { email, password })
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
        localStorage.setItem("userInfo", JSON.stringify(data))
    } catch (error) {
        dispatch({ type: USER_SIGNIN_FAIL, payload: error.message && error.response.data.message ? error.response.data.message : error.message })
    }
}

export const signout = () => async (dispatch) => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingInfo")
    dispatch({ type: USER_SIGNOUT })
}

export const userDetails = (userId) => async (dispatch, getState) => {
    dispatch({ type: USER_DETAIL_REQUEST })
    try {
        const { userSignin: { userInfo } } = getState()
        const { data } = await axios.get(`/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        })
        dispatch({ type: USER_DETAIL_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: USER_DETAIL_FAIL, payload: error.message && error.response.data.message ? error.response.data.message : error.message })
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    dispatch({ type: USER_PROFILE_UPDATE_REQUEST })
    const { userSignin: { userInfo } } = getState()
    try {
        const { data } = await axios.put(
            `/api/users/update/${userInfo._id}`,
            user,
            {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            })
            dispatch({type: USER_PROFILE_UPDATE_SUCCESS, payload:data})
            dispatch({type: USER_SIGNIN_SUCCESS, payload:data})
            localStorage.setItem("userInfo", JSON.stringify(data))
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({ type: USER_PROFILE_UPDATE_FAIL, payload: message })
    }
}