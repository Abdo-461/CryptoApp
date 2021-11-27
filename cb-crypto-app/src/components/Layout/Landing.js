import React, {useState, useEffect} from 'react'
import ReactPaginate from 'react-paginate';
import axios from 'axios';

function Landing() {
  const [offset, setOffset] = useState(0);
  const [coinsList, setData] = useState([]);
  const [perPage] = useState(3);
  const [pageCount, setPageCount] = useState(0);

  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const [query, setquery] = useState("");
  const [searchParam] = useState(["name", "symbol"]);

  //function to filter items based on given paramters
  function search(coins){
    return coins.filter((item) => {
        return searchParam.some((newCoinList) => {
            return (
                item[newCoinList]
                    .toString()
                    .toLowerCase()
                    .indexOf(query.toLocaleLowerCase()) > -1      
                );
            });
         });
        }


  const getCryptoCoinsData = async() => {
        const cryptoCoins = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
        const data = cryptoCoins.data;
                    const slice = data.slice(offset, offset + perPage)
                    const coins = (slice.map(cc => 
                        <div key={cc.id}>
                            <article className="card cards" key={cc.callingCodes}>
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
                    setData(coins)
                    setPageCount(Math.ceil(data.length / perPage))
    }
    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage + 1)
    };

    useEffect(() => {
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
    }, [offset])

    if(error){
        return <div>Error : {error.message}</div>
    }
    else if(!isLoaded){
        return <div>Loading...</div>
    }
    else{
        return (
            <div>
                {coinsList}
                <input 
                    type="text" 
                    className="search-bar" 
                    placeholder="Filter items"
                    value = {query}
                    onChange={(e) => setquery(e.target.value)}
                        />
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
        );
    }
        
}

export default Landing;
