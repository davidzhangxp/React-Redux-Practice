import React, { useEffect, useState } from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom' 
import { useDispatch, useSelector } from 'react-redux'
import { userSigninActions } from '../actions/userActions.js'
import { LoadingBox } from '../components/LoadingBox.js'
import { MessageBox } from '../components/MessageBox.js'

export const SigninScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const userSignin = useSelector(state=>state.userSignin)
    const {loading,error,userInfo} = userSignin
    const location = useLocation()
    const redirect = location.search ? location.search.split("=")[1] : ""
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault();       
        dispatch(userSigninActions(email,password))

    }
    useEffect(()=>{
        if(userInfo){
            navigate(`/${redirect}`)
        }
    },[navigate, redirect, userInfo])

    const titleStyle = {
        fontSize:"3rem",
        alignSelf:"center"
    }
    return (
        <div>

            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1 style={titleStyle}>Sign In</h1>
                </div>
                {loading && <LoadingBox></LoadingBox> }
                {error && <MessageBox variant="error">{error}</MessageBox>}
                <div>
                    <label htmlFor='email'>Email Address</label>
                    <input type="email" name='email' id="email" required autoFocus placeholder='Email' onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input type="password" name='password' id="password" required placeholder='password' onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div>
                    <label></label>
                    <button className='primary' type="submit" >Submit</button>
                </div>
                <div>
                <label/>
                <h2>New customer?  
                {location.search ? 
                    <Link to={`/register?redirect=${redirect}`}>Sign Up</Link> :
                <Link to="/register">Sign Up</Link> }
                </h2>
                </div>
            </form>
        </div>
    )
}
