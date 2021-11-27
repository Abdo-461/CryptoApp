import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';

//variables for left & right pages
const left_page = 'left_page';
const right_page = 'right_page';

//create a range of numbers
const range = (from, to, step = 1) =>{
    let fr = from;
    const range = [];

    while(fr <= to ){
        range.push(fr);
        fr += step;
    }
    return range;
}

class Pagination extends Component {

    constructor(props){
        super(props);
        const {totalRecords = null , pageLimit = 10, pageNeighbours = 0 } = props;
        //get page limit, records and neighbouring pages
        this.pageLimit = typeof pageLimit === 'number' ? pageLimit : 10;
        this.totalRecords = typeof totalRecords === 'number' ? totalRecords : 0;
        this.pageNeighbours = typeof pageNeighbours === 'number' ? Math.max(0, Math.min(pageNeighbours, 2)) : 0;
        //set number of total pages
        this.totalPage = Math.ceil(this.totalRecords / this.pageLimit);
        //get current page number
        this.state = { currentPage: 1};
    }

    //do action when component is mounted
    componentDidMount(){
        //always go to page 1 when component is mounted
        this.goToPage(1);
    }

    //function to open always go to the first page
    goToPage = page => {
        const { onPageChange = f => f } = this.props;

        const currentPage = Math.max(0, Math.min(page, this.totalPages));

        const paginationData = {
            currentPage,
            totalPage: this.totalPage,
            pageLimit: this.pageLimit,
            totalRecords: this.totalRecords 
        };
        //always set pagination data to the current page
        this.setState({ currentPage }, () => onPageChange(paginationData));
    }    

    //pagination tab page number controller
    //handle clicks to page change
    handleClick = page => ev => {
        ev.preventDefault();
        this.goToPage(page);
    }
    //handle page numbers going left
    handleMoveLeft = e =>{
        e.preventDefault();
        this.goToPage(this.state.currentPage - (this.pageNeighbours * 2) - 1 );
    }
    //handle page numbers going right
    handleMoveRight = e =>{
        e.preventDefault();
        this.goToPage(this.state.currentPage - (this.pageNeighbours * 2) + 1);
    }

    //handle page numbers outline
    fetchPageNumbers = () => {
         
        const totalPage = this.totalPage
        const currentPage = this.state.currentPage;
        const pageNeighbours = this.pageNeighbours;

        //total page numbers / blocks
        const totalPageNumbers = (this.pageNeighbours * 2) + 3;
        const totalNumBlocks = totalPageNumbers + 2;

        if(totalPage > totalNumBlocks){
            const firstPage = Math.max(2, currentPage - pageNeighbours);
            const lastPage  = Math.min(totalPage - 1, currentPage + pageNeighbours);

            let pages = range(firstPage,lastPage);

            //handle page numbers hidden left & right
            const leftNum = firstPage > 2;
            const rightNum = (totalPage - lastPage) > 1;
            //number of hidden pages either left or right
            const spillOffset = totalPageNumbers - (pages.length + 1);

            //switch function to handle page numbers on pagination tab
            switch(true){

                case(leftNum && !rightNum):{
                    const xtraPages = range(firstPage - spillOffset, firstPage -1);
                    pages = [left_page, ...xtraPages, ...pages];
                    break;
                }   

                case(!leftNum && rightNum):{
                    const xtraPages = range(lastPage + 1, lastPage + spillOffset);
                    pages = [...pages, ...xtraPages, right_page];
                    break;
                }

                case(leftNum && rightNum):
                default: {
                    pages = [left_page, ...pages, right_page];
                    break;
                }
            }

            return [1, ...pages, totalPage];

        }
        return range(1, totalPage);
    }

    render() {

        if(!this.totalRecords || this.totalPage === 1) return null;

        const { currentPage } = this.state;
        const pages = this.fetchPageNumbers();

        return (
            <Fragment>
                <nav aria-label="CryptoWorld pagination">
                    <ul className="cryptoPagniation">
                        {pages.map((page,index) => {

                            if(page === left_page) return (
                                <li key={index} className="item">
                                    <a className="link" href="#" aria-label="previous" onClick={this.handleMoveLeft}>
                                        <span aria-hidden="true">&laquo;</span>
                                        <span className="sr-only">Previous</span>
                                    </a>
                                </li>
                            );
                            if(page === right_page) return (
                                <li key={index} className="item">
                                    <a className="link" href="#" aria-label="next" onClick={this.handleMoveRight}>
                                        <span aria-hidden="true">&raquo;</span>
                                        <span className="sr-only">Next</span>
                                    </a>
                                </li>
                            );
                            
                            return (
                                <li key={index} className={`item${ currentPage === page ? 'active' : ''}`}>
                                    <a className="link" href="#" onClick={this.handleClick(page)}> 
                                        {page} 
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </Fragment>
        );
    }
}

//validate data props passes in components
Pagination.propTypes = {
    totalRecords: PropTypes.number.isRequired,
    pageLimit: PropTypes.number,
    pageNeighbours: PropTypes.number,
    onPageChange: PropTypes.func
};

export default Pagination;