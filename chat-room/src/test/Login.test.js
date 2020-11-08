import React from 'react';
import ReactDOM from 'react-dom';
import Login from '../Login';

import { render } from '@testing-library/react';


test("Renders", () => {
    const root = document.createElement('div')
    ReactDOM.render(<Login />, root)
})

test("Creates user in database", () => {
    
})