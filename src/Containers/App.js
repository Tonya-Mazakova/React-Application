import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, fetchComments, sortPosts } from "../Actions/actions";
import PostsList from '../Components/PostsList';
import Sorting from '../Components/Sorting';
import Filtration from '../Components/Filtration';
import Slider from '../Components/Slider';
import '../css/App.sass';
import { Wrapper, TopMain } from './style/App.js';



class App extends PureComponent{
  constructor(props){
      super(props);
      this.state={ 
            viewPost: false, 
            dateFilter: null,
        sorting:{
            num: 2,
            items: ['id <','id >']
        },
    }
    this.onChangeSort = this.onChangeSort.bind(this);
    this.onChangeFilter = this.onChangeFilter.bind(this);
    this.viewPost = this.viewPost.bind(this);
  }

  render(){
      return(
          <Wrapper>  
            <Slider viewPost={this.state.viewPost}/>
            <section>  
                <TopMain className="container center">
                    <Filtration onChangeFilter={this.onChangeFilter}/>
                    <Sorting sorting={this.state.sorting} onChangeSort={this.onChangeSort}/>
                </TopMain>
            </section>
            <PostsList dateFilter={this.state.dateFilter} viewPost={this.viewPost}/>  
          </Wrapper>  
      )
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

  viewPost(val){
    this.setState({
       viewPost: val 
    })
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