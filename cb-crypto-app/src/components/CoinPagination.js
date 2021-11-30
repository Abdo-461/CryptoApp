import React, {useState, useEffect} from 'react'
import ReactPaginate from 'react-paginate';
import axios from 'axios';

//main function that displays coins and information about coins
function Landing() {
 
  //state hooks for pagination
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(3);
  const [pageCount, setPageCount] = useState(0);
  //state hook to store api response data
  const [coinsList, setCoinData] = useState([]);
  //state hooks to store loading and error states
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  
  //use axios to fetch data from the api and display them
  const getCryptoCoinsData = async() => {
        const cryptoCoins = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
        const data = cryptoCoins.data;
        const slice = data.slice(offset, offset + perPage)
        const coins = (slice.map(cc => 
                            <div key={cc.id}>
                                <article className="card" key={cc.callingCodes}>
                                <div className="card-image bookImg">
                                    <img src={cc.image} alt={cc.name} />
                                </div>
                                    <div className="card-content">
                                        <h2 className="card-name">{cc.name}</h2>
                                        <ul className="card-list">
                                            <li>
                                                Symbol:{" "}
                                                <span>{cc.symbol}</span>
                                            </li>
                                            <li>
                                                Price:
                                                    <span>{cc.current_price}</span>
                                            </li>
                                            <li>
                                                MCR: 
                                                <span>{cc.market_cap_rank}</span>
                                            </li>
                                                </ul>
                                            </div>
                                        </article>
                                    </div>))
                    setCoinData(coins)
                    setPageCount(Math.ceil(data.length / perPage))
    }
    //handle clicking page number in the pagination tab
    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage + 1)
    };

    //execute function to fetch and handle loading and error states
    useEffect(() => {
        // eslint-disable-next-line
        getCryptoCoinsData()
        .then(
            () => {
                setIsLoaded(true);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
         // eslint-disable-next-line
    }, [offset])

    //loading and error state
    if(error){
        return <div>Error : {error.message}</div>
    }
    else if(!isLoaded){
        return <div>Loading...</div>
    }
    else{
        return (
            <div className="">   
                {/* display coins */}
                <div className="row cards">
                   
                    {coinsList}
                </div>
                {/* pagination tab */}
                <div classNam="ver">
                    <ReactPaginate
                        previousLabel={"prev"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}/>
                </div>
                
                
            </div>  
        );
    }
        
}

export default Landing;
