// stores all users and user vehicles that are attending a specific user created event
const attendingEvent = (state = [], action) => {
    switch (action.type) {
        case 'SET_EVENT_ATTENDEES':
            return action.payload;
        default:
            return state;
    }
}

export default attendingEvent;