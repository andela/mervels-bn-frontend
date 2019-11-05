import React from 'react';
import { render } from 'react-dom';
import App from '../App';

it('Renders without crushing', () => {
    const div = document.createElement('div');
    render(<App />, div);
});
