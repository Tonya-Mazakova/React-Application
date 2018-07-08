import React, { PureComponent } from 'react';
import styled from 'styled-components';
import '../css/index.sass';


const Wrapper = styled.section`
    padding: 15px;
`;



const Li = styled.li`
    margin-left:8px;
`;

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
         items.push(<Li className="nav-item" key={i} value={i}><a id={"sort-"+i} className="sort-link">{params.items[i]}</a></Li>);   
    }
    return items;
}

render(){
    return (
        <Wrapper className="d-flex">
            <h6 className="title-filter">Sort by:</h6>
            <ul id="sort-list" className='nav justify-content-end'>
                {this.createItems(this.props.sorting)} 
            </ul>
        </Wrapper>
        )
    }

}


export default Sorting;