import React, { PureComponent } from 'react';

 

 
class Pagination extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { 
            pager: {},
            initinalPage: 1,
            pageSize: null
        };
        this.setPage = this.setPage.bind(this);
        this.getPager = this.getPager.bind(this);
    }
 
    componentWillMount() {
        if (this.props.items && this.props.items.length) {
            this.setPage(this.state.initialPage);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.items !== prevProps.items || this.props.userId !== prevProps.userId) {
            this.setPage(this.state.initialPage);
        }
    }

    setPage(page) {    
        let items = null;
        if(this.props.userId){
            items = this.props.items.filter((post)=>{
                return post.userId === Number(this.props.userId);
            })
        }else{
            items = this.props.items;  
        }
        
        let pager = this.state.pager;
    
       if (page < 1 || page > pager.totalPages) {
            return;
        }
 
        pager = this.getPager(items.length, page);
 
        let pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
 
        this.setState({ pager: pager });
        
        this.props.onChangePage(pageOfItems);
    }
 
    getPager(totalItems, currentPage, pageSize) {
        currentPage = currentPage || 1;
 
        pageSize = pageSize || 5;
        this.setState({
            pageSize:5
        });
 
        var totalPages = Math.ceil(totalItems / pageSize);
 
        var startPage, endPage;
        if (totalPages <= 10) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }
 
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);


        var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);
        this.setState({
            pager: {
                //totalPages:100
                currentPage:currentPage
            }
        })
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
 
    render() {
       
        var pager = this.state.pager;
 
        if (!pager.pages || pager.pages.length <= 1) {
            return null;
        }

        return (
            <ul id='pagination' className="pagination">
                <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(1)}>First</a>
                </li>
                <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(pager.currentPage - 1)}>Previous</a>
                </li>
                {pager.pages.map((page, index) =>
                    <li id={page} key={index} className={pager.currentPage === page ? 'activePage' : ''}>
                        <a onClick={() => this.setPage(page)}>{page}</a>
                    </li>
                )}
                <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(pager.currentPage + 1)}>Next</a>
                </li>
                <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(pager.totalPages)}>Last</a>
                </li>
            </ul>
        );
    }
}
 


export default Pagination;