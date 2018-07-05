import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../css/App.sass';
import PostsList from './PostsList';
import AddPost from '../Components/AddPost';
import Sorting from '../Components/Sorting';
import Filtration from '../Components/Filtration';
import { fetchPosts, fetchComments, sortPosts } from "../Actions/actions";


const Wrapper = styled.div`
    margin: 0 auto;
`;

const HeaderWrap = styled.div`
    height:70px;
    background-color:greenyellow;
    width:100%;
`;

const Header = styled.div`
    margin:0 auto;
    width:1000px;
`;

const HeaderBottomWrap = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 25px;
`;


class App extends PureComponent{
  constructor(props){
      super(props);
      this.state={
            userId: null,
        sorting:{
            title: 'Sort by:',
            numOptions:2,
            items:['id <','id >']
        },
        propsFiltration:{
            title: {
              title_1: 'userId'  
            },
            numSelect: 1,
            numOptions: {
                optionsForSelect_1: null
            },
            items:{
                itemsForSelect_1: []
                }
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

  componentDidUpdate(prevProps, prevState) {
    if (this.props.posts !== prevProps.posts) {
        let length = Math.ceil(this.props.posts.length/this.state.countUserId),
            arr =['none'];
            length++;
        for(let i=1; i <= length; i++){
            arr.push(i);
        }
        this.setState({
            propsFiltration:{
                title: {
                  title_1: 'userId'  
                },
                numSelect: 1,
                numOptions: {
                    optionsForSelect_1: length
                },
                items:{
                    itemsForSelect_1: arr
                    }
                }     
        });
    }
}

  onChangeSort(val){
    this.props.sortPosts(val);
  }

  onChangeFilter(){
    document.getElementById('filterSelect').addEventListener('click', (e)=>{
        if(e.target.value !== 'none'){
            this.props.history.push({ pathname: "/Post/" + e.target.value});
            this.setState({
                userId:Number(e.target.value)
            })
        }else{
            this.setState({
                userId:''
            })
            this.props.history.push({ pathname: "/Post/"});
        }
    }, false);
  }

  render(){
      return(
          <Wrapper>  
            <HeaderWrap>
                <Header>        
                    <AddPost items={this.props.posts}/> 
                </Header>   
            </HeaderWrap>  
            <HeaderBottomWrap>   
                <Filtration items={this.props.posts}  propsFiltration={this.state.propsFiltration} onChangeFilter={this.onChangeFilter}/>
                <Sorting sorting={this.state.sorting} onChangeSort={this.onChangeSort}/>
            </HeaderBottomWrap>
            <PostsList userId={this.state.userId}/>  
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
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
