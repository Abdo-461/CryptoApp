import React from 'react';
import { render } from 'react-dom';
import CoinPagination from '../../CoinPagination'


it("Renders without crashing", ()=> {
    const div = document.createElement("div");
        render(<CoinPagination />, div)
})

