const attendeesVehicles = (state = [], action) => {
    switch (action.type) {
        case 'SET_ATTENDEES_VEHICLES':
            return [...state, ...action.payload];
        case 'CLEAR_ATTENDEES_VEHICLES':
            return [];
        default:
            return state;
    }
}

export default attendeesVehicles;