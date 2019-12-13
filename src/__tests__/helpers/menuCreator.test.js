import { Link } from 'react-router-dom';
import menuCreator from '../../helpers/menuCreator';

const location = { pathname: '/dashboard' };

describe('should test menu', () => {
    it('should test when `Requester` is passed as role', done => {
        const response = menuCreator(location, Link, 'Requester');
        expect(response.menu).toHaveLength(3);
        expect(response.menuMobile).toHaveLength(3);
        done();
    });
    it('should test when `Manager` is passed as role', done => {
        const response = menuCreator(location, Link, 'Manager');
        expect(response.menu).toHaveLength(4);
        expect(response.menuMobile).toHaveLength(4);
        done();
    });
    it('should test when `Travel Admin` is passed as role', done => {
        const response = menuCreator(location, Link, 'Travel Administrator');
        expect(response.menu).toHaveLength(3);
        expect(response.menuMobile).toHaveLength(3);
        done();
    });
    it('should test when `Super Administrator` is passed as role', done => {
        const response = menuCreator(location, Link, 'Super Administrator');
        expect(response.menu).toHaveLength(4);
        expect(response.menuMobile).toHaveLength(4);
        done();
    });
    it('should test when `Accommodation Supplier` is passed as role', done => {
        const response = menuCreator(location, Link, 'Accommodation Supplier');
        expect(response.menu).toHaveLength(1);
        expect(response.menuMobile).toHaveLength(1);
        done();
    });
    it('should test when unknown value is passed as role', done => {
        const response = menuCreator(location, Link, 'X');
        expect(response.menu).toEqual(undefined);
        expect(response.menuMobile).toEqual(undefined);
        done();
    });
});