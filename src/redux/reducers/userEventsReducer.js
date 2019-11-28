const userEventsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_USER_EVENTS':
            return action.payload;
        default:
            return state;
    }
}

export default userEventsReducer;