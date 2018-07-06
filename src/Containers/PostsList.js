import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { fetchPosts, deletePost, editPost, sortPosts} from "../Actions/actions";
import styled from 'styled-components';
import {Icon} from 'react-fa';
import '../css/index.sass';
import PostView from '../Components/PostView';
import Popup from '../Components/Popup';
import Pagination from '../Components/Pagination';



const Wrapper = styled.div`
  margin:0 auto;
  width:1000px;
  margin-top:30px;  
`;

const UlPost = styled.ul`
 
`;

const LiPost = styled.li`
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  width:620px;
  height:230px;
  background-color:azure;
  margin: 0 auto 10px;
`;

const TPost = styled.p`
  font-weight:bold;
  font-size:19px;
  
`;

const BPost = styled.p`
  margin-top: 10px;
  line-height: 1.4;
`;

const IconStyle = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width:100%;
  font-size: 15px;
  cursor: pointer;
  border-right: 1px solid lightgoldenrodyellow;
  &:last-child{
    border-right:none;
  }
  &:hover&{
    background-color:greenyellow;
    color:lightgoldenrodyellow;
  }
`;

const IconWrap = styled.p`
    font-size: 15px
`;

const TitleIcon = styled.span`
    padding-left: 10px
`;

const PostTop = styled.div`
    padding:15px;
`;

const PostBottom = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  border-top: 1px solid lightgoldenrodyellow;
  width: 100%;
  height: 50px;
`;

const WrapTitle = styled.div`
  display:flex;
  flex-direction:row;
  justify-content: space-between;
`;


const Loading = styled.p`
  text-align: center;
  margin-top: 30px;
`;

const DateWrap = styled.div`
  margin-top: 10px;
`;

const DatePost = styled.span`
  margin-left: 5px;
`;




class PostsList extends PureComponent {
  constructor(props){
    super(props);
    this.state={
      activePage: null,
      viewPost: false,
      idView: null,
      id: null,
      pageOfItems: [],
      propsPopup:{
        title: "",
        showPopup: false,
        todo: '',
        topic:'',
        body:''
      },
      sorting:{
        numOptions:2,
        items:['id <','id >']
      }, 
      userId: null
    };
    this.viewPost = this.viewPost.bind(this);
    this.closeViewPost = this.closeViewPost.bind(this);
    this.togglePopup = this.togglePopup.bind(this); 
    this.closePopup = this.closePopup.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.onChangeSort = this.onChangeSort.bind(this);
  }


  onChangePage(pageOfItems) {
    this.setState({ pageOfItems: pageOfItems });
  }

  viewPost(id){
      this.props.history.push({ pathname: `${id}` });
      this.setState({ viewPost: true, idView: id});
  }

  closeViewPost(){
      this.props.history.push({ pathname: "/Post/" });
      this.setState({ viewPost: false });
  }

  togglePopup(id, todo) {
    if(todo === 'delete post'){
      this.setState({
        propsPopup:{
          title: 'Are you shure want to delete this post?',
          todo: 'delete post',
          showPopup: !this.state.showPopup    
        }  
      })
    }else if(todo === 'edit post'){
      let title = '',
          body = '';
      this.props.posts.map((post)=>{
        if(post.id === id){
          title = post.title;
          body = post.body;
        }
        return true;
      });
      this.setState({
        propsPopup:{
          title: 'Edit post',
          todo: 'edit post',
          id:id,
          topic: title,
          body: body,
          titleInput: 'Topic of the post',
          titleTextarea: 'Post text',
          showPopup: !this.state.showPopup    
        }  
      })
    }
    this.setState({id: id});
    
  }  

  closePopup(todo, title, body){
    switch (todo) {
      case 'delete post':
        this.props.deletePost(this.state.id);
        break;
      case 'edit post':
        this.props.editPost(title, body, this.state.id);
        break;
      default:
      break;
    };
    this.setState({
      propsPopup:{
        title: '',
        todo: '',
        topic: '',
        body: '',
        showPopup: false    
      }
    });
  
  }

  onChangeSort(val){
    this.props.sortPosts(val);
  }

  render() {
    if (this.props.error) {
      return <div>Error! {this.state.error.message}</div>;
    }

    if (this.props.loading) {
      return <Loading>Loading...</Loading>;
    }

    if(this.state.viewPost){
      return (
        <Route path="/Post/:idPost" render={()=>(<PostView closeViewPost = {this.closeViewPost}
                                                           id = {this.state.idView}
                                                            />
                                )}/>
      )
    }
    
  const renderPosts = this.state.pageOfItems.map((post)=>{
    let date = null;
    function formatDate(date) {
      let d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
  
      return [year, month, day].join('-');
    }
    date = formatDate(post.date);
    return (
      <Route key={post.id} path={"/Post/"} render={(props)=> {

        return(
        <LiPost key={post.id}>   
            <PostTop>
                <WrapTitle><TPost id={"Title" + post.id}>{post.title}</TPost><p>#{post.id}</p></WrapTitle>
                <DateWrap><Icon name='calendar'/><DatePost>{date}</DatePost></DateWrap>                
                <BPost id={"Body" + post.id}>{post.body}</BPost>
            </PostTop>
            <PostBottom>
                <IconStyle onClick={()=>{this.togglePopup(post.id, 'edit post')}} className='anim'>
                <IconWrap>
                    <Icon name="edit" className='icon-style'/>
                    <TitleIcon>Edit</TitleIcon>
                </IconWrap>
                </IconStyle>
                <IconStyle onClick={()=>{this.viewPost(post.id)}} className='anim'>
                <IconWrap>
                    <Icon name="external-link" className='icon-style'/>
                    <TitleIcon>View</TitleIcon>
                </IconWrap>
                </IconStyle>
                <IconStyle onClick={()=>{this.togglePopup(post.id, 'delete post')}} className='anim'>
                <IconWrap>
                    <Icon name="trash" className='icon-style'/>
                    <TitleIcon>Trash</TitleIcon>
                </IconWrap>
                </IconStyle>
            </PostBottom>    
        </LiPost>
        )
    }}/>

    )
})

  
if(this.props.posts && this.props.posts.length){
  return(
    <Wrapper>
    <UlPost>
      {renderPosts}
    </UlPost>
    <Pagination items={this.props.posts} userId={this.props.userId} dateVal={this.props.dateVal} onChangePage={this.onChangePage}/>
    <Popup  closePopup={this.closePopup}
            propsPopup={this.state.propsPopup}
          />
  </Wrapper>
  )  
}
return (
  <Loading>Loading...</Loading>
)  
   
  }
}


const mapStateToProps = state => { 
  return {
    posts: state.postsReducer.items,
    loadingPosts: state.postsReducer.loading,
    errorPosts: state.postsReducer.error,
  };
};
 

const mapDispatchToProps =  {
  editPost,
  deletePost,
  fetchPosts,
  sortPosts
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsList));