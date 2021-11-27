import React, { Component } from 'react'
import Pagination from '../Pagination/Pagination';
import axios from 'axios';
import CryptoCoins from '../CryptoCoins/CryptoCoins';

class Landing extends Component {

    //states to store crypto data
    constructor(){
        super();
        this.state = {
            allCryptoCoins:[], 
            currentCryptoCoins:[], 
            currenPage:null, 
            totalPages:null,
            isLoaded:false,
            hasError:false
        }
    }

    //fetch crypto data information
    getCryptoCoinsData(){
        const cryptoCoinData = axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=market_cap_desc&per_page=100&page=1&sparkline=false');
        return cryptoCoinData;
    }
    //when page is launched, invoke getCrypotCoindData to get all data
    //and assign state of allCryptoCoins
    componentDidMount(){
        this.getCryptoCoinsData().then(response =>{
            this.setState({allCryptoCoins: response.data});
            console.log(response.data);
        })
        //set loading and error state
        .then(() => {
            this.setState({isLoaded:true}); 
        },
        () => {
            this.setState({hasError: true});
        });
    }

    //display a limited number of coins in a page
    //withing a sepcified set of pages
    onPageChange = data => {
        const { allCryptoCoins } = this.state;
        const{currentPage, totalPages, pageLimit} = data;
        //call the api with special paramters
        axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=market_cap_desc&page=${currentPage}&limit=${pageLimit}&sparkline=false`)
            .then(response => {
                const currentCryptoCoins = response.data.id;
                this.setState({currentPage, currentCryptoCoins, totalPages});
            })
            //set loading and error state
            .then(() => {
                    this.setState({isLoaded:true});   
            },
            () => {
                this.setState({hasError:true});
            });
        }  

    render() {
        const{isLoaded, allCryptoCoins,currentCryptoCoins,currentPage,totalPages} = this.state;
        const totalCryptoCoins = allCryptoCoins.length;

        if(totalCryptoCoins === 0){

            return <div>There are no crypto coins in this api!</div>
        }
        else if(!isLoaded){
            return <div>Loading.....</div>
        }
        else if(this.state.hasError === true){
            return <div>Sorry, there seems to be a problem with the server!</div>
        }
        else{
            return (
                <div className="container mb-5">
                    <div className="row d-flex flex-row py-5">
            
                    <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
                        <div className="d-flex flex-row align-items-center">
            
                        <h2>
                            <strong className="text-secondary">{totalCryptoCoins}</strong> Coin Types
                        </h2>
            
                        { currentPage && (
                            <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                            Page <span className="font-weight-bold">{ currentPage }</span> / <span className="font-weight-bold">{ totalPages }</span>
                            </span>
                        ) }
            
                        </div>
                        {/* create pagination tabe with page numbers */}
                        <div className="d-flex flex-row py-4 align-items-center">
                            <Pagination totalRecords={totalCryptoCoins} pageLimit={18} pageNeighbours={1} onPageChanged={this.onPageChanged} />
                        </div>
                    </div>
            
                        {/* show crypto coins */}
                        {allCryptoCoins.map((crypto) => (
                            <article className="card cards" key={crypto.callingCodes}>
                            <div className="card-image bookImg">
                                <img src={crypto.image} />
                            </div>
                            <div className="card-content">
                                <h2 className="card-name">{crypto.name}</h2>
                                <ol className="card-list">
                                    <li>
                                        id:{" "}
                                        <span>{crypto.id}</span>
                                    </li>
                                    <li>
                                        Price: <span>{crypto.current_price}</span>
                                    </li>
                                    <li>
                                        Market Cap Rank: <span>{crypto.market_cap_rank}</span>
                                    </li>
                                </ol>
                            </div>
                        </article>
                        ))}
            
                    </div>
                </div>        
            );
        }
    }
}

export default Landing;