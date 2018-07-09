import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import '../css/index.sass';



class Filtration extends PureComponent {
    constructor(props){
        super(props);
        this.state={
            title: ['Date'],
            numSelect: 1,
            numOptions:[10],
            items:[['none', '2010','2011','2012', '2013', '2014', 
                    '2015', '2016', '2017', '2018']],
            renderFilter: false,
            countUserId: 10,
            dateVal: null
        };
    this.renderSelect = this.renderSelect.bind(this);
    }

componentDidMount(){
    let date = null;
    this.renderSelect();
    document.getElementById(`filterSelect0`).addEventListener('click', (e)=>{
        if(e.target.value !== 'none'){
            date = e.target.value;      
            this.props.onChangeFilter(date);       
        }else{
            date = '';
            this.props.onChangeFilter(date); 
        }    
   }, false); 
   /* for(let i=0 ; i< this.state.title.length; i++){
        if(this.state.title[i] === 'date'){
          document.getElementById(`filterSelect${i}`).addEventListener('click', (e)=>{
              if(e.target.value !== 'none'){
                  date = e.target.value;      
                  this.props.onChangeFilter(date);       
              }else{
                  date = '';
                  this.props.onChangeFilter(date); 
              }    
         }, false); 
      } 
    }*/
}


renderSelect(){
    let selectHTML = '', filterDiv = null;

    for(let i = 0; i < this.state.numSelect; i++){
        selectHTML = `<div id="filter${i}"><h7 class="title-select">${this.state.title[i]}</h7><select id='filterSelect${i}' class='filter-select'>`;    
        for(let j = 0; j < this.state.numOptions[i]; j++){
            selectHTML += "<option class='filter-option' value='" + this.state.items[i][j] + "'>" + this.state.items[i][j] + "</option>";
        }   
        selectHTML += "</select></div>";
        filterDiv = document.getElementById('filter');
        filterDiv.innerHTML = selectHTML;
    }
}


render(){
    return (
        <div className="d-flex">
            <h6 className="filter-title">Filter by:</h6>
            <div>
                <div id='filter' className="filter">
                </div>
            </div>
        </div>
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
