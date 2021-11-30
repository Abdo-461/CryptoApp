import React from 'react';
import { render } from 'react-dom';
import CoinFilter from '../../CoinFilter';


//tests component redering without crashing
it("Renders without crashing", ()=> {
    const div = document.createElement("div");
        render(<CoinFilter />, div)
})