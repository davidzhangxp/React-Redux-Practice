import React, { useEffect } from 'react'
import { CheckoutSteps } from '../components/CheckoutSteps'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createOrder } from '../actions/orderActions'
import { ORDER_RESET } from '../constants/orderConstants'
import { LoadingBox } from '../components/LoadingBox'
import { MessageBox } from '../components/MessageBox'

export const PlaceorderScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin
    const cart = useSelector(state => state.cart)
    if (!userInfo) {
        navigate('/signin?redirect=shipping')
    }
    const orderCreate = useSelector(state => state.orderCreate)
    const { loading, success, error, order } = orderCreate
    const toPrice = (num) => (Math.round(num * 100)) / 100
    cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.price * c.qty, 0))
    cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 10
    cart.taxPrice = toPrice(cart.itemsPrice * 0.15)
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice

    const submitHandler = () => {
        dispatch(createOrder({ ...cart, orderItems: cart.cartItems }))
    }
    useEffect(() => {
        if (success) {
            navigate(`/orders/${order._id}`)
            dispatch({ type: ORDER_RESET })
        }
    }, [dispatch, navigate, order, success])
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className='row top'>
                <div className='col-2'>
                    <ul>
                        <li>
                            <div className='card card-body'>
                                <h1>Shipping</h1>
                                <p>
                                    <strong>Name:</strong> {cart.shippingInfo.fullName}<br />
                                    <strong>Address</strong> {cart.shippingInfo.address},{cart.shippingInfo.city},
                                    {cart.shippingInfo.state},{cart.shippingInfo.postalCode}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h1>Payment</h1>
                                <p>
                                    <strong>paymentMethod:</strong> {cart.paymentMethod}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h1>Order Items</h1>
                                <ul>
                                    {cart.cartItems.map(item => (
                                        <li key={item.product}>
                                            <div className='row'>
                                                <div><img className='small' src={item.image} alt={item.name} /></div>
                                                <div className='min-30'>{item.name}</div>
                                                <div> {item.qty} X ${item.price} = ${item.qty * item.price}</div>

                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='col-1'>
                    <div className='card card-body'>
                        <ul>
                            <li>
                                <h2>Order Summary</h2>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Items Price:</div>
                                    <div>${cart.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Shipping Price:</div>
                                    <div>${cart.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Tax Price:</div>
                                    <div>${cart.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>total Price:</div>
                                    <div>${cart.totalPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <button
                                    type='button'
                                    className='primary block'
                                    disabled={cart.cartItems.length === 0}
                                    onClick={submitHandler}>
                                    Place Order</button>
                            </li>
                            {loading && <LoadingBox></LoadingBox>}
                            {error && <MessageBox variant='error'>{error}</MessageBox>}
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    )
}
