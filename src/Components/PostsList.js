import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { fetchPosts, addPost, deletePost, editPost, sortPosts} from "../Actions/actions";
import {Icon} from 'react-fa';
import '../css/index.sass';
import { LiPost, BPost, IconStyle, 
         WrapPost, WrapTitle, Loading, 
         IconWrap, WrapAddPost, Wrapper} from './style/PostsList';
import PostView from '../Components/PostView';
import Popup from '../Components/Popup';
import Pagination from '../Components/Pagination';
import AddElement from '../Components/AddElement';



class PostsList extends PureComponent {
  constructor(props){
    super(props);
    this.state={
      viewPost: false,
      idView: null,
      id: null,
      pageOfItems: [],
      popup:{
        title: "",
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
      this.setState({ viewPost: true, idView: id});
  }

  closeViewPost(){
      this.setState({ viewPost: false });
  }

  togglePopup(id, todo) {
    if(todo === 'add post'){
      this.setState(prevState => ({
        ...prevState,
        id:id,
        popup:{
            ...prevState.popup,
            title: 'Add post',
            todo: 'add post',
        }
    }))
    }
    else if(todo === 'delete post'){
      this.setState(prevState => ({
        ...prevState,
        id:id,
        popup:{
            ...prevState.popup,
            title: 'Are you shure want to delete this post?',
            todo: 'delete post',
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
        id:id,
        popup:{
            ...prevState.popup,
            title: 'Edit post',
            todo: 'edit post',
            id:id,
            topic: title,
            body: body,
        }
    })) 
    }
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
      <PostView closeViewPost = {this.closeViewPost}
                id = {this.state.idView}/>
                                
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
        <LiPost key={post.id} className="card col-md-7 flex-md-row mb-4 h-md-250">   
            <WrapPost className="card-body d-flex flex-column">
              <div>
                <WrapTitle className="center"><h5 id={"Title" + post.id} className="title">{post.title}</h5></WrapTitle>
                <div><Icon name='calendar'/><span className="indent">{date}</span></div>                
                <BPost id={"Body" + post.id}>{post.body}</BPost>  
              </div> 
              <span>#{post.id}</span>
              <IconWrap className="d-flex">
                <IconStyle data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" onClick={()=>{this.togglePopup(post.id, 'edit post')}} className='anim center'>
                <div>
                    <Icon name="edit" className='icon-style'/>
                    <span className="indent">Edit</span>
                </div>
                </IconStyle>
                <IconStyle onClick={()=>{this.viewPost(post.id)}} className='anim center'>
                <div>
                    <Icon name="external-link" className='icon-style'/>
                    <span className="indent">View</span>
                </div>
                </IconStyle>
                <IconStyle data-toggle="modal" data-target="#exampleModalCenter" onClick={()=>{this.togglePopup(post.id, 'delete post')}} className='anim center'>
                <div>
                    <Icon name="trash" className='icon-style'/>
                    <span className="indent">Trash</span>
                </div>
                </IconStyle>
              </IconWrap>
            </WrapPost>
            <img className="card-img-right flex-auto d-none d-lg-block" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20250%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16474c1e57d%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A13pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16474c1e57d%22%3E%3Crect%20width%3D%22200%22%20height%3D%22250%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2256.203125%22%20y%3D%22131%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" alt="Thumbnail" data-src="holder.js/200x250?theme=thumb"/>           
        </LiPost>
    )
})

  
if(this.props.posts && this.props.posts.length){
  return(
    <section className="container">
      <Wrapper className="d-flex">
      <WrapAddPost data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" onClick={()=>{this.togglePopup(this.state.addElement.id, 'add post')}}>
        <AddElement addElement={this.state.addElement}/>  
      </WrapAddPost>
      </Wrapper>
      <ul>
        {renderPosts}
      </ul>
      <Pagination items={this.props.posts} dateFilter={this.props.dateFilter} onChangePage={this.onChangePage}/>
      <Popup  closePopup={this.closePopup}
            popup={this.state.popup}
          />
  </section>
  )  
}
return (
  <Loading>Loading...</Loading>) 
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



export default connect(mapStateToProps, mapDispatchToProps)(PostsList);