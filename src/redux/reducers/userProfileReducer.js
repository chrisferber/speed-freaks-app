const userProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_USER_PROFILE':
            return action.payload;
        default:
            return state;
    }
}

export default userProfileReducer;