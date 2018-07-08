import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import CommentsList from "../Containers/CommentsList";
import {Icon} from 'react-fa';
import '../css/index.sass';



const Wrapper = styled.div`
    width: 800px;
    margin: 0 auto;
`;


const PostWrap = styled.div`
    height: 300px;
    background-color: azure;
    margin: 25px auto 0;
    border: 10px solid white;
`;

const TitleWrap = styled.div`
    height: 80px;
    border-bottom: 1px solid lightgoldenrodyellow;
    background-color: lavender;
    text-align: center;
    font-size: 20px;
`;

const BodyPost = styled.div`
    padding: 20px;
    line-height: 1.5;
`;

const Back = styled.span`
   margin-left:10px;
`;

const BackWrap = styled.a`
    display:flex;
    justify-content: flex-end;
`;

const Title = styled.h5`
    line-height: 80px;
`;


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
                        <Title className="title">{post.title}</Title>
                     </TitleWrap> 
                     <BodyPost>{post.body}</BodyPost>
                </PostWrap>
                )   
            }
            return null;
       })

        return (
            <Wrapper>
                <BackWrap onClick={this.closeViewPost} className='icon-style'>
                    <Icon name='arrow-left'/><Back>Back</Back>
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