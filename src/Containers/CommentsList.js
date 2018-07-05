import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import '../css/index.sass';
import Likes from '../Components/Likes';
import AddComment from '../Components/AddComment';



const UlComments = styled.ul`
    padding: 20px;
    background-color: azure;
`;

const LiComment = styled.li`
    height: 130px;
    border-bottom: 1px solid;
`;

const Div = styled.div`
    text-align: center;
    margin-top: 20px;
`;

const CommentEmail = styled.p`
    padding-top: 10px;
    margin-bottom: 7px;
    font-weight: bold;
`;

const CommentBody = styled.p`
   
`;

const Title = styled.h2`
    margin: 20px 0;
    padding-bottom: 20px;
    border-bottom: 1px solid;
    border-width: 5px;
`;



class CommentsList extends PureComponent {
    constructor(props){
        super(props);
        this.state={
            post: this.props.post,  
            id: this.props.id,
            title:"Add comment",
            propsComments:{
                idPost: this.props.id,
                items: this.props.comments    
            }
      };
        
    }
  
    render(){

        if (this.props.error) {
            return <Div>Error! {this.state.error.message}</Div>;
          }
      
          if (this.props.loading) {
            return <Div>Loading...</Div>;
          }
       const renderComments = this.props.comments.map((comment)=>{
           if(comment.postId === this.state.id){
               return (
                <LiComment key = {comment.id}>
                    <CommentEmail>{comment.email}</CommentEmail>
                    <CommentBody>{comment.body}</CommentBody>
                    <Likes/>
                </LiComment> 
                )   
           }
           return null;
      })

      return (
          <div>
          <AddComment propsComments={this.state.propsComments} />
          <UlComments>
             <Title>Comments</Title> 
            {renderComments} 
          </UlComments>   
          </div>
      )
    }      

}



const mapStateToProps = state => {
    return {
      comments: state.commentsReducer.items,
      loading: state.commentsReducer.loading,
      error: state.commentsReducer.error
    
    };
};



export default withRouter(connect(mapStateToProps)(CommentsList));