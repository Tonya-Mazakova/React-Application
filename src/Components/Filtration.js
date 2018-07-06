import React, { PureComponent } from 'react';
import styled from 'styled-components';
import '../css/index.sass';


const Wrapper = styled.div`
    padding: 15px;
    background: lavender;
`;

const Title = styled.h4`
 
`;

const SelectWrap = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top:10px;
`;

const FilterWrap = styled.div`
    display: flex;
    flex-direction: row;
`;




class Filtration extends PureComponent {
    constructor(props){
        super(props);
        this.state={
           htmlObject: null,
           numOptions: null,
           renderFilter: false
        };
    this.renderSelect = this.renderSelect.bind(this);
    }

componentDidMount(){
    let htmlObject = document.getElementById('filter');
    this.setState({
        htmlObject: htmlObject
    });
}

componentDidUpdate(prevProps, prevState) {
    if (this.props.filtration !== prevProps.filtration) {
        if(!this.state.renderFilter){
            this.renderSelect(this.state.htmlObject, this.props.filtration);    
        }
    }
}


renderSelect(htmlObject, param){
    let selectHTML = '', elDiv = null;
    this.setState({
        renderFilter: true
    })
    for(let i = 0; i < param.numSelect; i++){
        selectHTML = `<div id="filter${i}"><TitleFilter class="titleSelect">${this.props.filtration.title[i]}</TitleFilter><select id='filterSelect${i}' class='filterSelect'>`;    
        for(let j = 0; j < param.numOptions[i]; j++){
            selectHTML += "<option value='" + param.items[i][j] + "'>" + param.items[i][j] + "</option>";
        }   
        selectHTML += "</select></div>";
        elDiv = document.createElement('div');
        elDiv.innerHTML = selectHTML;
        htmlObject.appendChild(elDiv);
    }

    this.props.onChangeFilter();
}


render(){
   
    return (
        <Wrapper>
            <Title>Filter by:</Title>
            <SelectWrap>
                <FilterWrap id='filter' className="filter"></FilterWrap>
            </SelectWrap>
        </Wrapper>
        )
    }

}




export default Filtration;
