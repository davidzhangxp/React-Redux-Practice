import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateUserProfile, userDetails } from '../actions/userActions'
import { LoadingBox } from '../components/LoadingBox'
import { MessageBox } from '../components/MessageBox'
import { USER_PROFILE_RESET } from '../constants/userConstants'

export const UserProfileScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin
    const userInfos = useSelector((state) => state.userDetails)
    const { loading, error, userDetailInfo } = userInfos
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdateProfile
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (!userInfo) {
            navigate('/signin')
        } else {
            if (!userDetailInfo) {
                dispatch({ type: USER_PROFILE_RESET })
                dispatch(userDetails(userInfo._id))
            } else {
                setName(userInfo.name)
                setEmail(userInfo.email)
            }
        }

    }, [dispatch, navigate, userDetailInfo, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== passwordConfirm) {
            alert('Password and confirm password are not matched')
        } else {
            dispatch(updateUserProfile({ _id: userInfo._id, name: name, email: email, password: password }))
        }
    }
    return (
        <div>
            {loading ? <LoadingBox></LoadingBox>
                : error ? <MessageBox variant='error'>{error}</MessageBox>
                    : <form className='form' onSubmit={submitHandler}>
                        {loadingUpdate && <LoadingBox></LoadingBox>}
                        {errorUpdate && <MessageBox variant='error'>{errorUpdate}</MessageBox>}
                        {successUpdate && <MessageBox variant='success'>Profile Updated Successfully</MessageBox>}

                        <div><h1>User Profile</h1></div>
                        <div>
                            <label htmlFor='name'>Name:</label>
                            <input id='name' type='text' placeholder='input name' value={name} onChange={(e) => setName(e.target.value)}></input>
                        </div>
                        <div>
                            <label htmlFor='email'>Email:</label>
                            <input id='email' type='email' placeholder='input email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        </div>
                        <div>
                            <label htmlFor='password'>Password:</label>
                            <input id='password' type='password' placeholder='input password' onChange={(e) => setPassword(e.target.value)}></input>
                        </div>
                        <div>
                            <label htmlFor='passwordConfirm'>Password Confirm:</label>
                            <input id='passwordConfirm' type='password' placeholder='confirm password' onChange={(e) => setPasswordConfirm(e.target.value)}></input>
                        </div>
                        <div>
                            <label></label>
                            <button className='primary' type='submit'>Update</button>
                        </div>
                    </form>
            }
        </div>
    )
}
