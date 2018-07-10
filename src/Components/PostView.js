import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import {Icon} from 'react-fa';
import '../css/index.sass';
import { Wrapper, PostWrap, TitleWrap,
         BodyPost, BackWrap, TitlePost } from './style/PostView';
import CommentsList from "./CommentsList";



class PostView extends PureComponent {
    constructor(props){
        super(props);
        this.state={
            post: this.props.post,  
            id: this.props.id,
      };
        this.closeViewPost = this.closeViewPost.bind(this);
    }

    closeViewPost(){
        this.props.closeViewPost();  
    }

    render(){
        const renderPost = this.props.posts.map((post)=>{
            if(post.id === this.state.id){
                return (
                <PostWrap key = {post.id}>
                     <TitleWrap>
                        <TitlePost className="title">{post.title}</TitlePost>
                     </TitleWrap> 
                     <BodyPost>{post.body}</BodyPost>
                </PostWrap>
                )   
            }
            return null;
       })
        return (
            <Wrapper className="col-md-5">
                <BackWrap onClick={this.closeViewPost} className='icon-style d-flex'>
                    <Icon name='arrow-left'/><span className="indent">Back</span>
                </BackWrap>
                {renderPost}
                <CommentsList id={this.props.id} />
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



export default withRouter(connect(mapStateToProps)(PostView));