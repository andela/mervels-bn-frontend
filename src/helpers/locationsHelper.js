const locationsHelper = (possibleLocations, location) => {
    const locationIds = (possibleLocations) ?
        [0, ...possibleLocations.map(({id}) => id)] : '';
    const locationNames = (possibleLocations) ?
        ['', ... possibleLocations.map(({name}) => name )] : ['Loading...'];
    const selectedAccommodation = (location && possibleLocations) ?
    possibleLocations.find((selectedLocation) => selectedLocation.id === parseInt(location, 10)): '';
    const locationAccommodations = (location && possibleLocations) ?
        ['' ,...selectedAccommodation
        .Accommodations.map(({name}) => name)] :
        ['First Select the Location'];
    return {
        locationIds,
        locationNames,
        locationAccommodations,
        selectedAccommodation
    };
};

export default locationsHelper;