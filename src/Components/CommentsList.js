import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { addComment } from '../Actions/actions';
import styled from 'styled-components';
import '../css/index.sass';
import Likes from '../Components/Likes';
import AddElement from '../Components/AddElement';
import Popup from '../Components/Popup';


const UlComments = styled.ul`
    padding: 20px;
    background-color: azure;
`;

const LiComment = styled.li`
    height: 150px;
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

const WrapComments = styled.div`
    background-color: azure;
    padding: 15px;
`;



class CommentsList extends PureComponent {
    constructor(props){
        super(props);
        this.state={
            id: 501,
            addElement:{
                title: 'Add comment'
            },
            popup:{
                title: "Add comment",
                todo: 'add comment',
                body:'',
                topicInput:'Enter your email',
                textInput:'Enter your comment'
            }
      };
        this.closePopup = this.closePopup.bind(this);
    }

    closePopup(todo, title, body){
      if(todo === 'add comment'){
       this.props.addComment(title, body, this.state.id, this.props.id);
       document.getElementById('recipient-name').value = '';
       document.getElementById('message-text').value = '';
       let id = this.state.id;
           id++;
       this.setState(prevState => ({
        ...prevState,
        id: id
        }))
        }
  };        
  
    render(){
        if (this.props.error) {
            return <Div>Error! {this.state.error.message}</Div>;
          }
      
          if (this.props.loading) {
            return <Div>Loading...</Div>;
          }
       const renderComments = this.props.comments.map((comment)=>{
           if(comment.postId === this.props.id){
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
            <div data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" >
                <AddElement addElement={this.state.addElement} />
           </div>
           <WrapComments>
            <Title>Comments</Title> 
            <UlComments> 
                {renderComments} 
            </UlComments>  
           </WrapComments> 
          <Popup  closePopup={this.closePopup}
                        popup={this.state.popup}
                    />
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

const mapDispatchToProps =  {
    addComment
  };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentsList));