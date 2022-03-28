import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../actions/cartActions';
import { CheckoutSteps } from '../components/CheckoutSteps';

export const PaymentScreen = () => {
    const userSignin = useSelector(state=>state.userSignin)
    const { userInfo} = userSignin
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [paymentMethod, setPaymentMethod] = useState("PayPal")
    const submitHandler = (e) => {
        e.preventDefault();
        
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    useEffect(()=>{
        if(!userInfo){
            navigate('/signin?redirect=shipping')
        }
    },[navigate, userInfo])
    return (
        <div>
            <CheckoutSteps step1 step2 step3 ></CheckoutSteps>

            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1 style={{ "alignSelf": "center" }}>Payment Method</h1>
                </div>
                <div>
                    <div>
                        <input
                            type="radio"
                            id="PayPal"
                            name="Payment"
                            value="PayPal"
                            checked
                            required
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                        </input>
                        <label htmlFor='PayPal'>PayPal</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input
                            type="radio"
                            id="Stripe"
                            name="Payment"
                            value="Stripe"
                            
                            required
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                        </input>
                        <label htmlFor='Stripe'>Stripe</label>
                    </div>
                </div>
                <div>
                    <button type='submit' className='primary'>Continue</button>
                </div>
            </form>
        </div>
    )
}
