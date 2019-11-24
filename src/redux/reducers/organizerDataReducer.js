
const organizerDataReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ORGANIZER_EVENTS':
            return action.payload;
        default:
            return state;
    }
}

export default organizerDataReducer;