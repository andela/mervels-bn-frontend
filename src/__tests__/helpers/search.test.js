import { searchMessage } from '../../helpers/search';

describe('testing Search helper', () => {
    test('accommodation', () => {
      const expected = { message: 'Name of accommodation', type: 'text' };
      expect(searchMessage('accommodation')).toEqual(expected);
    });
    test('id', () => {
        const expected = { message: 'Request Id', type: 'number' };
        expect(searchMessage('id')).toEqual(expected);
    });
    test('returnDate', () => {
        const expected = { message: 'YY-MM-DD', type: 'date' };
        expect(searchMessage('returnDate')).toEqual(expected);
    });
    test('travelDate', () => {
        const expected = { message: 'YY-MM-DD', type: 'date' };
        expect(searchMessage('travelDate')).toEqual(expected);
    });
    test('requester', () => {
      const expected = { message: 'Requesters name', type: 'text' };
      expect(searchMessage('requester')).toEqual(expected);
    });
    test('from', () => {
      const expected = { message: 'Place of origin', type: 'text' };
      expect(searchMessage('from')).toEqual(expected);
    });
    test('reason', () => {
      const expected = { message: 'word in reason', type: 'text' };
      expect(searchMessage('reason')).toEqual(expected);
    });
    test('status', () => {
      const expected = { message: 'Request status', type: 'text' };
      expect(searchMessage('status')).toEqual(expected);
    });
    test('destination', () => {
      const expected = { message: 'Place of destination', type: 'text' };
      expect(searchMessage('destination')).toEqual(expected);
    });
  });