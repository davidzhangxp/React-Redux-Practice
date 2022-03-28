import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userRegisterActions, userSigninActions } from '../actions/userActions.js'
import { LoadingBox } from '../components/LoadingBox.js'
import { MessageBox } from '../components/MessageBox.js'

export const RegisterScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister
    const location = useLocation()
    const redirect = location.search ? location.search.split("=")[1] : ""
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault();
        if(confirmPassword !== password){
            alert("confirm password and password are not match")
        }else{
            dispatch(userRegisterActions(name,email,password))

        }
    }
    useEffect(() => {
        if (userInfo) {
            dispatch(userSigninActions(email,password))
            navigate(`/${redirect}`)
        }
    }, [userInfo])

    const titleStyle = {
        fontSize: "3rem",
        alignSelf: "center"
    }
    return (
        <div>

            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1 style={titleStyle}>Create Account</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="error">{error}</MessageBox>}
                <div>
                    <label htmlFor='name'>Name</label>
                    <input type="text" name='name' id="name" required autoFocus placeholder='name' onChange={(e) => setName(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor='email'>Email Address</label>
                    <input type="email" name='email' id="email" required placeholder='Email' onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input type="password" name='password' id="password" required placeholder='password' onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div>
                <label htmlFor='confirmpassword'>Confirm Password</label>
                <input type="password" name='confirmpassword' id="confirmpassword" required placeholder='confirm password' onChange={(e) => setConfirmPassword(e.target.value)}></input>
            </div>
                <div>
                    <label></label>
                    <button className='primary' type="submit" >Submit</button>
                </div>
                <div>
                    <label />
                    <h2>Already have an account?
                    {location.search ? <Link to={`/signin?redirect=${redirect}`}>Sign In</Link> : <Link to="/signin">Sign In</Link>}
                      </h2>
                </div>
            </form>
        </div>
    )
}
