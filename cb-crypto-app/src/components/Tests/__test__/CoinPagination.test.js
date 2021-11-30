import React from 'react';
import { render } from 'react-dom';
import CoinPagination from '../../CoinPagination'

//tests component redering without crashing
it("Renders without crashing", ()=> {
    const div = document.createElement("div");
        render(<CoinPagination />, div)
})

