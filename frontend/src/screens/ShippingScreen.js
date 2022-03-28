
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingInfo } from '../actions/cartActions';
import { CheckoutSteps } from '../components/CheckoutSteps'

export const ShippingScreen = () => {
  const dispatch = useDispatch()
  const userSignin = useSelector(state=>state.userSignin)
  const {userInfo} = userSignin
  const cart = useSelector(state=>state.cart)
  const {shippingInfo} = cart
  const navigate = useNavigate()
  const [fullName, setFullName] = useState(shippingInfo.fullName || '')
  const [address, setAddress] = useState(shippingInfo.address || '');
  const [city,setCity ] = useState(shippingInfo.city || '')
  const [state,setState ] = useState(shippingInfo.state || '')
  const [postalCode,setPostalCode ] = useState(shippingInfo.postalCode || '')
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingInfo({fullName,address,city,state,postalCode}))
    navigate('/payment')
  }
  useEffect(()=>{
    if(!userInfo){
      navigate('/signin?redirect=shipping')
    }
  },[navigate, userInfo])
  return (
    <div>
      <CheckoutSteps step1 step2 ></CheckoutSteps>
      <form className='form' onSubmit={submitHandler}>
        <div>
          <h1 style={{ "fontSize": "3rem", "alignSelf": "center" }}>Shipping Information</h1>
        </div>
        <div>
          <label htmlFor='fullName'>Full Name</label>
          <input
            name='fullName'
            type='text'
            id="fullName"
            required
            autoFocus
            placeholder='fullName'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}>
          </input>
        </div>
        <div>
          <label htmlFor='address'>Address</label>
          <input
            name='address'
            type='text'
            id="address"
            required
            placeholder='Address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}>
          </input>
        </div>
        <div>
        <label htmlFor='address'>City</label>
        <input
          name='city'
          type='text'
          id="city"
          required
          placeholder='City'
          value={city}
          onChange={(e) => setCity(e.target.value)}>
        </input>
      </div>
      <div>
      <label htmlFor='state'>State</label>
      <input
        name='state'
        type='text'
        id="state"
        required
        placeholder='State'
        value={state}
        onChange={(e) => setState(e.target.value)}>
      </input>
    </div>
    <div>
    <label htmlFor='postalCode'>postalCode</label>
    <input
      name='postalCode'
      type='text'
      id="postalCode"
      required
      placeholder='PostalCode'
      value={postalCode}
      onChange={(e) => setPostalCode(e.target.value)}>
    </input>
  </div>
        <div>
          <label />
          <button type='submit' className='primary' >Continue</button>
        </div>
      </form>
    </div>
  )
}
