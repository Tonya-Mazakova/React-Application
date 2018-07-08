import React, { PureComponent } from 'react';
import '../css/index.sass';



class Sorting extends PureComponent {
    constructor(props){
        super(props);
    this.createItems = this.createItems.bind(this);
    }

componentDidMount(){
    document.getElementById('sort-list').addEventListener('click', (e)=>{
        let id = e.target.getAttribute('id');
        this.props.onChangeSort(id);
    }, false)
}   

createItems(params){
    let items = [];         
    for (let i = 0; i < params.num; i++) {             
         items.push(<li className="nav-item indent" key={i} value={i}><a id={"sort-"+i} className="sort-link">{params.items[i]}</a></li>);   
    }
    return items;
}


render(){
    return (
        <div className="d-flex indent">
            <h6 className="title-filter">Sort by:</h6>
            <ul id="sort-list" className='nav justify-content-end'>
                {this.createItems(this.props.sorting)} 
            </ul>
        </div>
        )
    }

}



export default Sorting;