import * as actions from '../contexts/constants'
const postReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case actions.POST_LOADED_SUCCESS: {
            let newState = { ...state };
            newState.postLoading = false;
            return {
                ...newState,
                posts: payload
            }
        }

        case actions.POST_LOADED_FAILE: {
            let newState = { ...state };
            //newState.postLoading = false;
            return {
                ...newState,
                posts: payload
            }
        }
        case actions.POST_CREATED: {
            let newState = { ...state };
            //newState.postLoading = false;
            return {
                ...newState,
                posts: [...state.posts, payload]
            }
        }
        case actions.POST_UPDATED: {
            let newState = { ...state };
            //newState.postLoading = false;
            let {description, status, title, url} = payload
            newState.posts = newState.posts.map((post)=>{
                if(post._id === payload._id){
                    return{
                        ...post,
                        description,
                        status,
                        title,
                        url,
                    }
                }
                return post
            })
            // console.log(newState.posts)
            return {
                ...newState,         
            }
        }
        case actions.POST_DELETED: {
            let newState = { ...state };
            newState.posts = newState.posts.filter((post)=>{
                return post._id !== payload._id
            })
            //newState.postLoading = false;
            return {
                ...newState
            }
        }
        default:
            return { ...state }
    }
}

export default postReducer;