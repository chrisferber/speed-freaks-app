const attendeesVehicles = (state = [], action) => {
    switch (action.type) {
        case 'SET_ATTENDEES_VEHICLES':
            return [...state, ...action.payload];
        default:
            return state;
    }
}

export default attendeesVehicles;