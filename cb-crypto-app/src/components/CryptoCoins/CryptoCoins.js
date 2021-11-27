import React from 'react'
import PropTypes from 'prop-types';
import urlPropType from 'url-prop-type';

// a seperate component to create a default displat of coin information
const CryptoCoins = props => {
    const {symbol: symbol='', id = null, name = {} , imageURL = null, current_price = null } = props.crypto || {};

    return (
      <div className="col-sm-6 col-md-4 coin-card">
        <div className="coin-card-container border-gray rounded border mx-2 my-3 d-flex flex-row align-items-center p-0 bg-light">

            <div className="h-100 position-relative border-gray border-right px-2 bg-white rounded-left">

            <img crypto={symbol} src={imageURL} className="d-block h-100" />

            </div>

            <div className="px-3">

                <span className="coin-id text-dark d-block font-weight-bold">{ id }</span>
                <span className="coin-name text-secondary text-uppercase">{ name }</span>
                <span className="coin-price text-secondary text-uppercase">{ current_price }</span>

            </div>

        </div>
      </div>
    )
}

//validate data props passed through a component
CryptoCoins.propTypes = {
    crypto: PropTypes.shape({
        symbol: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        imageURL: urlPropType.isRequired,
        current_price: PropTypes.number.isRequired
    }).isRequired
};

export default CryptoCoins;