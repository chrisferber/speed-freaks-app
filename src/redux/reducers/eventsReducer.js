// stores all data from event table in database
const eventsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_EVENTS':
            return action.payload;
        default:
            return state;
    }
}

export default eventsReducer;