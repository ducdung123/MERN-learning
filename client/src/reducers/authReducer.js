const authReducer = (state, action) => {
    const { type, payload } = action;
    const { isAuthenticated, user } = payload
    switch (type) {
        case 'SET_AUTH':
            let newState = { ...state };
            newState.authLoading = false;
            return {
                ...newState,
                isAuthenticated,
                user,
            }
        default:
            return { ...state }
    }
}

export default authReducer;