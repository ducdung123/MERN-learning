import { createContext, useReducer, useEffect, useState } from "react";
import axios from 'axios';
import postReducer from '../reducers/postReducer';
import {
    apiUrl, POST_LOADED_FAILE, POST_LOADED_SUCCESS, POST_CREATED, POST_UPDATED,
    POST_DELETED
} from './constants';

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
    const [postState, dispatch] = useReducer(postReducer, {
        posts: [],
        postLoading: true,
    })

    const [showAddPostModal, setShowAddPostModal] = useState(false)
    const [showUpdatePostModal, setShowUpdatePostModal] = useState({
        isDisplay: false,
        post: null,
    })

    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: ''
    })

    //Get all post
    const getPosts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/posts`)

            if (response.data.success) {
                dispatch({
                    type: POST_LOADED_SUCCESS,
                    payload: response.data.posts,
                })

            }
        }
        catch (err) {
            dispatch({
                type: POST_LOADED_FAILE,
                payload: [],
            })
            // return err.response.data ? err.response.data : { success: false, message: err.message }

        }
    }

    //Add post
    const addPost = async (form) => {
        try {
            const response = await axios.post(`${apiUrl}/posts`, { ...form })
            if (response.data.success) {
                dispatch({
                    type: POST_CREATED,
                    payload: response.data.post,
                })
                setShowToast({
                    show: true,
                    message: response.data.message,
                    type: 'success'
                })
            }
            return response.data
        }
        catch (err) {
            setShowToast({
                show: true,
                message: 'Error',
                type: 'danger'
            })
            // console.log(err)
            return { success: false, message: 'Error' }
        }
    }

    //UPdate post
    const updatedPost = async (updateForm, id) => {
        try {
            const response = await axios.put(`${apiUrl}/posts/${id}`, { ...updateForm })
            if (response.data.success) {
                setShowToast({
                    show: true,
                    message: response.data.message,
                    type: 'success'
                })
                dispatch({
                    type: POST_UPDATED,
                    payload: response.data.post,
                })

            }
            return response.data
        }
        catch (err) {
            setShowToast({
                show: true,
                message: 'Error',
                type: 'danger'
            })
            // console.log(err)
            return { success: false, message: 'Error' }
        }
    }


    //Delete post
    const deletePost = async (id) => {
        try {
            const response = await axios.delete(`${apiUrl}/posts/${id}`)
            if (response.data.success) {
                setShowToast({
                    show: true,
                    message: response.data.message,
                    type: 'warning'
                })
                dispatch({
                    type: POST_DELETED,
                    payload: response.data.post,
                })

            }
            return response.data
        }
        catch (err) {
            setShowToast({
                show: true,
                message: 'Error',
                type: 'danger'
            })
            // console.log(err)
            return { success: false, message: 'Error' }
        }
    }

    //Context data
    const postContextData = {
        postState,
        getPosts,
        showAddPostModal,
        setShowAddPostModal,
        addPost,
        showToast,
        setShowToast,
        showUpdatePostModal,
        setShowUpdatePostModal,
        updatedPost,
        deletePost
    }


    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider;