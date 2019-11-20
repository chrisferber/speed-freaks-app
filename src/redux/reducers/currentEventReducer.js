const currentEventReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_CURRENT_EVENT':
            return action.payload;
        default:
            return state;
    }
}

export default currentEventReducer;