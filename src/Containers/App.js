import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {Icon} from 'react-fa';
import { fetchPosts, fetchComments, sortPosts } from "../Actions/actions";
import Navigation from '../Components/Navigation';
import PostsList from '../Components/PostsList';
import Sorting from '../Components/Sorting';
import Filtration from '../Components/Filtration';
import '../css/App.sass';
import { Wrapper, HeaderTop, HeaderWrap, HeaderBottomWrap, NavWrap } from './style/App.js';



class App extends PureComponent{
  constructor(props){
      super(props);
      this.state={  
            dateFilter: null,
        sorting:{
            num: 2,
            items: ['id <','id >']
        },
    }
    this.onChangeSort = this.onChangeSort.bind(this);
    this.onChangeFilter = this.onChangeFilter.bind(this);
  }

  componentWillMount() {
    this.props.fetchPosts();
    this.props.fetchComments();
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
          <Wrapper>  
            <section>  
                <HeaderWrap>
                    <HeaderTop className="container center">
                        <a>Subscribe</a>     
                        <div>   
                            <Icon name="search" />
                            <a className="btn btn-sm btn-outline-secondary indent">Sign up</a>
                        </div>
                    </HeaderTop>       
                </HeaderWrap>  
                <NavWrap>
                    <div className="container">
                        <Navigation/>
                    </div>
                </NavWrap>
                <HeaderBottomWrap className="container center">
                    <Filtration onChangeFilter={this.onChangeFilter}/>
                    <Sorting sorting={this.state.sorting} onChangeSort={this.onChangeSort}/>
                </HeaderBottomWrap>
            </section>
            <PostsList dateFilter={this.state.dateFilter} />  
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
   
  
  const mapDispatchToProps =  {
    fetchPosts,
    fetchComments,
    sortPosts,
  };
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(App);