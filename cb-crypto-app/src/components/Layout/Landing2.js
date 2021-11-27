import React, {useEffect, useState} from 'react'


//a functional component that fetches all books from back-end api and displays a search bar to search relevant books
const Landing2 = () => {

    //create a hook to catch and display errors
    const [error, setError] = useState(null);
    //create a hook to check if books are loaded
    const [isLoaded, setIsLoaded] = useState(false);
    //create a hook to save state of book
    const [bookList, setItems] = useState([]);
    //hook to store state of search keyword
    const [query, setquery] = useState("");
    //different paramters to filter search results
    const [searchParam] = useState(["name", "id"]);

    //Effect hook to fetch books from the API
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
   function search(bookItems){
       return bookItems.filter((item) => {
           return searchParam.some((newBookList) => {
               return (
                   item[newBookList]
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
                    {search(bookList).map((books) => (
                        <li>
                            <a href={`book/${books.isbn}`}>
                                <article className="card cards" key={books.callingCodes}>
                                    <div className="card-image bookImg">
                                        <img src={`http://covers.openlibrary.org/b/isbn/${books.isbn}-M.jpg`} alt={books.name} />
                                    </div>
                                    <div className="card-content">
                                        <h2 className="card-name">{books.name}</h2>
                                        <ol className="card-list">
                                            <li>
                                                Book ISBN:{" "}
                                                <span>{books.isbn}</span>
                                            </li>
                                            <li>
                                                Book Title: <span>{books.title}</span>
                                            </li>
                                            <li>
                                                Book Author: <span>{books.authorName}</span>
                                            </li>
                                        </ol>
                                    </div>
                                </article>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
       );
   }
}

export default Landing2;