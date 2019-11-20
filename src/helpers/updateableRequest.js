const updateableRequest = (request) => {
    // console.log(request.travelDate.length === 1);
    if(request.travelDate.length === 1 && !request.returnDate) {
        return {
            type: 'oneWayTrip',
            data: {
                ...request,
                travelDate: request.travelDate[0],
                accommodation: request.accommodations[0].name,
                location: request.accommodations[0].Location.id,
                accommodations: null
            }
        };
    }
    if(request.travelDate.length === 1 && request.returnDate) {
        return {
            type: 'returnTrip',
            data: {
                ...request,
                travelDate: request.travelDate[0],
                accommodation: request.accommodations[0].name,
                location: request.accommodations[0].Location.id,
                accommodations: null
            }
        };
    }
    const trips = request.travelDate.map((travelDate, index) => ({
        travelDate,
        accommodation: request.accommodations[index].name,
        location: request.accommodations[index].Location.id
    }));
    return {
        type: 'multiCityTrip',
        data: {
            ...request,
            trips,
            travelDate: null,
            accommodations: null
        }
    };
};

export default updateableRequest;