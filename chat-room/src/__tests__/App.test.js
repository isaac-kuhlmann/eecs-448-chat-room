import React from 'react';
import ReactDOM from 'react-dom';
import fire from '../fire';
import App from "../App";

it("Renders", () => {
    const root = document.createElement('div')
    ReactDOM.render(<App />, root)
})
