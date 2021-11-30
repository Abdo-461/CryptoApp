import React , {useEffect, useState}from 'react';



export default function CoinFilter() {
    //create a hook to catch and display errors and show loading state
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    //create a hook to save coind fetched from api
    const [coinList, setItems] = useState([]);

    //hook to store state of search keyword
    const [query, setquery] = useState("");
    //different paramters to filter search results
    const [searchParam] = useState(["name", "symbol"]);


    //Effect hook to fetch coins from api
    useEffect( () => {
       fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        .then(response => response.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setItems(result);
                console.log(result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
                }
            )
        },[])

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
   //handle fetch errors, loading and displaying of information of the page
   if(error){
       return <div>Error : {error.message}</div>;
   } else if(!isLoaded){
       return <div>Loading...</div>;
   }else{
       return (
            <div className="wrapper">
                <div> 
                <input 
                    type="text" 
                    className="search-bar" 
                    placeholder="Filter items"
                    value = {query}
                    onChange={(e) => setquery(e.target.value)}
                    />
                </div>
                <ul className="card-grid">
                    {/*loop through the list array created by the hook state to display info*/}
                    {search(coinList).map((coins) => (
                        <li>
                            
                                <article className="card cards" key={coins.callingCodes}>
                                    <div className="card-image bookImg">
                                        <img src={coins.image} alt={coins.name} />
                                    </div>
                                    <div className="card-content">
                                        <h2 className="card-name">{coins.name}</h2>
                                        <ol className="card-list">
                                            <li>
                                                Coin Id:{" "}
                                                <span>{coins.id}</span>
                                            </li>
                                            <li>
                                                Coin Symbol: <span>{coins.symbol}</span>
                                            </li>
                                            <li>
                                                Coin Price: <span>{coins.market_price}</span>
                                            </li>
                                        </ol>
                                    </div>
                                </article>
                           
                        </li>
                    ))}
                </ul>
            </div>
       );
   }
}
