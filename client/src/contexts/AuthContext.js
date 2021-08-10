import { createContext, useReducer, useEffect } from "react";
import axios from 'axios';
import authReducer from '../reducers/authReducer';
import { apiUrl, LOCAl_STORAGE_TOKEN_NAME } from './constants';
import setAuthToken from '../utils/setAuthToken'

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    })

    //Authenticate user
    const loadUser = async () => {
        if (localStorage.getItem(LOCAl_STORAGE_TOKEN_NAME)) {
            setAuthToken(localStorage.getItem(LOCAl_STORAGE_TOKEN_NAME))
            try {
                const response = await axios.get(`${apiUrl}/auth`);
                // console.log(response.data)
                if (response.data.success) {
                    dispatch({
                        type: 'SET_AUTH',
                        payload: {
                            isAuthenticated: true,
                            user: response.data.user,
                        }
                    })
                }
            }
            catch (err) {
                // console.log(err)
                localStorage.removeItem(LOCAl_STORAGE_TOKEN_NAME)
                setAuthToken(null)
                dispatch({
                    type: 'SET_AUTH',
                    payload: {
                        isAuthenticated: false,
                        user: null
                    }
                })
            }
        }
        else {
            setAuthToken(null)
            dispatch({
                type: 'SET_AUTH',
                payload: {
                    isAuthenticated: false,
                    user: null
                }
            })
        }

    }

    useEffect(() => {
        // console.log('effect auth')
        loadUser()
    }, [])

    //Login
    const loginUser = async (userForm) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, { ...userForm })
            if (response.data.success) {
                localStorage.setItem(LOCAl_STORAGE_TOKEN_NAME, response.data.accessToken)
            }
            await loadUser()
            return response.data
        }
        catch (err) {
            if (err.response.data) return err.response.data
            else return { success: false, message: err.message }
        }
    }

    //Register
    const registerUser = async (userForm) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/register`, { ...userForm })
            if (response.data.success) {
                localStorage.setItem(LOCAl_STORAGE_TOKEN_NAME, response.data.accessToken)
            }
            await loadUser()
            return response.data
        }
        catch (err) {
            if (err.response.data) return err.response.data
            else return { success: false, message: err.message }
        }
    }

    //Logout user
    const logoutUser = () => {
        localStorage.removeItem(LOCAl_STORAGE_TOKEN_NAME)
        setAuthToken(null)
        dispatch({
            type: 'SET_AUTH',
            payload: {
                isAuthenticated: false,
                user: null
            }
        })
    }

    //Context data
    const authContextData = { loginUser, authState, registerUser, logoutUser }

    //Return provider
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;