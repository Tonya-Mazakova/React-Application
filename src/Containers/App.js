import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {Icon} from 'react-fa';
import { fetchPosts, fetchComments, sortPosts } from "../Actions/actions";
import PostsList from './PostsList';
import Sorting from '../Components/Sorting';
import Filtration from '../Components/Filtration';
import '../css/App.sass';



const HeaderTop = styled.div`
    margin:0 auto;
    height:70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const HeaderWrap = styled.div`
    border-bottom: 1px solid #e5e5e5;
    width:100%;
`;

const HeaderBottomWrap = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 50px;
`;

const SignUp = styled.a`
   margin-left: 10px;
`;



class App extends PureComponent{
  constructor(props){
      super(props);
      this.state={  
            userId: null,
            dateFilter: null,
        sorting:{
            num: 2,
            items: ['id <','id >']
        },
        countUserId: 10
}
    this.onChangeSort = this.onChangeSort.bind(this);
    this.onChangeFilter = this.onChangeFilter.bind(this);
  }

  componentWillMount() {
    this.props.fetchPosts();
    this.props.fetchComments();
    this.props.history.push({ pathname: "Post/" });
  }

  onChangeSort(val){
    this.props.sortPosts(val);
  }

  onChangeFilter(date){
    this.setState({
        dateFilter: date
    })  
  }
 


  render(){
      return(
          <div>  
            <HeaderWrap>
                <HeaderTop className="container">
                    <a>Subscribe</a>     
                    <div>   
                        <Icon name="search" />
                        <SignUp className="btn btn-sm btn-outline-secondary">Sign up</SignUp>
                    </div>
                </HeaderTop>   
            </HeaderWrap>  
            <HeaderBottomWrap className="container">
                <Filtration onChangeFilter={this.onChangeFilter}/>
                <Sorting sorting={this.state.sorting} onChangeSort={this.onChangeSort}/>
            </HeaderBottomWrap>
            <PostsList userId={this.state.userId} dateFilter={this.state.dateFilter} />  
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
   
  
  const mapDispatchToProps =  {
    fetchPosts,
    fetchComments,
    sortPosts,
  };
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
