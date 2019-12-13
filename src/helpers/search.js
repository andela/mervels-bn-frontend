// eslint-disable-next-line import/prefer-default-export
export const searchMessage = (parameter) => {
    let message;
    let type;
    switch (parameter) {
        case 'accommodation':
            message = 'Name of accommodation';
            type = 'text';
            break;
        case 'id':
            message = 'Request Id';
            type = 'number';
            break;
        case 'returnDate':
            message = 'YY-MM-DD';
            type = 'date';
            break;
        case 'travelDate':
            message = 'YY-MM-DD';
            type = 'date';
            break;
        case 'requester':
            message = 'Requesters name';
            type = 'text';
            break;
        case 'from':
            message = 'Place of origin';
            type = 'text';
            break;
        case 'destination':
            message = 'Place of destination';
            type = 'text';
            break;
        case 'reason':
            message = 'word in reason';
            type = 'text';
            break;
        case 'status':
            message = 'Request status';
            type = 'text';
            break;
        default:
            break;
    }
    return { message, type };
};