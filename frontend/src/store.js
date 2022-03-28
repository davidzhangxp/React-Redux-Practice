
import thunk from 'redux-thunk'
import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import { productDetailReducer, productListReducer } from './reducers/productReducers.js'
import { cartReducer } from './reducers/cartReducers.js'
import { userDetailsReducers, userRegisterReducers, userSignInReducers, userUpdateProfileReducers } from './reducers/userReducers.js'
import { orderCreateReducer, orderDetailReducer, orderMineListReducer, orderPayReducer } from './reducers/orderReducers.js'

const initialState = {
    cart:{
        cartItems: 
        localStorage.getItem("cartItems") ?  JSON.parse(localStorage.getItem("cartItems")) : [],
        shippingInfo: 
        localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {},
        paymentMethod:'PayPal',
    },
    userSignin:{
        userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null
    }
}
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailReducer,
    cart: cartReducer,
    userSignin: userSignInReducers,
    userRegister: userRegisterReducers,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailReducer,
    orderPay: orderPayReducer,
    orderMineList: orderMineListReducer,
    userDetails: userDetailsReducers,
    userUpdateProfile: userUpdateProfileReducers,
 
})

const composeEnhance = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer,initialState,composeEnhance(applyMiddleware(thunk)))

export default store;