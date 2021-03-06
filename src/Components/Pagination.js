import React, { PureComponent } from 'react';
import '../css/index.sass';
import { UlPagination, LiPagination } from './style/Pagination';
 


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
        if (this.props.items !== prevProps.items || this.props.userId !== prevProps.userId 
            || this.props.dateFilter !== prevProps.dateFilter) {
            this.setPage(this.state.initialPage);
        }
    }

    setPage(page) {    
        let items, date, pager;
        function formatDate(date) {
            let d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();
            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            return [year, month, day].join('-');
        }
        if(this.props.dateFilter){ 
            items = this.props.items.filter((post)=>{
                date = formatDate(post.date).substring(0,4);
                return date === this.props.dateFilter;
            })
        }else{
            items = this.props.items;  
        }
        
        pager = this.state.pager;
    
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
 
        let totalPages = Math.ceil(totalItems / pageSize);
 
        let startPage, endPage;
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
 
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);


        let pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);
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
        let pager = this.state.pager;
 
        if (!pager.pages || pager.pages.length <= 1) {
            return null;
        }

        return (
            <UlPagination id='pagination' className="pagination center">
                <LiPagination className={pager.currentPage === 1 ? 'disabled page-item' : ''}>
                    <a className="page-link color-second" onClick={() => this.setPage(1)}>First</a>
                </LiPagination>
                <LiPagination className={pager.currentPage === 1 ? 'disabled page-item' : ''}>
                    <a className="page-link color-second" onClick={() => this.setPage(pager.currentPage - 1)}>Previous</a>
                </LiPagination>
                {pager.pages.map((page, index) =>
                    <LiPagination id={page} key={index} className={pager.currentPage === page ? 'activePage page-item' : ''}>
                        <a className="page-link color-second" onClick={() => this.setPage(page)}>{page}</a>
                    </LiPagination>
                )}
                <LiPagination className={pager.currentPage === pager.totalPages ? 'disabled page-item' : ''}>
                    <a className="page-link color-second" onClick={() => this.setPage(pager.currentPage + 1)}>Next</a>
                </LiPagination>
                <LiPagination className={pager.currentPage === pager.totalPages ? 'disabled page-item' : ''}>
                    <a className="page-link color-second" onClick={() => this.setPage(pager.totalPages)}>Last</a>
                </LiPagination>
            </UlPagination>
        );
    }
}
 


export default Pagination;