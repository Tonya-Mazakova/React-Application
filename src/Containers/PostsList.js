import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { fetchPosts, addPost, deletePost, editPost, sortPosts} from "../Actions/actions";
import styled from 'styled-components';
import {Icon} from 'react-fa';
import '../css/index.sass';
import PostView from '../Components/PostView';
import Popup from '../Components/Popup';
import Pagination from '../Components/Pagination';
import AddElement from '../Components/AddElement';



const Wrapper = styled.div`
 
`;

const UlPost = styled.ul`
 
`;

const LiPost = styled.li`
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  width:620px;
  background-color:azure;
  margin: 0 auto 10px;
  box-shadow:0 0.25rem 0.75rem rgba(0, 0, 0, .05);
`;

const TPost = styled.h5`
 
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
  border-right: 1px solid #e5e5e5;
  &:last-child{
    border-right:none;
  }
  &:hover&{
    color:cornflowerblue;
  }
`;

const IconWrap = styled.div`
  font-size: 15px
`;

const TitleIcon = styled.span`
  padding-left: 10px
`;

const WrapPost = styled.div`
  padding: 12px 0 0 12px;
  justify-content: space-between;
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
`;

const DatePost = styled.span`
  margin-left: 5px;
`;

const DivIcon = styled.div`
  display: flex;
  padding: 5px;
`;

const WrapInnerPost = styled.div`
`;

const WrapAddPost = styled.div`
  width: 100px;
`;

const Wrap = styled.div`
  display: flex;
  justify-content: flex-end;
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
      popup:{
        title: "",
        showPopup: false,
        todo: '',
        topicInput:'Topic of the post',
        textInput:'Post Text',
        topic:'',
        body:''
      },
      addElement:{
        title:'Add post',
        id:101
      }
    };
    this.viewPost = this.viewPost.bind(this);
    this.closeViewPost = this.closeViewPost.bind(this);
    this.togglePopup = this.togglePopup.bind(this); 
    this.closePopup = this.closePopup.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
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
    if(todo === 'add post'){
      this.setState(prevState => ({
        ...prevState,
        popup:{
            ...prevState.popup,
            title: 'Add post',
            todo: 'add post',
            showPopup: !this.state.showPopup 
        }
    }))
    }
    else if(todo === 'delete post'){
      this.setState(prevState => ({
        ...prevState,
        popup:{
            ...prevState.popup,
            title: 'Are you shure want to delete this post?',
            todo: 'delete post',
            showPopup: !this.state.showPopup 
        }
    }))
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
      this.setState(prevState => ({
        ...prevState,
        popup:{
            ...prevState.popup,
            title: 'Edit post',
            todo: 'edit post',
            id:id,
            topic: title,
            body: body,
            showPopup: !this.state.showPopup 
        }
    })) 
    }
    this.setState({id: id});
  }  

  closePopup(todo, title, body){
    switch (todo) {
      case 'add post':
        let length = this.props.posts.length,
            userId = this.props.posts[(--length)].userId;
        this.props.addPost(title, body, this.state.addElement.id, (++userId));
        let id = this.state.id;
        id++;
        this.setState(prevState => ({
          ...prevState,
          addElement:{
              ...prevState.popup,
              id: id
          }
        }))   
        document.getElementById('recipient-name').value = '';
        document.getElementById('message-text').value = '';
        break;
      case 'delete post':
        this.props.deletePost(this.state.id);
        break;
      case 'edit post':
        this.props.editPost(title, body, this.state.id);
        document.getElementById('recipient-name').value = '';
        document.getElementById('message-text').value = '';
        break;
      default:
      break;
    };  
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
        <LiPost key={post.id} className="card flex-md-row mb-4 h-md-250">   
            <WrapPost className="card-body d-flex flex-column">
              <WrapInnerPost>
                <WrapTitle><TPost id={"Title" + post.id} className="title">{post.title}</TPost></WrapTitle>
                <DateWrap><Icon name='calendar'/><DatePost>{date}</DatePost></DateWrap>                
                <BPost id={"Body" + post.id}>{post.body}</BPost>  
              </WrapInnerPost> 
              <span>#{post.id}</span>
                <DivIcon>
                <IconStyle data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" onClick={()=>{this.togglePopup(post.id, 'edit post')}} className='anim'>
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
                <IconStyle data-toggle="modal" data-target="#exampleModalCenter" onClick={()=>{this.togglePopup(post.id, 'delete post')}} className='anim'>
                <IconWrap>
                    <Icon name="trash" className='icon-style'/>
                    <TitleIcon>Trash</TitleIcon>
                </IconWrap>
                </IconStyle>
                </DivIcon>
            </WrapPost>
            <img className="card-img-right flex-auto d-none d-lg-block" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20250%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16474c1e57d%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A13pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16474c1e57d%22%3E%3Crect%20width%3D%22200%22%20height%3D%22250%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2256.203125%22%20y%3D%22131%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" alt="Thumbnail" data-src="holder.js/200x250?theme=thumb"/>           
        </LiPost>
        )
    }}/>

    )
})

  
if(this.props.posts && this.props.posts.length){
  return(
    <Wrapper className="container">
      <Wrap>
      <WrapAddPost data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" onClick={()=>{this.togglePopup(this.state.addElement.id, 'add post')}}>
        <AddElement addElement={this.state.addElement}/>  
      </WrapAddPost>
      </Wrap>
    <UlPost>
      {renderPosts}
    </UlPost>
    <Pagination items={this.props.posts} userId={this.props.userId} dateFilter={this.props.dateFilter} onChangePage={this.onChangePage}/>
    <Popup  closePopup={this.closePopup}
            popup={this.state.popup}
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
  addPost,
  editPost,
  deletePost,
  fetchPosts,
  sortPosts
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsList));