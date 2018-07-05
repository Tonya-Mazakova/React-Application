import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import '../css/index.sass';






const Wrapper = styled.div`
    padding: 15px;
    background: lavender;
`;

const Title = styled.h4`
 
`;

const TitleFilter = styled.h5`
 
`;

const SelectWrap = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top:10px;
`;

const Div = styled.div`
    margin-left: 10px;
`;

const Option = styled.option`
    margin-left:8px;
`;

class Filtration extends PureComponent {
    constructor(props){
        super(props);
        this.state={
           htmlObject: null,
           numOptions: null
        };
    this.createSelectItems = this.createSelectItems.bind(this);
    this.renderSelect = this.renderSelect.bind(this);
    }

componentDidMount(){
    let htmlObject = document.getElementById('filter');
    this.setState({
        htmlObject: htmlObject
    });
    this.renderSelect(htmlObject, this.props.propsFiltration);
}

componentDidUpdate(prevProps, prevState) {
    if (this.props.propsFiltration !== prevProps.propsFiltration) {
       this.renderSelect(this.state.htmlObject, this.props.propsFiltration);
    }
}

createSelectItems(param) {
    let items = [];         
    for (let i = 0; i < param.numOptions.optionsForSelect_1; i++) {             
         items.push(<Option key={i} value={i}>{param.items[i]}</Option>);   
    }
    return items;
}  

renderSelect(htmlObject, param){
    
    let selectHTML = ''; 
    selectHTML = "<select id='filterSelect' class='filterSelect'>";    
    for(let i = 0; i < param.numOptions.optionsForSelect_1; i++){
        selectHTML += "<option value='" + param.items.itemsForSelect_1[i] + "'>" + param.items.itemsForSelect_1[i] + "</option>";
    }
    selectHTML += "</select>";
    htmlObject.innerHTML = selectHTML;

    this.props.onChangeFilter();

}


render(){
   
    return (
        <Wrapper>
            <Title>Filter by:</Title>
            <SelectWrap>
                <TitleFilter>{this.props.propsFiltration.title.title_1}</TitleFilter>
                <Div id='filter'></Div>
            </SelectWrap>
        </Wrapper>
        )
    }

}


const mapStateToProps = state => { 
    return {
      posts: state.postsReducer.items,
      loadingPosts: state.postsReducer.loading,
      errorPosts: state.postsReducer.error
    };
  };



export default withRouter(connect(mapStateToProps)(Filtration));
