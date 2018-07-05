import React, { PureComponent } from 'react';
import styled from 'styled-components';
import '../css/index.sass';


const Wrapper = styled.div`
    margin-left: 70px;
    padding: 15px;
    background: floralwhite;
`;

const Title = styled.h4`
 
`;

const Select = styled.select`
    border: navajowhite;
    margin-top: 10px;
    height: 30px;
`;

const Option = styled.option`
    margin-left:8px;
`;

class Sorting extends PureComponent {
    constructor(props){
        super(props);
        this.state={
           
        };
    this.onDropdownSelected = this.onDropdownSelected.bind(this);
    this.createSelectItems = this.createSelectItems.bind(this);
    }


createSelectItems(param) {
    let items = [];         
    for (let i = 0; i < param.numOptions; i++) {             
         items.push(<Option key={i} value={i}>{param.items[i]}</Option>);   
    }
    return items;
}  

onDropdownSelected(e) {
    this.props.onChangeSort(e.target.value);
}

render(){
    return (
        <Wrapper>
            <Title>{this.props.sorting.title}</Title>
            <Select onChange={this.onDropdownSelected}>
                {this.createSelectItems(this.props.sorting)}   
            </Select>
        </Wrapper>
        )
    }

}


export default Sorting;