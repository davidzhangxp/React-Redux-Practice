import { USER_DETAIL_FAIL, USER_DETAIL_REQUEST, USER_DETAIL_SUCCESS, USER_PROFILE_RESET, USER_PROFILE_UPDATE_FAIL, USER_PROFILE_UPDATE_REQUEST, USER_PROFILE_UPDATE_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT } from "../constants/userConstants";

export const userSignInReducers = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { loading: true }
        case USER_SIGNIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_SIGNIN_FAIL:
            return { loading: false, error: action.payload }
        case USER_SIGNOUT:
            return {}
        default:
            return state;
    }
}
export const userRegisterReducers = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true };
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}
export const userDetailsReducers = (state = { loading: true }, action) => {
    switch (action.type) {
        case USER_DETAIL_REQUEST:
            return { loading: true };
        case USER_DETAIL_SUCCESS:
            return { loading: false, userDetailInfo: action.payload };
        case USER_DETAIL_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const userUpdateProfileReducers = (state = {}, action) => {
    switch (action.type) {
        case USER_PROFILE_UPDATE_REQUEST:
            return { loading: true };
        case USER_PROFILE_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case USER_PROFILE_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case USER_PROFILE_RESET:
            return {}
        default:
            return state;
    }
}
